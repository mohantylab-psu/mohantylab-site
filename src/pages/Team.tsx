import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MolecularBackground from '@/components/MolecularBackground';
import IpsitaMohantyImg from '@/assets/Ipsita_Mohanty_final_optimized.png';
import MentoringPhilosophyImg from '@/assets/mentoring_philosophy.png';
import Fun1Img from '@/assets/fun_1.jpg';
import Fun2Img from '@/assets/fun_2.png';
import Fun3Img from '@/assets/fun_3.jpeg';
import Fun4Img from '@/assets/fun_4.jpeg';
import Fun5Img from '@/assets/fun_5.jpeg';
import Fun6Img from '@/assets/fun_6.jpg';
import Fun7Img from '@/assets/fun_7.jpg';
import MohantyIpsitaCV from '@/assets/Mohanty_Ipsita_CV.pdf';
import { useEffect, useState } from 'react';
import { Award, BookOpen, Cloud, FileText, FlaskConical, GraduationCap, Linkedin, Mail, Microscope, Users } from 'lucide-react';

type TeamMember = {
  name: string;
  dates: string;
  title: string;
  image: string;
  summary: string;
  details: string[];
};

const gradStudentImages = import.meta.glob('../assets/grad students/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const resolveGradStudentImage = (fragment: string) => {
  const match = Object.entries(gradStudentImages).find(([path]) => path.includes(fragment));
  return match?.[1] ?? '';
};

const sectionToneStyles = {
  primary: {
    label: 'text-primary',
    heading: 'text-primary',
    badge: 'border-primary/20 bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary',
    border: 'border-primary/15',
    count: 'border-primary/15 bg-primary/5 text-primary/80 hover:bg-primary/5 hover:text-primary/80',
  },
  secondary: {
    label: 'text-secondary',
    heading: 'text-secondary',
    badge: 'border-secondary/20 bg-secondary/10 text-secondary hover:bg-secondary/10 hover:text-secondary',
    border: 'border-secondary/15',
    count: 'border-secondary/15 bg-secondary/5 text-secondary/80 hover:bg-secondary/5 hover:text-secondary/80',
  },
  accent: {
    label: 'text-accent',
    heading: 'text-accent',
    badge: 'border-accent/20 bg-accent/10 text-accent hover:bg-accent/10 hover:text-accent',
    border: 'border-accent/15',
    count: 'border-accent/15 bg-accent/5 text-accent/80 hover:bg-accent/5 hover:text-accent/80',
  },
} as const;

const sakilImg = resolveGradStudentImage('6.42.24');
const swatiImg = resolveGradStudentImage('6.42.43');
const hunterImg = resolveGradStudentImage('6.43.01');

const graduateStudents: TeamMember[] = [
  {
    name: 'Md Sakil Arman',
    dates: 'Jan 2026-present',
    title: 'Ph.D. Student, Molecular, Cellular, and Integrative Biosciences',
    image: sakilImg,
    summary:
      'Md Sakil Arman is a Ph.D. student in the Molecular, Cellular, and Integrative Biosciences (MCIBS) program at Penn State University. He joined the Mohanty Lab in January 2026, and his research focuses on developing computational metabolomics pipelines to discover, characterize, and annotate diet-associated metabolite biomarkers and understand their impact on human health.',
    details: [
      'Sakil completed his B.Sc. (Honors) and M.Sc. (Thesis) degrees in Biochemistry and Molecular Biology from Shahjalal University of Science and Technology, Bangladesh.',
      'Aside from research, he enjoys spending time with family, contributing to his community, playing games, and exploring natural landscapes such as lakes and mountains.',
    ],
  },
  {
    name: 'Swati Shyam Prasad',
    dates: 'Feb 2026-present',
    title: 'Ph.D. Student, Biochemistry, Microbiology, and Molecular Biology',
    image: swatiImg,
    summary:
      'Swati Shyam Prasad is a Ph.D. student in the Biochemistry, Microbiology, and Molecular Biology (BMMB) program at Penn State University and is co-advised by Dr. Mohanty and Dr. McReynolds. She joined the Mohanty Lab in February 2026 following research training at inStem with Dr. Laxman.',
    details: [
      "She completed her undergraduate degree in Microbiology from Mount Carmel College (MCC), Bengaluru, India, and her master's degree in Human Disease Genetics from the Centre for Human Genetics (CHG), Bengaluru.",
      'Her current research aims to understand taurine metabolism in the context of aging and integrate these insights with bile acid biology and the microbiome.',
      'Outside of research, she enjoys lifting weights at the gym, reading, and attempting ice skating.',
    ],
  },
];

