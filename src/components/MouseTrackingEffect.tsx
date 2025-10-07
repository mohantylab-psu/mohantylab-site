import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

const MouseTrackingEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Color palette for particles
  const colors = ['#3b82f6', '#06b6d4', '#a855f7', '#10b981', '#f59e0b'];

  const createParticle = (x: number, y: number): Particle => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2 + 1;
    
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      maxLife: Math.random() * 60 + 30,
      size: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  };

  const updateParticles = () => {
    particles.current = particles.current.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life++;
      
      // Apply some gravity and friction
      particle.vy += 0.05;
      particle.vx *= 0.99;
      particle.vy *= 0.99;
      
      return particle.life < particle.maxLife;
    });

    // Add new particles when hovering
    if (isHovering && Math.random() < 0.3) {
      particles.current.push(createParticle(mouse.current.x, mouse.current.y));
    }
  };

  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw connection lines between nearby particles
    for (let i = 0; i < particles.current.length; i++) {
      for (let j = i + 1; j < particles.current.length; j++) {
        const p1 = particles.current[i];
        const p2 = particles.current[j];
        const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
        
        if (distance < 100) {
          const opacity = (1 - distance / 100) * 0.3;
          ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.current.forEach(particle => {
      const opacity = 1 - (particle.life / particle.maxLife);
      const size = particle.size * opacity;
      
      ctx.save();
      ctx.globalAlpha = opacity;
      
      // Particle glow effect
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, size * 2
      );
      gradient.addColorStop(0, particle.color);
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, size * 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Inner bright core
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, size / 2, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    });

    // Draw mouse cursor effect
    if (isHovering) {
      const gradient = ctx.createRadialGradient(
        mouse.current.x, mouse.current.y, 0,
        mouse.current.x, mouse.current.y, 30
      );
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, 30, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    updateParticles();
    drawParticles(ctx);

    animationFrameId.current = requestAnimationFrame(animate);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouse.current.x = e.clientX - rect.left;
    mouse.current.y = e.clientY - rect.top;

    // Add particles on mouse movement with some randomness
    if (Math.random() < 0.7) {
      particles.current.push(createParticle(mouse.current.x, mouse.current.y));
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();
    
    // Start animation
    animate();

    // Event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        mixBlendMode: 'screen',
        opacity: 0.8
      }}
    />
  );
};

export default MouseTrackingEffect;
