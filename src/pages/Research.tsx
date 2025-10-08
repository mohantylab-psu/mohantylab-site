import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MolecularBackground from '@/components/MolecularBackground';
import ResearchPageImg from '@/assets/Research_page.png';
import ResearchFocus1Img from '@/assets/Research_focus_1_icon_NEW.png';
import ResearchFocus2Img from '@/assets/Research_focus_2_icon_NEW.png';
import ResearchFocus3Img from '@/assets/Research_focus_3_icon_NEW.png';

const Research = () => {
  const keyQuestions = [
    "Which microbially modified metabolites vary across human health states, and which serve as early biomarkers of resilience or risk?",
    "Can repository-scale mining, combined with in silico tools, substantially increase structural annotation rates in untargeted datasets?",
    "What standards and data products best support a reusable MS/MS spectral library for the community?",
    "Can we expand the data-science-driven discovery pipeline to all chemicals in the human body?"
  ];

  return (
    <div className="relative min-h-screen pt-20 sm:pt-24">
      <MolecularBackground className="opacity-30" />
      
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 sm:mb-8 text-gradient-hero px-2">
            Research Areas
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4 mb-8">
            Microbes are the hidden "Wizard of Oz," quietly pulling biochemical levers that shape our metabolism, immunity, appetite, cognition, and even mood. We are pulling back the curtain in our lab to decode those signals by mapping the enzymes, metabolites, and host receptors that explain how microbes influence health and how we can tune that dialogue. We have three main research focus areas: discover, decode, and modulate microbial messages to the host.
          </p>
          
          <div className="mb-8 flex justify-center scientific-diagram">
            <img 
              src={ResearchPageImg} 
              alt="Research Overview" 
              className="max-w-full h-auto rounded-xl"
            />
          </div>
        </motion.div>

        {/* Research Focus 1 */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <Card className="gradient-card border-primary/10 shadow-glow p-6 sm:p-8 md:p-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
              <div className="mr-0 sm:mr-6 mb-2 sm:mb-0 flex justify-center sm:justify-start w-full sm:w-auto">
                <img 
                  src={ResearchFocus1Img} 
                  alt="Data Science Discovery"
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain research-icon"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-gradient-hero mb-4">
                  Discover: Data Science-Driven Discovery for Biomedical Insights
                </h2>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-foreground/90 leading-relaxed space-y-6">
              <p>
                Our lab is building a data-science-powered atlas of microbially modified metabolites across diverse states of human health and disease. Trillions of microbes living inside us possess unique enzymes that can catalyze chemistry, modifying molecules we produce or we obtain from our diet and exposure. These microbially modified molecules shape host signaling. Therefore, we seek to map these molecules that change with physiology, identify early predictors of resilient health and improved response to disease, better glucose regulation. The discovery of previously uncharacterized metabolites will allow us to find hidden intermediates in metabolic pathways and guide approaches to modulate or engineer the metabolic output.
              </p>

              <p>
                At scale, we mine public mass-spectrometry repositories (e.g., GNPS/MassIVE, Metabolights and Metabolomics Workbench) using computational tools with filters seeded from key chemotypes (indoles, fatty acids, betaines, amino acids, vitamins, prostaglandins). Repository-wide searches are paired with in silico annotation to infer formulas/structures and enriched with context via fastMASST and ReDU metadata. The deliverable is an ever-expanding open-source MS/MS spectral library and reference datasets that increase annotation rates for untargeted LC-MS/MS metabolomics.
              </p>

              <p>
                Discovery continues from association to mechanism: we integrate proteomics, large-scale enzyme screening, and in vivo/in vitro studies to map microbial pathways behind priority metabolites and test causality.
              </p>

              <div className="bg-primary/5 rounded-xl p-6 border-l-4 border-primary">
                <p className="font-semibold text-primary mb-3">Key Focus Areas:</p>
                <p>
                  Aging, the impact of diet, and environmental exposures will be specific case studies within this focus area, alongside other health contexts (e.g., metabolic and inflammatory conditions).
                </p>
              </div>

              <p className="font-semibold text-lg">
                Ultimately, we aim to create an open-acess community resource which will be an atlas of metabolites, enzymes, and pathways that accelerates discovery and reveals modifiable levers for human health.
              </p>

              <p className="font-semibold text-lg">
                By investigating enzymes → reactions → metabolites → host pathways, we move beyond correlations to mechanism.
              </p>

              <div className="bg-secondary/10 rounded-xl p-6 border-l-4 border-secondary">
                <h4 className="text-xl font-semibold mb-4 text-secondary">Key questions</h4>
                <ul className="space-y-3">
                  {keyQuestions.map((question, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-secondary">•</span>
                      <span>{question}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* Additional Research Areas Placeholders */}
        {/* Research Focus 2 */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <Card className="gradient-card border-secondary/10 shadow-glow p-6 sm:p-8 md:p-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
              <div className="mr-0 sm:mr-6 mb-2 sm:mb-0 flex justify-center sm:justify-start w-full sm:w-auto">
                <img 
                  src={ResearchFocus2Img} 
                  alt="Microbial Signals"
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain research-icon"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-gradient-hero mb-4">
                  Decode: Microbial Signals in Human Health
                </h2>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-foreground/90 leading-relaxed space-y-6">
              <p>
                Our lab focuses on discovering and characterizing the previously unknown microbial enzymes that generate specialized modified metabolites, the "messages" microbes send to the host. These molecules tune immunity, metabolism, and barrier function; when their composition shifts, so does health. We use an integrated omics strategy - pairing untargeted metabolomics with proteomics - to map enzyme activities to their products, reveal mechanisms, and identify targets that could inform drug discovery and precision nutrition. While our scope spans human health broadly, we will develop deep case studies in aging, and in how diet and environmental exposures perturb host-microbe chemistry and outcomes.
              </p>

              <p>
                We will build an activity-guided discovery pipeline: fractionate protein extracts (e.g., from mouse/human fecal samples), incubate with defined substrates (such as bile acids), and acquire paired proteomics + untargeted LC-MS/MS metabolomics on each fraction. Comparative analysis highlights fractions with the requisite enzyme activity and proteomics pinpoints candidate proteins present in active, absent in inactive fractions. We then annotate families via databases and partner with biochemistry/structural biology teams for purification, kinetics, and structure-function studies.
              </p>

              <p>
                To chart the reaction rules of relevant enzymes of interest, we will run high-throughput enzyme-substrate screens (automated liquid handling) spanning the newly discovered enzymes and a broad panel of known enzymes, such as bile salt hydrolases (BSHs), many of which have not been deeply characterized for substrate specificity. Resulting MS data define enzyme–substrate networks and product fingerprints, including those detected in vivo. This will create a first-of-its-kind specificity atlas linking enzymes to products and health-relevant patterns (with explicit readouts in aging, diet, and environmental exposure cohorts).
              </p>

              <p className="font-semibold text-lg">
                By investigating enzymes → reactions → metabolites → host pathways, we move beyond correlations to mechanism.
              </p>

              <div className="bg-secondary/5 rounded-xl p-6 border-l-4 border-secondary">
                <h4 className="text-xl font-semibold mb-4 text-secondary">Key questions</h4>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-secondary">•</span>
                    <span>Which microbial enzymes "write" bile-acid and other metabolite messages, and how do their activities vary across healthy vs. diseased states?</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-secondary">•</span>
                    <span>What are the substrate specificity and product spectra for these enzymes, and can we predict new products from sequence alone?</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-secondary">•</span>
                    <span>How do aging, diet, and environmental exposures shift enzyme abundance, activity, and product profiles?</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-secondary">•</span>
                    <span>Which enzyme–metabolite signatures make robust biomarkers or drug targets for metabolic and inflammatory diseases?</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* Research Focus 3 */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <Card className="gradient-card border-accent/10 shadow-glow p-6 sm:p-8 md:p-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
              <div className="mr-0 sm:mr-6 mb-2 sm:mb-0 flex justify-center sm:justify-start w-full sm:w-auto">
                <img 
                  src={ResearchFocus3Img} 
                  alt="Microbial Messages"
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain research-icon"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-gradient-hero mb-4">
                  Modulate: Microbial Messages in Action
                </h2>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-foreground/90 leading-relaxed space-y-6">
              <p>
                We investigate how perturbations, including those from dietary patterns (e.g., meat-forward vs. plant-forward) and commonly used drugs and nutritional supplements, alter the microbiome's chemical messages and, in turn, impact host physiology. Using untargeted LC-MS/MS metabolomics integrated with proteomics, we chart changes in bile acids and other microbially modified metabolites across organs and biofluids, then connect those shifts to mechanisms in the host.
              </p>

              <p>
                We will profile how distinct dietary patterns and pharmacologic exposures (including microbiome-interactive agents) reconfigure microbial metabolism and host pathways by leveraging advanced computational tools in mass spectrometry. Designs will include controlled interventions in mouse models and analysis of available human datasets in public repositories and new clinical trials, with sex, age, bmi etc treated as a biological variable. We will employ a multi-pronged approach, combining untargeted metabolomics (across multiple organs and fluids), targeted bile acid panels, and integrative proteomics to identify key enzymes and pathways. This will enable a systems-level map of diet- and drug-induced shifts in microbially derived metabolites, highlighting candidate enzymes, receptors, and pathways for mechanistic follow-up and intervention.
              </p>

              <p>
                We also have a key hypothesis in aging that we will investigate using taurine supplementation. Taurine is a key node in host–microbe chemistry (e.g., bile-acid conjugation) and is linked to physical and cognitive resilience. We will use taurine supplementation in aging mouse models as a mechanistic experiment. We will utilize untargeted LC-MS/MS metabolomics and data-driven computational approaches to identify key metabolites across multiple organs in our taurine-supplemented mice compared to control mice. We will obtain a detailed map of microbially modified bile acids (and other signaling metabolites) that shift in response to taurine availability and explore their role in aging biology. We will do this by quantifying muscle and blood mitochondrial function and integrating with bile-acid profiles to test whether taurine-driven chemical messaging aligns with improved respiration and bioenergetic readouts in our mice study. Translation to humans will be achieved by mining LC-MS/MS aging datasets available in public repositories.
              </p>

              <p className="font-semibold text-lg">
                We will prioritize metabolite "hits" from our diet, drug, and taurine studies and screen them across host-receptor panels to uncover their mechanisms and functions.
              </p>

              <div className="bg-accent/5 rounded-xl p-6 border-l-4 border-accent">
                <h4 className="text-xl font-semibold mb-4 text-accent">Key questions</h4>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-accent">•</span>
                    <span>Which microbial metabolites are most sensitive to diet or drug perturbations, and which changes predict resilient vs. vulnerable states?</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent">•</span>
                    <span>How do diet and environmental exposures perturb host-microbiome chemistry, and are these shifts reversible? (Aging will be a dedicated use case here.)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent">•</span>
                    <span>In the taurine supplementation case study, how do bile acid compositions and mitochondrial bioenergetics co-vary, and can we establish a causal link between them?</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-accent">•</span>
                    <span>Which host receptors and organ systems are most responsive to microbial messages (dose–response, timing, and tissue specificity)?</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};

export default Research;
