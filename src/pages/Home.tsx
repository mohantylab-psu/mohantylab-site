import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import MohantyMissionImg from '@/assets/Mohanty_mission_NEW.png';
import ResearchFocus1Img from '@/assets/Research_focus_1_icon_NEW.png';
import ResearchFocus2Img from '@/assets/Research_focus_2_icon_NEW.png';
import ResearchFocus3Img from '@/assets/Research_focus_3_icon_NEW.png';
import DCAMoleculeImg from '@/assets/DCA_molecule_of_the_month.png';

const Home = () => {

  const researchAreas = useMemo(() => [
    {
      title: "Discover: Data Science-Driven Discovery for Biomedical Insights",
      image: ResearchFocus1Img,
      description: "Building a data-science-powered atlas of microbially modified metabolites across diverse states of human health and disease."
    },
    {
      title: "Decode: Microbial Signals in Human Health", 
      image: ResearchFocus2Img,
      description: "Mapping the molecular language of host–microbiome communication through innovative mass spectrometry."
    },
    {
      title: "Modulate: Microbial Messages in Action",
      image: ResearchFocus3Img, 
      description: "Collaborating across disciplines to uncover mechanisms that bridge chemistry and biology."
    }
  ], []);

  return (
    <div className="relative min-h-screen">      
      {/* Hero Section */}
      <section 
        className="relative pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6"
      >
        <div className="container mx-auto">
          <motion.div
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Celebration Banner */}
            <motion.div
              className="inline-flex items-center space-x-2 bg-gradient-hero/10 border border-primary/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="text-2xl sm:text-3xl">🎉</span>
              <span className="text-primary font-semibold text-xl sm:text-2xl">The Mohanty Lab Has Launched!</span>
              <span className="text-2xl sm:text-3xl">🎉</span>
            </motion.div>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              We are kicking off at the beautiful Penn State University Park campus - right in the heart of Happy Valley! 🌿✨
            </motion.p>

            {/* Recruitment Section */}
            <motion.div
              className="bg-gradient-card/30 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 mb-12 sm:mb-16 border border-primary/10 shadow-glow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ willChange: 'transform, opacity' }}
            >
              <h2 className="text-xl sm:text-2xl font-display font-semibold mb-6 text-gradient-accent text-center sm:text-left">
                🚀 We are on the lookout for:
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-primary/5">
                  <span className="text-2xl flex-shrink-0">🌱</span>
                  <span className="font-medium text-sm sm:text-base">Graduate students ready to grow their research journey</span>
                </div>
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/5">
                  <span className="text-2xl flex-shrink-0">🔬</span>
                  <span className="font-medium text-sm sm:text-base">Postdocs excited to push boundaries in science</span>
                </div>
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-accent/5 sm:col-span-2 lg:col-span-1">
                  <span className="text-2xl flex-shrink-0">💡</span>
                  <span className="font-medium text-sm sm:text-base">Undergraduates who want to volunteer and get hands-on experience</span>
                </div>
              </div>
              <p className="text-base sm:text-lg mb-6 text-center sm:text-left">
                If you are curious, creative, and eager to decode the hidden language of microbes - come join us!
              </p>
              <div className="text-center">
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="gradient-accent hover:shadow-glow transition-all duration-300 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
                  >
                    📩 Apply Today - Join Our Founding Team!
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-center mb-8 sm:mb-12 text-gradient-hero px-2 pb-2">
              Our Mission – Decoding Microbial Messages
            </h2>
            
            <div className="mb-8 sm:mb-12 flex justify-center scientific-diagram">
              <img 
                src={MohantyMissionImg} 
                alt="Mohanty Lab Mission" 
                className="max-w-full h-auto rounded-xl"
              />
            </div>
            
            <div className="gradient-card/20 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-card border border-primary/10 mb-12 sm:mb-16">
              <div className="prose prose-lg max-w-none text-foreground/90 leading-relaxed space-y-6">
                <p>
                  At the Mohanty Lab, we see science as a detective's craft - uncovering the hidden conversations between microbes and their host. Just as languages allow us to communicate with each other, microbes living inside us communicate with us using an undiscovered chemical vocabulary with profound consequences for our health and disease.
                </p>
                
                <p>
                  Inspired by the complexity of these microbial messages (chemicals) and their impact on human health, we aim to intercept and decode these hidden signals by discovering previously uncharacterized metabolites. We will combine state-of-the-art metabolomics, data science, and experimental biology to translate the chemical whispers from the microbes into biological insights.
                </p>

                <div className="bg-primary/5 rounded-xl p-6 border-l-4 border-primary">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Together we will:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <span className="text-primary">•</span>
                      <span>Decipher the molecular language of host–microbiome communication through innovative mass spectrometry and advanced data science-driven approaches</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-primary">•</span>
                      <span>Illuminate how microbial signals influence aging, diet, supplements, and metabolic diseases</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-primary">•</span>
                      <span>Collaborate across disciplines to uncover mechanisms that bridge chemistry and biology, from in vitro experiments to in vivo models</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-primary">•</span>
                      <span>Mentor the next generation of scientists to think boldly, creatively, and interdisciplinarily about life's hidden chemistry</span>
                    </li>
                  </ul>
                </div>

                <blockquote className="text-xl font-semibold italic text-center py-6 px-8 bg-gradient-accent/10 rounded-xl border border-accent/20">
                  "The host-microbe dialogue is not noise - it is a code. Like a modern-day Rosetta Stone, we are at the forefront of translating these chemical communications into an understanding of biology, with the vision of rewriting the way we approach human health and disease."
                </blockquote>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Research Focus Areas */}
      <section className="py-12 sm:py-16 md:py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-gradient-hero">
              At the frontier of host-microbe communication
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discovering, decoding, and validating hidden metabolites
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {researchAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link to="/research">
                  <Card className="p-6 sm:p-8 md:p-10 h-full gradient-card/30 backdrop-blur-lg border-primary/10 hover:shadow-glow transition-all duration-500 cursor-pointer group">
                    <div className="text-center">
                      <div className="mb-4 sm:mb-6 flex justify-center">
                        <img 
                          src={area.image} 
                          alt={area.title}
                          className="w-24 h-24 sm:w-32 sm:h-32 object-contain group-hover:scale-110 transition-transform duration-300 research-icon"
                        />
                      </div>
                      <h3 className="text-lg sm:text-xl font-display font-semibold mb-3 sm:mb-4 text-primary group-hover:text-gradient-accent transition-all duration-300">
                        {area.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Molecule of the Month */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="gradient-card/30 backdrop-blur-lg border-accent/20 shadow-molecular p-6 sm:p-8 md:p-12 text-left">
              <h2 className="text-3xl font-display font-bold mb-6 text-gradient-accent">
                Molecule of the Month: Deoxycholic Acid
              </h2>
              
              <div className="mb-6 flex justify-center molecule-img">
                <img 
                  src={DCAMoleculeImg} 
                  alt="Deoxycholic Acid Structure" 
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
              
              <div className="space-y-6 text-lg leading-relaxed">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🧬</span>
                  <span>A bile acid produced by gut microbes.</span>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-2xl mt-1">💡</span>
                  <div>
                    <strong>Fun fact:</strong> DCA is actually an FDA-approved drug (brand name Kybella®) – it is injected to dissolve submental fat (double chins).
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-2xl mt-1">🔍</span>
                  <div>
                    <strong>Why it's cool:</strong> Deoxycholic acid was the first microbial bile acid ever identified, proving that gut microbes don't just live alongside us - they actively reshape our chemistry. DCA can interact with host receptors like FXR and TGR5, influencing metabolism, energy balance, and even immunity. We also now know that DCA can be conjugated with a myriad of amino acids and amines.
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