const labTechnicians: TeamMember[] = [
  {
    name: 'Hunter Caleb Trithart',
    dates: 'Jan 2026-present',
    title: 'Research Lab Technician',
    image: hunterImg,
    summary:
      'Hunter is an experienced Research Lab Technician with a lifelong interest in science and a desire to advance scientific research.',
    details: [
      "In his undergrad, Hunter studied Biobehavioral Health and Biology at Penn State with a particular interest in human physiology and pharmacology.",
      "After obtaining his Bachelor's degree, Hunter pursued his interest in science and medical biology, working at Penn State in Health and Molecular Biology labs.",
      "Hunter brings his passion for scientific research, meticulous attention to detail, and strong work ethic to the Mohanty Lab. He is eager to further expand his expertise and contribute meaningfully to Dr. Mohanty's research efforts.",
    ],
  },
];

const MemberCard = ({ member, category, tone }: { member: TeamMember; category: string; tone: keyof typeof sectionToneStyles }) => {
  const toneStyles = sectionToneStyles[tone];

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/80 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="grid gap-0 md:grid-cols-[220px,1fr] md:items-center">
        <div className="flex h-full items-center justify-center p-4 sm:p-5 bg-background/60">
          <div className="w-full overflow-hidden rounded-xl border border-border/60 bg-background">
            <img
              src={member.image}
              alt={member.name}
              className="aspect-[4/5] w-full object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 p-5 sm:p-6 md:p-7">
          <div className="flex flex-col gap-2">
            <p className={`text-xs font-semibold uppercase tracking-[0.25em] ${toneStyles.label}`}>
              {category}
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className={`text-xl sm:text-2xl font-display font-semibold ${toneStyles.heading}`}>
                  {member.name}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  {member.title}
                </p>
              </div>
              <Badge variant="outline" className={`w-fit rounded-md border px-2.5 py-1 text-[10px] font-medium sm:text-xs shadow-none ${toneStyles.badge}`}>
                {member.dates}
              </Badge>
            </div>
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-foreground/80">
            {member.summary}
          </p>

          <div className="border-t border-border/60 pt-3">
            <ul className="space-y-2 text-xs sm:text-sm leading-relaxed text-foreground/75">
              {member.details.map((detail) => (
                <li key={detail} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary/70 shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const Team = () => {
  // Preload the PI image for immediate rendering
  useEffect(() => {
    const img = new Image();
    img.src = IpsitaMohantyImg;
  }, []);

  const [offset, setOffset] = useState(0);

  const funImages = [
    { src: Fun1Img, alt: "Lab Fun 1" },
    { src: Fun2Img, alt: "Lab Fun 2" },
    { src: Fun3Img, alt: "Lab Fun 3" },
    { src: Fun4Img, alt: "Lab Fun 4" },
    { src: Fun5Img, alt: "Lab Fun 5" },
    { src: Fun6Img, alt: "Lab Fun 6" },
    { src: Fun7Img, alt: "Lab Fun 7" },
  ];

  // Seamless carousel animation
  useEffect(() => {
    const animate = () => {
      setOffset(prev => {
        const newOffset = prev + 0.02;
        const singleSetWidth = 100 / 3; // Each set is 33.33% since we have 3 sets
        // Reset seamlessly when first set has scrolled out of view
        if (newOffset >= singleSetWidth) {
          return newOffset - singleSetWidth;
        }
        return newOffset;
      });
    };

    const intervalId = setInterval(animate, 16); // ~60fps
    return () => clearInterval(intervalId);
  }, []);

  const teamSections = [
    {
      title: "Postdocs",
      icon: Microscope,
      color: "accent",
      members: [],
      intro: "Postdoctoral positions in the Mohanty Lab focus on metabolomics, enzyme discovery, and mechanistic microbiome research."
    },
    {
      title: "Graduate Students",
      icon: GraduationCap,
      color: "secondary", 
      members: graduateStudents,
      intro: "Our graduate students combine experimental and computational approaches to uncover how microbial chemistry shapes human health.",
    },
    {
      title: "Lab Technicians",
      icon: FlaskConical,
      color: "accent",
      members: labTechnicians,
      intro: "Our lab technicians keep the experimental pipeline moving and support the day-to-day pace of discovery.",
    },
    {
      title: "Undergraduate Researchers",
      icon: BookOpen,
      color: "primary",
      members: [],
      intro: "Undergraduate researchers in the lab gain hands-on experience across wet-lab and computational projects."
    },
    {
      title: "Alumni",
      icon: Users,
      color: "secondary",
      members: []
    }
  ];

  return (
    <div className="relative min-h-screen pt-20 sm:pt-24">
      <MolecularBackground className="opacity-20" />
      
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-gradient-hero">
            Meet Our Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Decoding the hidden language of microbes to improve human health.
          </p>
        </motion.div>

        {/* Principal Investigator Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <Card className="gradient-card border-primary/10 shadow-glow p-6 sm:p-8 md:p-10">
            <div className="flex items-center mb-6">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/15 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 text-primary">
                <Microscope className="h-6 w-6" aria-hidden="true" />
              </div>
              <h2 className="text-3xl font-display font-bold text-gradient-hero">
                Principal Investigator
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="md:col-span-1 flex flex-col items-center">
                <img 
                  src={IpsitaMohantyImg} 
                  alt="Dr. Ipsita Mohanty" 
                  className="w-full max-w-xs photo-img mb-4"
                  loading="eager"
                  fetchPriority="high"
                />
                <h3 className="text-2xl font-bold text-gradient-hero mb-2">Dr. Ipsita Mohanty</h3>
                <p className="text-primary font-semibold mb-4">Assistant Professor</p>
                <div className="flex flex-col gap-2 w-full">
                  <a 
                    href="mailto:imm5615@psu.edu" 
                    className="text-center px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-all duration-300"
                  >
                    <span className="inline-flex items-center justify-center gap-2">
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      <span>imm5615@psu.edu</span>
                    </span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/mohantyipsita92" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-center px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-all duration-300"
                  >
                    <span className="inline-flex items-center justify-center gap-2">
                      <Linkedin className="h-4 w-4" aria-hidden="true" />
                      <span>LinkedIn</span>
                    </span>
                  </a>
                  <a 
                    href="https://bsky.app/profile/ipsitamohanty.bsky.social" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-center px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-all duration-300"
                  >
                    <span className="inline-flex items-center justify-center gap-2">
                      <Cloud className="h-4 w-4" aria-hidden="true" />
                      <span>BlueSky</span>
                    </span>
                  </a>
                  <a 
                    href={MohantyIpsitaCV} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-center px-4 py-2 bg-accent/10 hover:bg-accent/20 rounded-lg transition-all duration-300 font-semibold"
                  >
                    <span className="inline-flex items-center justify-center gap-2">
                      <FileText className="h-4 w-4" aria-hidden="true" />
                      <span>View CV</span>
                    </span>
                  </a>
                </div>
              </div>
              
              <div className="md:col-span-2 prose prose-lg max-w-none text-foreground/90 leading-relaxed space-y-4">
                <p>
                  Ipsita Mohanty is an Assistant Professor of Pharmacology in the Department of Veterinary and Biomedical Sciences and the Department of Nutritional Sciences at Penn State University (University Park), where she leads the Mohanty Lab. Her group decodes how the gut microbiome communicates with the host by discovering the enzymes and metabolites that convey these messages and by mapping how these signals impact human health.
                </p>
                <p>
                  Trained at the interface of biochemistry, molecular biology, and data science, Dr. Mohanty integrates mass spectrometry-driven metabolomics, proteomics, and computational mining to uncover previously unknown microbial enzymes and specialized metabolites (including bile acids) that modulate host pathways.
                </p>
                <p>
                  She completed her integrated Bachelor's and Master's degrees in Chemistry from the Indian Institute of Technology, Kharagpur, in India. She earned her Ph.D. in Chemistry from the Georgia Institute of Technology under the supervision of Dr. Neha Garg and Dr. Vinayak Agarwal. She completed her postdoctoral training in the lab of Dr. Pieter Dorrestein at the University of California, San Diego.
                </p>
                <p>
                  Her lab pairs large-scale repository searches with in vitro/in vivo experiments to transition from association to mechanism, enabling the discovery of biomarkers and therapeutics.
                </p>
                
                <div className="bg-primary/5 rounded-xl p-6 border-l-4 border-primary mt-6">
                  <h4 className="text-xl font-semibold mb-4 text-primary">Research Program Centers on Three Themes:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <span className="text-primary font-bold">Discover:</span>
                      <span>Repository-scale mining (GNPS/MassIVE), untargeted LC-MS/MS, and in silico annotation to expand the atlas of microbially-modified metabolites and their enzymes.</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-primary font-bold">Decode:</span>
                      <span>High-throughput enzyme-substrate screens, activity-guided fractionation, and receptor panels to map who does what and how messages act on host targets.</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-primary font-bold">Modulate:</span>
                      <span>Conduct mechanistic studies in models of diet, drug exposure, and aging (including taurine supplementation) to test causality and identify the impacts of interventions.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-accent/5 rounded-xl p-6 border-l-4 border-accent mt-6">
                  <h4 className="text-xl font-semibold mb-4 text-accent">Awards and Recognitions</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-3">
                      <Award className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span><strong>Early Career Rising Star Award</strong>, Metabolomics Association of North America, 2024</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Award className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span><strong>Elected Co-Chair</strong>, Gordon Research Seminar (GRS) Metabolomics and Human Health, 2027</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Award className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span><strong>Bagwell Undergraduate Research Mentor Fellowship</strong>, Georgia Tech, 2021</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Award className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span><strong>Institute Silver Medal</strong>, IIT Kharagpur, 2017</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* Mentoring Philosophy Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <Card className="gradient-card border-secondary/10 shadow-glow p-6 sm:p-8 md:p-10">
            <h2 className="text-3xl font-display font-bold text-gradient-hero mb-6">
              Mentoring Philosophy
            </h2>
            
            <div className="mb-8 flex justify-center scientific-diagram">
              <img 
                src={MentoringPhilosophyImg} 
                alt="Mentoring Philosophy - E-S-I-A" 
                className="max-w-full h-auto rounded-xl"
              />
            </div>
            
            <div className="prose prose-lg max-w-none text-foreground/90 leading-relaxed">
              <p>
                <strong>Mentoring Philosophy (E-S-I-A):</strong> I lead with <strong>Enthusiasm</strong>:curiosity, energy, and a culture that celebrates progress, not perfection. I am <strong>Student-centered</strong>: trainees co-design an Individual Development Plan, align projects with their goals, and receive transparent expectations on authorship, data practices, and timelines. My training is <strong>Integrative</strong>:combining mass spectrometry, microbiology, computation, and communication through scaffolded independence, peer mentoring, and open, reproducible science. And I stay <strong>Adaptive</strong>: weekly 1:1s, rapid feedback loops, and quarterly goal reviews enable me to adjust scope, support, and pace as needs change, while maintaining psychological safety and inclusion. The aim is simple - to help each person grow from learner to independent scientist who are excited and confident to chart their own scientif journeys with rigor and ethics.
              </p>
            </div>
          </Card>
        </motion.section>

        {/* Have Fun. Do Science. Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <Card className="gradient-card border-accent/10 shadow-glow p-6 sm:p-8 md:p-10">
            <h2 className="text-3xl font-display font-bold text-gradient-accent text-center mb-8">
              Have fun. Do science.
            </h2>
            
            <div className="overflow-hidden relative">
              <div 
                className="flex"
                style={{
                  transform: `translateX(-${offset}%)`,
                  width: `${funImages.length * 3 * 20}%`
                }}
              >
                {/* Triple the images for seamless infinite loop */}
                {[...funImages, ...funImages, ...funImages].map((image, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 px-2"
                    style={{ width: `${100 / (funImages.length * 3)}%` }}
                  >
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-48 object-cover object-center photo-img hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.section>

        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10 pb-6 sm:pb-10">
          {teamSections.map((section, index) => {
            const SectionIcon = section.icon;

            return (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.55 }}
                viewport={{ once: true, margin: '-80px' }}
                aria-labelledby={`${section.title.toLowerCase().replace(/\s+/g, '-')}-heading`}
              >
                <Card className={`border ${sectionToneStyles[section.color].border} bg-card/80 shadow-sm overflow-hidden`}>
                  <div className="p-5 sm:p-7 md:p-8">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 text-foreground/80">
                          <SectionIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 id={`${section.title.toLowerCase().replace(/\s+/g, '-')}-heading`} className={`text-2xl sm:text-3xl font-display font-semibold ${sectionToneStyles[section.color].heading}`}>
                            {section.title}
                          </h3>
                          <p className="mt-1 text-sm sm:text-base text-muted-foreground">
                            {section.intro ?? 'Section details and updates are listed below.'}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className={`w-fit rounded-md border px-2.5 py-1 text-xs font-medium shadow-none ${sectionToneStyles[section.color].count}`}>
                        {section.members.length === 1 ? '1 member' : `${section.members.length} members`}
                      </Badge>
                    </div>

                    {section.members.length === 0 ? (
                      section.applicationInfo ? (
                        <div className="rounded-2xl border border-border/60 bg-background/60 p-5 sm:p-6 text-sm sm:text-base text-foreground/85 leading-relaxed">
                          {section.applicationInfo}
                        </div>
                      ) : null
                    ) : (
                      <div className="space-y-5">
                        {section.members.map((member) => (
                          <div key={member.name} className="mx-auto w-full max-w-3xl">
                            <MemberCard member={member} category={section.title} tone={section.color} />
                          </div>
                        ))}

                        {section.applicationInfo && (
                          <div className="rounded-2xl border border-border/60 bg-background/50 p-5 sm:p-6 text-sm sm:text-base text-foreground/85 leading-relaxed">
                            {section.applicationInfo}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              </motion.section>
            );
          })}

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-80px' }}
            className="pt-2"
          >
            <Card className="border border-border/60 bg-background/80 shadow-sm overflow-hidden">
              <div className="px-6 py-10 sm:px-8 sm:py-12 md:px-10 md:py-14 text-center">
                <h3 className="text-2xl sm:text-3xl font-display font-semibold text-foreground">
                  Want to join the lab?
                </h3>
                <p className="mx-auto mt-4 max-w-3xl text-sm sm:text-base text-muted-foreground leading-relaxed">
                  We are always looking for thoughtful, energetic people who want to help decode microbial chemistry. Reach out if you see yourself contributing to the lab&apos;s work.
                </p>
                <div className="mt-7 flex flex-col sm:flex-row items-stretch justify-center gap-3 sm:gap-4">
                  <Badge className="inline-flex items-center justify-center rounded-md border border-border/60 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 px-5 py-2.5 text-sm font-medium text-foreground">
                    Contact us about opportunities
                  </Badge>
                  <Badge className="inline-flex items-center justify-center rounded-md border border-border/60 bg-gradient-to-r from-accent/10 via-primary/5 to-secondary/10 px-5 py-2.5 text-sm font-medium text-foreground">
                    Learn about our research
                  </Badge>
                </div>
              </div>
            </Card>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default Team;
