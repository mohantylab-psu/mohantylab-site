import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MolecularBackground from '@/components/MolecularBackground';
import LabGroupPic from '@/assets/Lab_group_pic.jpeg';

const Join = () => {
  const positions = [
    {
      title: "Postdocs",
      icon: "🔬",
      description: "Excited to push boundaries in science and lead independent research projects",
      requirements: [
        "PhD in chemistry, biology, biochemistry, or related field",
        "Experience with mass spectrometry or metabolomics preferred",
        "Strong publication record",
        "Independent research experience"
      ],
      benefits: [
        "Competitive salary and benefits",
        "Research independence and mentorship opportunities", 
        "Access to state-of-the-art facilities",
        "Grant writing and Career development support"
      ],
      applicationInfo: {
        sections: [
          {
            text: "Email me with a one-page description of your research, a CV, and a sample publication."
          },
          {
            text: "I encourage postdoc applicants to explore fellowship opportunities at ",
            link: "https://postdoc.psu.edu/resources/external-funding/",
            additionalText: " Please reach out to me before for discussing proposal ideas :)"
          }
        ]
      }
    },
    {
      title: "Graduate Students",
      icon: "🎓",
      description: "Ready to grow your research journey and dive deep into the world of microbial chemistry",
      requirements: [
        "Strong background in chemistry, biochemistry, biology, or related field",
        "Interest in computational data science",
        "Curiosity about host-microbe interactions",
        "Enthusiasm for interdisciplinary research"
      ],
      benefits: [
        "Mentorship in cutting-edge metabolomics techniques",
        "Training in advanced data science methods", 
        "Collaborative research environment",
        "Opportunities to present at conferences"
      ],
      applicationInfo: {
        sections: [
          {
            label: "Current Penn State students",
            text: "Email me with a description of your research interests and a CV."
          },
          {
            label: "Prospective students",
            text: "Check graduate programs here: ",
            link: "https://www.huck.psu.edu/graduate-programs"
          }
        ]
      }
    },
    {
      title: "Undergraduate Researchers",
      icon: "💡",
      description: "Want to get hands-on experience in cutting-edge research",
      requirements: [
        "Enrolled undergraduate student at Penn State",
        "Good academic performance",
        "Interest in chemistry, biology, or data science",
        "Commitment to learning and growth"
      ],
      benefits: [
        "Hands-on research experience",
        "Mentorship from graduate students and postdocs",
        "Potential for independent projects",
        "Letters of recommendation for future applications"
      ],
      applicationInfo: {
        sections: [
          {
            text: "Email me with a description of your research interests, transcript and a CV. Open to students interested in a summer internship."
          }
        ]
      }
    }
  ];



  return (
    <div className="relative min-h-screen pt-20 sm:pt-24">
      <MolecularBackground className="opacity-20" />

      <motion.section
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12 px-4 sm:px-6"
      >
        <Card className="relative mx-auto w-full max-w-[1600px] overflow-hidden border-primary/10 shadow-glow min-h-[82vh] sm:min-h-[86vh] lg:min-h-[90vh]">
          <div className="absolute inset-0">
            <img
              src={LabGroupPic}
              alt="Mohanty Lab group photo"
                className="h-full w-full object-cover object-[50%_28%]"
            />
              <div className="absolute inset-0 bg-slate-950/88" />
          </div>

          <div className="relative flex min-h-[82vh] items-end px-6 py-10 sm:min-h-[86vh] sm:px-10 sm:py-14 md:min-h-[90vh] md:px-14 md:py-16 lg:px-16 lg:py-18">
            <div className="max-w-3xl text-left text-white">
              <p className="mb-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-white/75">
                Join the Mohanty Lab
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-tight text-white drop-shadow-[0_2px_28px_rgba(0,0,0,0.55)]">
                Be A Part of Our Scientific Journey
              </h1>
              <p className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-white/92 drop-shadow-[0_1px_10px_rgba(0,0,0,0.35)]">
                If you are curious, creative, and eager to decode the hidden language of microbes - apply!
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Badge className="rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-none backdrop-blur-sm">
                  Collaborative science
                </Badge>
                <Badge className="rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-none backdrop-blur-sm">
                  Hands-on mentorship
                </Badge>
                <Badge className="rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-none backdrop-blur-sm">
                  Interdisciplinary discovery
                </Badge>
              </div>
              <div className="mt-10">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-slate-950 hover:bg-white/90 hover:shadow-lg transition-all duration-300 font-semibold px-8"
                >
                  <Link to="/contact">
                    Apply Today
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.section>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 max-w-7xl">

        {/* Open Positions */}
                {/* Position Cards */}
        <div className="grid gap-8 max-w-6xl mx-auto mb-12">
          {positions.map((position, index) => (
            <motion.div
              key={position.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="gradient-card border-primary/10 shadow-glow p-8">
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{position.icon}</div>
                  <div>
                    <h3 className="text-3xl font-display font-bold text-gradient-hero">
                      {position.title}
                    </h3>
                    <p className="text-lg text-muted-foreground mt-2">
                      {position.description}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-primary mb-4">What We're Looking For:</h4>
                    <ul className="space-y-2">
                      {position.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start space-x-3">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-foreground/90">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-secondary mb-4">What We Offer:</h4>
                    <ul className="space-y-2">
                      {position.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start space-x-3">
                          <span className="text-secondary mt-1">✓</span>
                          <span className="text-foreground/90">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {position.applicationInfo && (
                  <div className="mt-8 bg-accent/5 border border-accent/20 rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-accent mb-4">How to Apply:</h4>
                    <div className="space-y-3 text-foreground/90">
                      {position.applicationInfo.sections.map((section, secIndex) => (
                        <p key={secIndex}>
                          {section.label && <strong>{section.label}:</strong>} {section.text}
                          {section.link && (
                            <a 
                              href={section.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent hover:underline font-semibold"
                            >
                              {section.link}
                            </a>
                          )}
                          {section.additionalText && section.additionalText}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 text-center">
                  <Button 
                    asChild
                    className="gradient-accent hover:shadow-glow transition-all duration-300 font-semibold px-6"
                  >
                    <Link to="/contact">
                      Apply for {position.title} Position
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* What Makes Us Special */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="gradient-card border-accent/20 shadow-molecular p-10">
            <h3 className="text-3xl font-display font-bold mb-8 text-gradient-accent text-center">
              Why Choose the Mohanty Lab?
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🌟</div>
                <h4 className="text-xl font-semibold text-primary mb-3">Interdisciplinary Approach</h4>
                <p className="text-muted-foreground">
                  Work at the intersection of chemistry, biology, and data science with cutting-edge methodologies.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h4 className="text-xl font-semibold text-primary mb-3">Collaborative Environment</h4>
                <p className="text-muted-foreground">
                  Join a supportive team that values creativity, innovation, and mentorship at all levels.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h4 className="text-xl font-semibold text-primary mb-3">Pioneer Research</h4>
                <p className="text-muted-foreground">
                  Be part of groundbreaking discoveries that could reshape our understanding of human health.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Application Process */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="gradient-card border-primary/10 shadow-glow p-10 max-w-4xl mx-auto">
            <h3 className="text-3xl font-display font-bold mb-8 text-gradient-hero text-center">
              Ready to Apply?
            </h3>
            
            <div className="text-center space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                We're excited to hear from passionate researchers who want to join our mission. 
                Reach out to learn more about available opportunities and how you can contribute 
                to our groundbreaking research.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="gradient-accent hover:shadow-glow transition-all duration-300 font-semibold px-8"
                >
                  <Link to="/contact">
                    📧 Contact Us About Opportunities
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary/30 hover:bg-primary/10 transition-all duration-300 font-semibold px-8"
                >
                  <Link to="/research">
                    🧬 Learn About Our Research
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Join;
