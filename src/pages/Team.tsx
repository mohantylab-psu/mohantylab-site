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
      icon: "🔬",
      color: "accent",
      members: [],
      applicationInfo: (
        <div className="mt-6 bg-accent/5 border border-accent/20 rounded-lg p-6 text-left">
          <h4 className="font-semibold text-lg mb-3 text-accent">How to Apply:</h4>
          <p className="mb-3">
            Email me with a one-page description of your research, your CV, and a recent publication.
          </p>
          <p>
            I encourage postdoc applicants to explore fellowship opportunities at{' '}
            <a 
              href="https://postdoc.psu.edu/resources/external-funding/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:underline font-semibold"
            >
              https://postdoc.psu.edu/resources/external-funding/
            </a>
            . Please reach out to me beforehand to discuss proposal ideas.
          </p>
        </div>
      )
    },
    {
      title: "Graduate Students",
      icon: "🎓",
      color: "secondary", 
      members: [],
      applicationInfo: (
        <div className="mt-6 bg-secondary/5 border border-secondary/20 rounded-lg p-6 text-left">
          <h4 className="font-semibold text-lg mb-3 text-secondary">How to Apply:</h4>
          <p className="mb-2">
            <strong>Current Penn State students:</strong> Email me with a brief description of your research interests and your CV.
          </p>
          <p>
            <strong>Prospective students:</strong> Check graduate programs here:{' '}
            <a 
              href="https://www.huck.psu.edu/graduate-programs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-secondary hover:underline font-semibold"
            >
              https://www.huck.psu.edu/graduate-programs
            </a>
          </p>
        </div>
      )
    },
    {
      title: "Undergraduate Researchers",
      icon: "📚",
      color: "primary",
      members: [],
      applicationInfo: (
        <div className="mt-6 bg-primary/5 border border-primary/20 rounded-lg p-6 text-left">
          <h4 className="font-semibold text-lg mb-3 text-primary">How to Apply:</h4>
          <p>
            Email me with a description of your research interests, transcript and a CV. We are open to students interested in a summer internship.
          </p>
        </div>
      )
    },
    {
      title: "Alumni",
      icon: "🌟",
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
              <div className="text-4xl mr-4">👩🏽‍🔬</div>
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
                    📧 imm5615@psu.edu
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/mohantyipsita92" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-center px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-all duration-300"
                  >
                    💼 LinkedIn
                  </a>
                  <a 
                    href="https://bsky.app/profile/ipsitamohanty.bsky.social" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-center px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-all duration-300"
                  >
                    🦋 BlueSky
                  </a>
                  <a 
                    href={MohantyIpsitaCV} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-center px-4 py-2 bg-accent/10 hover:bg-accent/20 rounded-lg transition-all duration-300 font-semibold"
                  >
                    📄 View CV
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
                      <span className="text-accent">🏆</span>
                      <span><strong>Early Career Rising Star Award</strong>, Metabolomics Association of North America, 2024</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-accent">🏆</span>
                      <span><strong>Elected Co-Chair</strong>, Gordon Research Seminar (GRS) Metabolomics and Human Health, 2027</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-accent">🏆</span>
                      <span><strong>Bagwell Undergraduate Research Mentor Fellowship</strong>, Georgia Tech, 2021</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-accent">🏆</span>
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

        <div className="grid gap-8 max-w-5xl mx-auto">
          {teamSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="gradient-card border-primary/10 shadow-glow p-8">
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{section.icon}</div>
                  <h2 className="text-3xl font-display font-bold text-gradient-hero">
                    {section.title}
                  </h2>
                </div>
                
                {section.members.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4 opacity-50">🌱</div>
                    <p className="text-xl text-muted-foreground mb-4">
                      We're growing our team!
                    </p>
                    <p className="text-foreground/80 mb-4">
                      This section will be updated as we welcome new members to our research family.
                    </p>
                    <div className="inline-block mt-4 px-4 py-2 text-sm font-medium text-muted-foreground border border-border/50 rounded-md">
                      Positions Available
                    </div>
                    {section.applicationInfo && section.applicationInfo}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {section.members.map((member, memberIndex) => (
                      <div key={memberIndex} className="text-center">
                        {/* Team member cards will be added here */}
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16"
        >
          <Card className="gradient-card border-accent/20 shadow-molecular p-10 max-w-3xl mx-auto">
            <h3 className="text-3xl font-display font-bold mb-6 text-gradient-accent">
              Want to Join Our Team?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We're always looking for passionate researchers who want to decode the hidden language of microbes. 
              Whether you're a graduate student, postdoc, or undergraduate, we'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Badge className="bg-gradient-accent text-background font-semibold px-6 py-3 text-base cursor-pointer hover:shadow-glow transition-all duration-300">
                📧 Contact Us About Opportunities
              </Badge>
              <Badge className="bg-gradient-hero text-background font-semibold px-6 py-3 text-base cursor-pointer hover:shadow-glow transition-all duration-300">
                🔬 Learn About Our Research
              </Badge>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;
