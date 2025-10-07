import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MolecularBackground from '@/components/MolecularBackground';
import MediaPictureImg from '@/assets/Media_picture.jpg';

const Publications = () => {
  const publications = [
    {
      authors: "Mohanty, I., Mannochio-Russo, H., Abiead, Y. L., Schweer, J. V., Bittremieux, W., et al.",
      year: "2024",
      title: "The Under-appreciated Diversity of Bile Acid Modifications",
      journal: "Cell",
      volume: "187(7)",
      pages: "1801-1818",
      link: "https://doi.org/10.1016/j.cell.2024.03.019"
    },
    {
      authors: "Mohanty, I., Allaband, C., Mannochio-Russo, H., Abiead, Y. L., Hagey, L. R., Knight, R., Dorrestein, P. C.",
      year: "2024",
      title: "A Perspective: The changing metabolic landscape of bile acids, keys to metabolism and immune regulation",
      journal: "Nature Reviews Gastroenterology and Hepatology",
      volume: "",
      pages: "",
      link: "https://doi.org/10.1038/s41575-024-00914-3"
    },
    {
      authors: "Mohanty, I., Xing, S., Castillo, V., Agongo, J., Patan, A., et al.",
      year: "2025",
      title: "MS/MS mass spectrometry filtering tree for bile acid isomer annotation",
      journal: "bioRxiv",
      volume: "",
      pages: "",
      link: "https://doi.org/10.1101/2025.03.04.641505"
    },
    {
      authors: "Mohanty, I., Tapadar, S., Moore, S. G., Biggs, J. S., Freeman, C. J., Gaul, D. A., Garg, N., and Agarwal, V.",
      year: "2021",
      title: "Presence of bromotyrosine alkaloids in marine sponges is independent of metabolomic and microbiome architectures",
      journal: "mSystems",
      volume: "6(2)",
      pages: "e01387-20",
      link: "https://doi.org/10.1128/mSystems.01387-20"
    },
    {
      authors: "Mohanty, I., Moore, S. G., Yi, D., Biggs, J. S., Gaul, D. A., Garg, N., and Agarwal, V.",
      year: "2020",
      title: "Precursor-guided mining of marine sponge metabolomes lends insight into biosynthesis of pyrrole-imidazole alkaloids",
      journal: "ACS Chem. Biol.",
      volume: "15(8)",
      pages: "2185-2194",
      link: "https://doi.org/10.1021/acschembio.0c00392"
    }
  ];

  const mediaItems = [
    {
      title: "\"Molecular Rosetta Stone\" Reveals How our Microbiome Talks to Us",
      source: "UC San Diego Today",
      date: "2024",
      link: "https://today.ucsd.edu/story/molecular-rosetta-stone-reveals-how-our-microbiome-talks-to-us",
      image: MediaPictureImg
    }
  ];

  return (
    <div className="relative min-h-screen pt-20 sm:pt-24">
      <MolecularBackground className="opacity-20" />
      
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 sm:mb-8 text-gradient-hero px-2">
            Publications & Media
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Sharing our discoveries and insights with the scientific community and beyond
          </p>
        </motion.div>

        <div className="grid gap-8 max-w-5xl mx-auto">
          {/* Selected Publications Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="gradient-card border-primary/10 shadow-glow p-8">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">📚</div>
                <div>
                  <h2 className="text-3xl font-display font-bold text-gradient-hero">
                    Selected Publications
                  </h2>
                </div>
              </div>
              
              <div className="space-y-6">
                {publications.map((pub, index) => (
                  <div key={index} className="p-4 rounded-lg bg-background/5 border border-primary/5 hover:border-primary/20 transition-all duration-300">
                    <p className="text-foreground/90 leading-relaxed mb-2">
                      {pub.authors} ({pub.year}). <em>{pub.title}</em>. <strong>{pub.journal}</strong>
                      {pub.volume && `, ${pub.volume}`}
                      {pub.pages && `, ${pub.pages}`}.
                    </p>
                    <a 
                      href={pub.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 text-sm underline"
                    >
                      🔗 {pub.link}
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-accent/5 rounded-lg border-l-4 border-accent">
                <p className="text-foreground/90">
                  For a complete list of publications, please check{' '}
                  <a 
                    href="https://scholar.google.com/citations?user=iHJ3vgsAAAAJ&hl=en&oi=ao" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-accent font-semibold underline hover:text-accent/80"
                  >
                    Google Scholar
                  </a>
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Media Coverage Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="gradient-card border-secondary/10 shadow-glow p-8">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">📰</div>
                <div>
                  <h2 className="text-3xl font-display font-bold text-gradient-hero">
                    Media Coverage
                  </h2>
                </div>
              </div>
              
              <div className="space-y-6">
                {mediaItems.map((item, index) => (
                  <div key={index} className="p-6 rounded-lg bg-background/5 border border-secondary/5 hover:border-secondary/20 transition-all duration-300">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="md:col-span-1">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-48 object-cover photo-img"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <h3 className="text-xl font-semibold mb-2 text-gradient-accent">{item.title}</h3>
                        <p className="text-muted-foreground mb-3">
                          <strong>{item.source}</strong> • {item.date}
                        </p>
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 underline"
                        >
                          Read full article →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Commitment Statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Card className="gradient-card border-accent/20 shadow-molecular p-10 max-w-4xl mx-auto">
            <h3 className="text-3xl font-display font-bold mb-6 text-gradient-accent">
              Our Commitment to Open Science
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe in the power of open science and knowledge sharing. Our research findings, 
              data, and methodologies will be made available to the scientific community to accelerate 
              discovery and advance our understanding of host-microbe interactions. Stay tuned for 
              updates on our publications, presentations, and community engagement activities.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Publications;
