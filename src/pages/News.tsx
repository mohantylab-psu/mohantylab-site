import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bold,
  CalendarDays,
  ChevronDown,
  Edit,
  Eye,
  EyeOff,
  Heading2,
  ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Loader2,
  Plus,
  Quote,
  RotateCw,
  Sparkles,
  Strikethrough,
  Trash2,
  X,
  ZoomIn,
} from 'lucide-react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { z } from 'zod';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'sonner';
import Cropper from 'react-easy-crop';
import { auth, db, storage } from '@/lib/firebase';
import { isAuthorizedCoordinatorEmail } from '@/lib/adminAuth';
import MolecularBackground from '@/components/MolecularBackground';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type NewsItem = {
  id: string;
  title: string;
  date: string;
  summary: string;
  contentMarkdown: string;
  imageUrl: string;
  imageAlt?: string;
  createdAt?: Timestamp | null;
  authorEmail?: string;
};

type NewsDraft = {
  title: string;
  date: string;
  contentMarkdown: string;
  imageAlt: string;
};

type PixelCrop = { x: number; y: number; width: number; height: number };

type ImageEditorState = {
  isOpen: boolean;
  sourceImage: string;
  crop: { x: number; y: number };
  zoom: number;
  rotation: number;
  brightness: number;
  contrast: number;
  /** null = free / use image's own ratio */
  aspect: number | null;
};

const ASPECT_PRESETS: { label: string; value: number | null }[] = [
  { label: 'Free',  value: null },
  { label: '1 : 1', value: 1 },
  { label: '4 : 3', value: 4 / 3 },
  { label: '3 : 4', value: 3 / 4 },
  { label: '16 : 9', value: 16 / 9 },
  { label: '9 : 16', value: 9 / 16 },
];

type ToolbarTool = {
  icon: typeof Heading2;
  label: string;
  mode: 'inline' | 'line' | 'link';
  before?: string;
  after?: string;
  prefix?: string;
};

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------

const NewsDraftSchema = z.object({
  title: z.string().trim().min(3, 'Title should be at least 3 characters long.'),
  date: z.string().trim().min(3, 'Date label is required.'),
  contentMarkdown: z
    .string()
    .trim()
    .min(10, 'Write at least 10 characters for the announcement.'),
  imageAlt: z
    .string()
    .trim()
    .max(120, 'Image alt text should be at most 120 characters.')
    .optional(),
});

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DRAFT_STORAGE_KEY = 'news-draft-v2';
const MAX_IMAGE_MB = 10;
const REQUEST_TIMEOUT_MS = 30_000;

const initialDraft: NewsDraft = {
  title: '',
  date: '',
  contentMarkdown: '',
  imageAlt: '',
};

// ---------------------------------------------------------------------------
// Pure helpers
// ---------------------------------------------------------------------------

const sanitizeFileName = (name: string) => name.replace(/[^a-zA-Z0-9.-]/g, '_');

const withTimeout = async <T,>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMessage: string,
): Promise<T> => {
  let timeoutHandle: number | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutHandle = window.setTimeout(() => reject(new Error(errorMessage)), timeoutMs);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
  }
};

const canvasToBlob = (canvas: HTMLCanvasElement): Promise<Blob> =>
  new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Failed to convert canvas to blob'))),
      'image/jpeg',
      0.95,
    );
  });

/**
 * Crop, rotate, and apply brightness/contrast to an image.
 *
 * Pipeline:
 *  1. rotCanvas  – full image drawn centred in a "safe area" with rotation so
 *                  no corner is ever clipped regardless of angle.
 *  2. outCanvas  – crop region extracted from rotCanvas.
 *  3. Pixel pass – brightness/contrast applied via raw ImageData manipulation.
 *                  ctx.filter on a canvas-to-canvas drawImage is silently
 *                  ignored in many browser versions, so we do it manually.
 *
 * img.crossOrigin must be set BEFORE img.src for Firebase Storage CORS.
 */
const cropImage = async (
  sourceImage: string,
  pixelCrop: PixelCrop,
  rotation: number,
  brightness: number,
  contrast: number,
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      // ── 1. Rotate into safe-area canvas ──────────────────────────────────
      const maxSize = Math.max(img.naturalWidth, img.naturalHeight);
      const safeArea = Math.ceil(2 * ((maxSize / 2) * Math.sqrt(2)));

      const rotCanvas = document.createElement('canvas');
      rotCanvas.width = safeArea;
      rotCanvas.height = safeArea;
      const rotCtx = rotCanvas.getContext('2d');
      if (!rotCtx) { reject(new Error('Failed to get canvas context')); return; }

      rotCtx.translate(safeArea / 2, safeArea / 2);
      rotCtx.rotate((rotation * Math.PI) / 180);
      rotCtx.translate(-safeArea / 2, -safeArea / 2);
      rotCtx.drawImage(
        img,
        safeArea / 2 - img.naturalWidth / 2,
        safeArea / 2 - img.naturalHeight / 2,
      );

      // ── 2. Extract crop region ────────────────────────────────────────────
      const outCanvas = document.createElement('canvas');
      outCanvas.width = pixelCrop.width;
      outCanvas.height = pixelCrop.height;
      const outCtx = outCanvas.getContext('2d');
      if (!outCtx) { reject(new Error('Failed to get canvas context')); return; }

      const srcX = Math.round(safeArea / 2 - img.naturalWidth / 2 + pixelCrop.x);
      const srcY = Math.round(safeArea / 2 - img.naturalHeight / 2 + pixelCrop.y);

      outCtx.drawImage(
        rotCanvas,
        srcX, srcY,
        pixelCrop.width, pixelCrop.height,
        0, 0,
        pixelCrop.width, pixelCrop.height,
      );

      // ── 3. Brightness & contrast via pixel manipulation ───────────────────
      // We manipulate ImageData directly because ctx.filter is silently dropped
      // on canvas-to-canvas drawImage in many browser/WebKit versions.
      //
      //  Brightness : multiply each channel by (brightness / 100)
      //  Contrast   : scale each channel around midpoint 128 by (contrast / 100)
      if (brightness !== 100 || contrast !== 100) {
        const imageData = outCtx.getImageData(0, 0, pixelCrop.width, pixelCrop.height);
        const d = imageData.data;
        const bF = brightness / 100;
        const cF = contrast / 100;

        for (let i = 0; i < d.length; i += 4) {
          let r = d[i]     * bF;
          let g = d[i + 1] * bF;
          let b = d[i + 2] * bF;

          r = (r - 128) * cF + 128;
          g = (g - 128) * cF + 128;
          b = (b - 128) * cF + 128;

          d[i]     = Math.min(255, Math.max(0, r));
          d[i + 1] = Math.min(255, Math.max(0, g));
          d[i + 2] = Math.min(255, Math.max(0, b));
          // alpha channel (d[i + 3]) is left unchanged
        }

        outCtx.putImageData(imageData, 0, 0);
      }

      canvasToBlob(outCanvas).then(resolve).catch(reject);
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = sourceImage;
  });
};

// ---------------------------------------------------------------------------
// Markdown utilities
// ---------------------------------------------------------------------------

const markdownToPlainText = (markdown: string) =>
  markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\(([^)]*)\)/g, '$1')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^\s{0,3}>\s?/gm, '')
    .replace(/[*_~>-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const createSummary = (markdown: string, maxLength = 220) => {
  const plain = markdownToPlainText(markdown);
  return plain.length <= maxLength ? plain : `${plain.slice(0, maxLength).trim()}...`;
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const News = () => {
  // ── News data ──────────────────────────────────────────────────────────────
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [newsError, setNewsError] = useState('');

  // ── Auth ───────────────────────────────────────────────────────────────────
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // ── Draft / form ───────────────────────────────────────────────────────────
  const [draft, setDraft] = useState<NewsDraft>(initialDraft);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreviewEnabled, setIsPreviewEnabled] = useState(true);

  // ── Image ──────────────────────────────────────────────────────────────────
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  // ── Image editor ───────────────────────────────────────────────────────────
  const [imageEditor, setImageEditor] = useState<ImageEditorState>({
    isOpen: false,
    sourceImage: '',
    crop: { x: 0, y: 0 },
    zoom: 1,
    rotation: 0,
    brightness: 100,
    contrast: 100,
    aspect: 1,
  });
  // Stores pixel-based crop area from react-easy-crop's onCropComplete callback
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // ── Edit / delete ──────────────────────────────────────────────────────────
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [deletingNewsId, setDeletingNewsId] = useState<string | null>(null);
  const [isDeletingPost, setIsDeletingPost] = useState(false);

  const markdownEditorRef = useRef<HTMLTextAreaElement | null>(null);

  const isCoordinator = Boolean(
    currentUser?.email && isAuthorizedCoordinatorEmail(currentUser.email),
  );

  // ── Firestore listener ────────────────────────────────────────────────────
  useEffect(() => {
    const newsQuery = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
    return onSnapshot(
      newsQuery,
      (snapshot) => {
        const items = snapshot.docs.map((document) => {
          const data = document.data() as Partial<NewsItem>;
          return {
            id: document.id,
            title: data.title ?? '',
            date: data.date ?? '',
            summary: data.summary ?? '',
            contentMarkdown: data.contentMarkdown ?? data.summary ?? '',
            imageUrl: data.imageUrl ?? '',
            createdAt: data.createdAt ?? null,
          };
        });
        setNewsItems(items);
        setIsLoadingNews(false);
        setNewsError('');
      },
      (error) => {
        setNewsError(error.message || 'Unable to load news right now.');
        setIsLoadingNews(false);
      },
    );
  }, []);

  // ── Auth listener ─────────────────────────────────────────────────────────
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setCurrentUser(
        user?.email && isAuthorizedCoordinatorEmail(user.email) ? user : null,
      );
      setAuthLoading(false);
    });
  }, []);

  // ── Draft persistence ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!isCoordinator) return;
    const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as NewsDraft;
      setDraft({
        title: parsed.title ?? '',
        date: parsed.date ?? '',
        contentMarkdown: parsed.contentMarkdown ?? '',
        imageAlt: parsed.imageAlt ?? '',
      });
    } catch {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    }
  }, [isCoordinator]);

  useEffect(() => {
    if (!isCoordinator) return;
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
  }, [draft, isCoordinator]);

  // ── Image object URL ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!selectedImage) {
      setImagePreviewUrl('');
      return;
    }
    const objectUrl = URL.createObjectURL(selectedImage);
    setImagePreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  // ── Markdown toolbar definition ───────────────────────────────────────────
  const markdownToolbar = useMemo<ToolbarTool[]>(
    () => [
      { icon: Heading2, label: 'Heading', mode: 'line', prefix: '## ' },
      { icon: Bold, label: 'Bold', mode: 'inline', before: '**', after: '**' },
      { icon: Italic, label: 'Italic', mode: 'inline', before: '_', after: '_' },
      { icon: Strikethrough, label: 'Strike', mode: 'inline', before: '~~', after: '~~' },
      { icon: LinkIcon, label: 'Link', mode: 'link' },
      { icon: List, label: 'Bullets', mode: 'line', prefix: '- ' },
      { icon: ListOrdered, label: 'Numbered', mode: 'line', prefix: '1. ' },
      { icon: Quote, label: 'Quote', mode: 'line', prefix: '> ' },
    ],
    [],
  );

  // ── Markdown toolbar actions ───────────────────────────────────────────────
  const applyInlineWrap = (before: string, after: string) => {
    const textarea = markdownEditorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = textarea.value; // read directly from DOM to avoid stale state
    const selectedText = current.slice(start, end);
    const next = `${current.slice(0, start)}${before}${selectedText}${after}${current.slice(end)}`;

    setDraft((prev) => ({ ...prev, contentMarkdown: next }));
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    });
  };

  const applyLinePrefix = (prefix: string) => {
    const textarea = markdownEditorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = textarea.value; // read directly from DOM

    const lineStart = current.lastIndexOf('\n', start - 1) + 1;
    const lineEndCandidate = current.indexOf('\n', end);
    const lineEnd = lineEndCandidate === -1 ? current.length : lineEndCandidate;

    const block = current.slice(lineStart, lineEnd);
    const prefixedBlock = block
      .split('\n')
      .map((line) => (line.trim() ? `${prefix}${line}` : line))
      .join('\n');

    const next = `${current.slice(0, lineStart)}${prefixedBlock}${current.slice(lineEnd)}`;
    setDraft((prev) => ({ ...prev, contentMarkdown: next }));
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(lineStart, lineStart + prefixedBlock.length);
    });
  };

  const applyLinkInsert = () => {
    const textarea = markdownEditorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = textarea.value;
    const selectedText = current.slice(start, end) || 'link text';
    const snippet = `[${selectedText}](https://example.com)`;
    const next = `${current.slice(0, start)}${snippet}${current.slice(end)}`;

    setDraft((prev) => ({ ...prev, contentMarkdown: next }));
    requestAnimationFrame(() => {
      // Select the placeholder URL so the user can immediately type over it
      const urlStart = start + selectedText.length + 3; // after "[text]("
      const urlEnd = urlStart + 'https://example.com'.length;
      textarea.focus();
      textarea.setSelectionRange(urlStart, urlEnd);
    });
  };

  const applyToolbarAction = (tool: ToolbarTool) => {
    if (tool.mode === 'inline') return applyInlineWrap(tool.before ?? '', tool.after ?? '');
    if (tool.mode === 'line') return applyLinePrefix(tool.prefix ?? '');
    applyLinkInsert();
  };

  // ── Validation ────────────────────────────────────────────────────────────
  const validateDraft = () => {
    const result = NewsDraftSchema.safeParse(draft);
    if (result.success) {
      setFieldErrors({});
      return true;
    }
    const flat = result.error.flatten().fieldErrors;
    setFieldErrors({
      title: flat.title?.[0] ?? '',
      date: flat.date?.[0] ?? '',
      contentMarkdown: flat.contentMarkdown?.[0] ?? '',
      imageAlt: flat.imageAlt?.[0] ?? '',
    });
    return false;
  };

  // ── Image upload helper ───────────────────────────────────────────────────
  const uploadImageToStorage = async (file: File) => {
    const imagePath = `news-images/${Date.now()}-${sanitizeFileName(file.name)}`;
    const storageRef = ref(storage, imagePath);
    setUploadProgress(10);
    await withTimeout(
      uploadBytes(storageRef, file, { contentType: file.type }),
      REQUEST_TIMEOUT_MS,
      'Image upload timed out. Please try again.',
    );
    setUploadProgress(100);
    const downloadUrl = await withTimeout(
      getDownloadURL(storageRef),
      REQUEST_TIMEOUT_MS,
      'Fetching image URL timed out. Please try again.',
    );
    return downloadUrl;
  };

  // ── Create news ───────────────────────────────────────────────────────────
  const handleCreateNews = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (!isCoordinator) {
      toast.error('Only the lab coordinator can publish news.');
      return;
    }
    if (!validateDraft()) {
      toast.error('Please fix the highlighted fields.');
      return;
    }
    if (selectedImage && selectedImage.size > MAX_IMAGE_MB * 1024 * 1024) {
      toast.error(`Image must be ${MAX_IMAGE_MB}MB or smaller.`);
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(null);

    try {
      let imageUrl = '';
      if (selectedImage) imageUrl = await uploadImageToStorage(selectedImage);

      await withTimeout(
        addDoc(collection(db, 'news'), {
          title: draft.title.trim(),
          date: draft.date.trim(),
          summary: createSummary(draft.contentMarkdown),
          contentMarkdown: draft.contentMarkdown.trim(),
          imageUrl,
          imageAlt: draft.imageAlt.trim(),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          authorEmail: currentUser?.email ?? '',
        }),
        REQUEST_TIMEOUT_MS,
        'Publishing timed out. Please try again.',
      );

      setDraft(initialDraft);
      setSelectedImage(null);
      setUploadProgress(null);
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      toast.success('News item published.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to publish news right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Image editor ──────────────────────────────────────────────────────────
  const handleOpenImageEditor = (source: string) => {
    setImageEditor((prev) => ({
      ...prev,
      isOpen: true,
      sourceImage: source,
      crop: { x: 0, y: 0 },
      zoom: 1,
      rotation: 0,
      brightness: 100,
      contrast: 100,
      aspect: 1,
    }));
  };

  const handleApplyCrop = async () => {
    if (!imageEditor.sourceImage || !croppedAreaPixels.width) {
      toast.error('Please select a crop area first.');
      return;
    }
    try {
      const croppedBlob = await cropImage(
        imageEditor.sourceImage,
        croppedAreaPixels,
        imageEditor.rotation,
        imageEditor.brightness,
        imageEditor.contrast,
      );
      const file = new File([croppedBlob], `cropped-${Date.now()}.jpg`, {
        type: 'image/jpeg',
      });
      setSelectedImage(file);
      setImageEditor((prev) => ({ ...prev, isOpen: false }));
      toast.success('Image cropped successfully.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to crop image.');
    }
  };

  const handleReplaceImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0] ?? null;
      if (file) {
        setSelectedImage(file);
        toast.success('Image replaced. Edit it if needed.');
      }
    };
    input.click();
  };

  // ── Edit news ─────────────────────────────────────────────────────────────
  const handleEditNews = (newsItem: NewsItem) => {
    setEditingNewsId(newsItem.id);
    setDraft({
      title: newsItem.title,
      date: newsItem.date,
      contentMarkdown: newsItem.contentMarkdown,
      imageAlt: newsItem.imageAlt ?? '',
    });
    if (newsItem.imageUrl) setImagePreviewUrl(newsItem.imageUrl);
  };

  const handleCancelEdit = () => {
    setEditingNewsId(null);
    setDraft(initialDraft);
    setSelectedImage(null);
    setImagePreviewUrl('');
  };

  const handleSaveEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingNewsId || isSubmitting) return;
    if (!validateDraft()) {
      toast.error('Please fix the highlighted fields.');
      return;
    }
    if (selectedImage && selectedImage.size > MAX_IMAGE_MB * 1024 * 1024) {
      toast.error(`Image must be ${MAX_IMAGE_MB}MB or smaller.`);
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(null);

    try {
      const newsRef = doc(db, 'news', editingNewsId);
      const newsItem = newsItems.find((item) => item.id === editingNewsId);
      let imageUrl = imagePreviewUrl;

      if (selectedImage instanceof File) {
        if (newsItem?.imageUrl) {
          try {
            await deleteObject(ref(storage, newsItem.imageUrl));
          } catch {
            // silently ignore – old image may already be gone
          }
        }
        imageUrl = await uploadImageToStorage(selectedImage);
      }

      await withTimeout(
        updateDoc(newsRef, {
          title: draft.title.trim(),
          date: draft.date.trim(),
          summary: createSummary(draft.contentMarkdown),
          contentMarkdown: draft.contentMarkdown.trim(),
          imageUrl,
          imageAlt: draft.imageAlt.trim(),
          updatedAt: serverTimestamp(),
        }),
        REQUEST_TIMEOUT_MS,
        'Updating timed out. Please try again.',
      );

      setEditingNewsId(null);
      setDraft(initialDraft);
      setSelectedImage(null);
      setImagePreviewUrl('');
      setUploadProgress(null);
      toast.success('News item updated.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to update news right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Delete news ───────────────────────────────────────────────────────────
  const handleDeleteNews = async (newsItemId: string) => {
    if (isDeletingPost) return;
    setIsDeletingPost(true);
    try {
      const newsItem = newsItems.find((item) => item.id === newsItemId);
      if (newsItem?.imageUrl) {
        try {
          await deleteObject(ref(storage, newsItem.imageUrl));
        } catch {
          // silently ignore
        }
      }
      await withTimeout(
        deleteDoc(doc(db, 'news', newsItemId)),
        REQUEST_TIMEOUT_MS,
        'Deleting timed out. Please try again.',
      );
      setDeletingNewsId(null);
      toast.success('News item deleted.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to delete news right now.');
    } finally {
      setIsDeletingPost(false);
    }
  };

  // ── Derived state ─────────────────────────────────────────────────────────
  const emptyState = !isLoadingNews && newsItems.length === 0;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="relative min-h-screen pt-20 sm:pt-24">
      <MolecularBackground className="opacity-20" />

      <div className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 md:py-16">
        {/* ── Hero heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-10 max-w-4xl text-center sm:mb-14"
        >
          <h1 className="mb-6 text-5xl font-display font-bold text-gradient-hero md:text-6xl">
            News
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
            Lab updates, announcements, and milestones appear here.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:gap-10">
          {/* ── Coordinator form ── */}
          {!authLoading && isCoordinator ? (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-primary/10 bg-gradient-card shadow-glow">
                <CardHeader className="flex flex-row items-center justify-between gap-4">
                  <CardTitle className="text-2xl font-display text-gradient-hero">
                    {editingNewsId ? 'Edit News' : 'Post News'}
                  </CardTitle>
                  <div className="flex gap-2">
                    {editingNewsId ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleCancelEdit}
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </Button>
                    ) : null}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPreviewEnabled((c) => !c)}
                    >
                      {isPreviewEnabled ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      {isPreviewEnabled ? 'Hide preview' : 'Show preview'}
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <form
                    className="grid gap-5"
                    onSubmit={editingNewsId ? handleSaveEdit : handleCreateNews}
                  >
                    {/* Title */}
                    <div className="grid gap-2">
                      <Label htmlFor="news-title">Title</Label>
                      <Input
                        id="news-title"
                        value={draft.title}
                        onChange={(e) =>
                          setDraft((c) => ({ ...c, title: e.target.value }))
                        }
                        placeholder="New paper, award, event, or lab update"
                      />
                      {fieldErrors.title ? (
                        <p className="text-sm text-destructive">{fieldErrors.title}</p>
                      ) : null}
                    </div>

                    {/* Date label */}
                    <div className="grid gap-2 sm:max-w-sm">
                      <Label htmlFor="news-date">Date label</Label>
                      <Input
                        id="news-date"
                        value={draft.date}
                        onChange={(e) =>
                          setDraft((c) => ({ ...c, date: e.target.value }))
                        }
                        placeholder="April 2026"
                      />
                      {fieldErrors.date ? (
                        <p className="text-sm text-destructive">{fieldErrors.date}</p>
                      ) : null}
                    </div>

                    {/* Image upload */}
                    <div className="grid gap-2">
                      <Label htmlFor="news-image-file">Image upload</Label>
                      <Input
                        id="news-image-file"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] ?? null;
                          setSelectedImage(file);
                        }}
                      />
                      <div className="grid gap-2 sm:max-w-xl">
                        <Label htmlFor="news-image-alt">
                          Image alt text (optional)
                        </Label>
                        <Input
                          id="news-image-alt"
                          value={draft.imageAlt}
                          onChange={(e) =>
                            setDraft((c) => ({ ...c, imageAlt: e.target.value }))
                          }
                          placeholder="Describe the image for accessibility"
                        />
                        {fieldErrors.imageAlt ? (
                          <p className="text-sm text-destructive">{fieldErrors.imageAlt}</p>
                        ) : null}
                      </div>

                      {imagePreviewUrl ? (
                        <div className="space-y-3">
                          <img
                            src={imagePreviewUrl}
                            alt="Selected upload preview"
                            className="max-h-72 w-full max-w-xl rounded-xl border border-border/60 object-cover"
                          />
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenImageEditor(imagePreviewUrl)}
                            >
                              <ZoomIn className="mr-1 h-4 w-4" />
                              Edit image
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={handleReplaceImage}
                            >
                              <RotateCw className="mr-1 h-4 w-4" />
                              Replace
                            </Button>
                          </div>
                        </div>
                      ) : null}
                    </div>

                    {/* Markdown editor */}
                    <div className="grid gap-2">
                      <Label>Announcement content (Markdown supported)</Label>

                      {/* Toolbar */}
                      <div className="flex flex-wrap gap-2 rounded-lg border border-border/60 bg-background/60 p-2">
                        {markdownToolbar.map((tool) => {
                          const Icon = tool.icon;
                          return (
                            <Button
                              key={tool.label}
                              type="button"
                              size="sm"
                              variant="outline"
                              // Prevent textarea from losing focus/selection on click
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => applyToolbarAction(tool)}
                              title={tool.label}
                            >
                              <Icon className="h-4 w-4" />
                              {tool.label}
                            </Button>
                          );
                        })}
                      </div>

                      <Textarea
                        ref={markdownEditorRef}
                        value={draft.contentMarkdown}
                        onChange={(e) =>
                          setDraft((c) => ({ ...c, contentMarkdown: e.target.value }))
                        }
                        placeholder="Write your update using markdown. Example: ## Big update"
                        className="min-h-[180px]"
                      />
                      {fieldErrors.contentMarkdown ? (
                        <p className="text-sm text-destructive">
                          {fieldErrors.contentMarkdown}
                        </p>
                      ) : null}
                    </div>

                    {/* Live preview */}
                    {isPreviewEnabled ? (
                      <div className="grid gap-2">
                        <Label>Live preview</Label>
                        <div className="rounded-xl border border-border/60 bg-background/70 p-4">
                          {draft.contentMarkdown.trim() ? (
                            <div className="prose prose-sm sm:prose-base max-w-none prose-headings:font-display prose-p:text-foreground prose-li:text-foreground">
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  h2: ({ ...props }) => (
                                    <h2
                                      className="mt-5 text-2xl font-display font-semibold"
                                      {...props}
                                    />
                                  ),
                                  a: ({ ...props }) => (
                                    <a
                                      className="text-primary underline decoration-2 underline-offset-4 hover:text-primary/80"
                                      target="_blank"
                                      rel="noreferrer"
                                      {...props}
                                    />
                                  ),
                                }}
                              >
                                {draft.contentMarkdown}
                              </ReactMarkdown>
                            </div>
                          ) : (
                            <p className="text-muted-foreground">
                              Start writing to preview formatted content.
                            </p>
                          )}
                        </div>
                      </div>
                    ) : null}

                    {/* Footer row */}
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                      <span>{draft.contentMarkdown.length} characters</span>
                      {uploadProgress !== null ? (
                        <span>Uploading image: {uploadProgress}%</span>
                      ) : null}
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto"
                      >
                        {isSubmitting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : editingNewsId ? (
                          <Edit className="h-4 w-4" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                        {editingNewsId ? 'Update news' : 'Publish news'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.section>
          ) : null}

          {/* ── Error state ── */}
          {newsError ? (
            <Card className="border-primary/10 bg-gradient-card shadow-glow">
              <CardContent className="py-6 text-center text-muted-foreground">
                Unable to load news right now.
              </CardContent>
            </Card>
          ) : null}

          {/* ── Empty state ── */}
          {emptyState ? (
            <Card className="border-primary/10 bg-gradient-card shadow-glow">
              <CardContent className="flex min-h-[240px] flex-col items-center justify-center gap-3 py-14 text-center">
                <CalendarDays className="h-10 w-10 text-primary/70" />
                <h2 className="text-2xl font-display font-semibold text-gradient-hero">
                  No news posted yet
                </h2>
                <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  Once the coordinator publishes the first announcement, it will appear here
                  automatically.
                </p>
              </CardContent>
            </Card>
          ) : null}

          {/* ── Loading skeletons ── */}
          {isLoadingNews ? (
            <div className="grid gap-6">
              {[0, 1].map((placeholder) => (
                <Card
                  key={placeholder}
                  className="overflow-hidden border-primary/10 bg-gradient-card shadow-glow"
                >
                  <div className="grid gap-0 lg:grid-cols-[0.95fr,1.05fr]">
                    <div className="min-h-[260px] animate-pulse bg-primary/5" />
                    <CardContent className="flex min-h-[260px] flex-col justify-center gap-4 p-6 sm:p-8 md:p-10">
                      <div className="h-6 w-28 animate-pulse rounded-full bg-primary/10" />
                      <div className="h-10 w-3/4 animate-pulse rounded-lg bg-primary/10" />
                      <div className="h-5 w-full animate-pulse rounded-lg bg-primary/10" />
                      <div className="h-5 w-5/6 animate-pulse rounded-lg bg-primary/10" />
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            /* ── News items ── */
            <div className="grid gap-8">
              {newsItems.map((item, index) => (
                <motion.section
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden border-primary/10 bg-gradient-card shadow-glow">
                    <div className="grid lg:grid-cols-[0.95fr,1.05fr]">
                      {/* Image panel */}
                      <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-4 sm:p-6">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.imageAlt || item.title}
                            className="h-full min-h-[280px] w-full rounded-2xl object-cover shadow-lg"
                          />
                        ) : (
                          <div className="flex min-h-[280px] items-center justify-center rounded-2xl border-2 border-dashed border-border/60 bg-background/60 px-6 text-center text-muted-foreground">
                            <div className="space-y-3">
                              <ImageIcon className="mx-auto h-10 w-10 text-primary/70" />
                              <p>No image supplied for this announcement.</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Content panel */}
                      <CardContent className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
                        <Badge className="mb-4 w-fit border border-accent/20 bg-accent/10 px-3 py-1 font-semibold text-accent">
                          {item.date}
                        </Badge>
                        <h2 className="text-3xl font-display font-bold text-gradient-hero sm:text-4xl">
                          {item.title}
                        </h2>
                        <div className="prose prose-sm sm:prose-base mt-5 max-w-none prose-headings:font-display prose-p:text-foreground prose-li:text-foreground">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              h2: ({ ...props }) => (
                                <h2
                                  className="mt-5 text-2xl font-display font-semibold"
                                  {...props}
                                />
                              ),
                              a: ({ ...props }) => (
                                <a
                                  className="text-primary underline decoration-2 underline-offset-4 hover:text-primary/80"
                                  target="_blank"
                                  rel="noreferrer"
                                  {...props}
                                />
                              ),
                            }}
                          >
                            {item.contentMarkdown || item.summary}
                          </ReactMarkdown>
                        </div>

                        {isCoordinator ? (
                          <div className="mt-6 flex gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditNews(item)}
                            >
                              <Edit className="mr-1 h-4 w-4" />
                              Edit
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button type="button" variant="outline" size="sm">
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => setDeletingNewsId(item.id)}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        ) : null}
                      </CardContent>
                    </div>
                  </Card>
                </motion.section>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Image Editor Modal ───────────────────────────────────────────────── */}
      <Dialog
        open={imageEditor.isOpen}
        onOpenChange={(open) => setImageEditor((prev) => ({ ...prev, isOpen: open }))}
      >
        <DialogContent className="max-h-[95vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
            <DialogDescription className="sr-only">
              Crop, rotate, and adjust brightness and contrast of the selected image.
            </DialogDescription>
          </DialogHeader>

          {imageEditor.sourceImage ? (
            <div className="space-y-5">

              {/* ── Aspect ratio presets ── */}
              <div className="grid gap-1.5">
                <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                  Aspect Ratio
                </Label>
                <div className="flex flex-wrap gap-2">
                  {ASPECT_PRESETS.map((preset) => (
                    <Button
                      key={preset.label}
                      type="button"
                      size="sm"
                      variant={imageEditor.aspect === preset.value ? 'default' : 'outline'}
                      onClick={() =>
                        setImageEditor((prev) => ({
                          ...prev,
                          aspect: preset.value,
                          crop: { x: 0, y: 0 },
                        }))
                      }
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* ── Cropper canvas ── */}
              <div
                className="relative w-full overflow-hidden rounded-xl border border-border/60 bg-black"
                style={{ height: 520 }}
              >
                <Cropper
                  image={imageEditor.sourceImage}
                  crop={imageEditor.crop}
                  zoom={imageEditor.zoom}
                  rotation={imageEditor.rotation}
                  {...(imageEditor.aspect !== null
                    ? { aspect: imageEditor.aspect }
                    : {})}
                  onCropChange={(crop) =>
                    setImageEditor((prev) => ({ ...prev, crop }))
                  }
                  onCropComplete={(_percentArea, pixels) =>
                    setCroppedAreaPixels(pixels)
                  }
                  onZoomChange={(zoom) =>
                    setImageEditor((prev) => ({ ...prev, zoom }))
                  }
                  showGrid
                />
              </div>

              {/* ── Sliders ── */}
              <div className="grid gap-4 sm:grid-cols-2">

                {/* Zoom */}
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label>Zoom</Label>
                    <span className="text-sm tabular-nums text-muted-foreground">
                      {imageEditor.zoom.toFixed(1)}×
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.05"
                    value={imageEditor.zoom}
                    onChange={(e) =>
                      setImageEditor((prev) => ({ ...prev, zoom: parseFloat(e.target.value) }))
                    }
                    className="w-full accent-primary"
                  />
                </div>

                {/* Rotation */}
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label>Rotation</Label>
                    <span className="text-sm tabular-nums text-muted-foreground">
                      {imageEditor.rotation}°
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="1"
                    value={imageEditor.rotation}
                    onChange={(e) =>
                      setImageEditor((prev) => ({ ...prev, rotation: parseFloat(e.target.value) }))
                    }
                    className="w-full accent-primary"
                  />
                </div>

                {/* Brightness */}
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label>Brightness</Label>
                    <span className="text-sm tabular-nums text-muted-foreground">
                      {imageEditor.brightness}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="1"
                    value={imageEditor.brightness}
                    onChange={(e) =>
                      setImageEditor((prev) => ({ ...prev, brightness: parseFloat(e.target.value) }))
                    }
                    className="w-full accent-primary"
                  />
                </div>

                {/* Contrast */}
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label>Contrast</Label>
                    <span className="text-sm tabular-nums text-muted-foreground">
                      {imageEditor.contrast}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="1"
                    value={imageEditor.contrast}
                    onChange={(e) =>
                      setImageEditor((prev) => ({ ...prev, contrast: parseFloat(e.target.value) }))
                    }
                    className="w-full accent-primary"
                  />
                </div>

              </div>

              {/* ── Reset + Actions ── */}
              <div className="flex items-center justify-between gap-2 border-t border-border/40 pt-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setImageEditor((prev) => ({
                      ...prev,
                      crop: { x: 0, y: 0 },
                      zoom: 1,
                      rotation: 0,
                      brightness: 100,
                      contrast: 100,
                    }))
                  }
                >
                  Reset all
                </Button>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setImageEditor((prev) => ({ ...prev, isOpen: false }))}
                  >
                    Cancel
                  </Button>
                  <Button type="button" onClick={handleApplyCrop}>
                    Apply &amp; Save
                  </Button>
                </div>
              </div>

            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirmation Dialog ───────────────────────────────────────── */}
      <Dialog
        open={deletingNewsId !== null}
        onOpenChange={(open) => !open && setDeletingNewsId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete news item?</DialogTitle>
            <DialogDescription className="sr-only">
              Confirm permanent deletion of this news item and its associated image.
            </DialogDescription>
          </DialogHeader>
          <p className="text-muted-foreground">
            This action cannot be undone. The news item and its image will be permanently
            deleted.
          </p>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeletingNewsId(null)}
              disabled={isDeletingPost}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => deletingNewsId && handleDeleteNews(deletingNewsId)}
              disabled={isDeletingPost}
            >
              {isDeletingPost ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default News;
