import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import MolecularBackground from '@/components/MolecularBackground';
import psuImage from '@/assets/psu.jpeg';

const Contact = () => {
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
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-8 text-gradient-hero">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Ready to join our mission or learn more about our research? We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Get in Touch Instructions */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="gradient-card border-primary/10 shadow-glow p-8">
              <h2 className="text-3xl font-display font-bold mb-6 text-gradient-hero">
                Get in Touch
              </h2>
              
              <div className="space-y-6">
                <div className="bg-accent/10 rounded-lg p-6 border border-accent/30">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-3xl">📧</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground mb-2">Send Us an Email</h3>
                      <p className="text-muted-foreground mb-3">
                        The best way to reach us is via email. Please include information about your background, research interests, and why you'd like to join our team.
                      </p>
                      <a 
                        href="mailto:imm5615@psu.edu"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-lg transition-colors"
                      >
                        imm5615@psu.edu
                        <span>→</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/10 rounded-lg p-6 border border-primary/30">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">💡</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground mb-2">What to Include in Your Email</h3>
                      <ul className="text-muted-foreground space-y-2 text-sm">
                        <li>• Your full name and current position</li>
                        <li>• Position of interest (Graduate Student, Postdoc, etc.)</li>
                        <li>• Brief description of your research background</li>
                        <li>• Your research interests and how they align with our lab</li>
                        <li>• Why you'd like to join the Mohanty Lab</li>
                        <li>• CV/Resume (attached to your email)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Penn State Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <div className="rounded-lg overflow-hidden shadow-lg border border-primary/20">
                <img 
                  src={psuImage} 
                  alt="Penn State University" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Information & Lab Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Lab Location */}
            <Card className="gradient-card border-secondary/10 shadow-glow p-8">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">🏛️</div>
                <h3 className="text-2xl font-display font-bold text-gradient-hero">
                  Lab Location
                </h3>
              </div>
              <div className="space-y-3 text-foreground/90">
                <p className="font-semibold text-lg">Mohanty Lab</p>
                <p>Huck Life Sciences Building, Room 304</p>
                <p>Penn State University</p>
                <p>University Park, PA 16802</p>
              </div>
            </Card>

            {/* Contact Information */}
            <Card className="gradient-card border-accent/10 shadow-glow p-8">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">📞</div>
                <h3 className="text-2xl font-display font-bold text-gradient-hero">
                  Contact Information
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-foreground mb-2">Email</p>
                  <a 
                    href="mailto:imm5615@psu.edu"
                    className="text-primary hover:text-primary/80 font-semibold"
                  >
                    imm5615@psu.edu
                  </a>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">LinkedIn</p>
                  <a 
                    href="https://www.linkedin.com/in/mohantyipsita92"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 font-semibold"
                  >
                    linkedin.com/in/mohantyipsita92
                  </a>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">BlueSky</p>
                  <a 
                    href="https://bsky.app/profile/ipsitamohanty.bsky.social"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 font-semibold"
                  >
                    @ipsitamohanty.bsky.social
                  </a>
                </div>
              </div>
            </Card>

            {/* Social & Professional */}
            <Card className="gradient-card border-secondary/10 shadow-glow p-8">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">🔗</div>
                <h3 className="text-2xl font-display font-bold text-gradient-hero">
                  Connect With Us
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-foreground/90 mb-4">
                  Follow our research journey and stay updated on the latest discoveries
                </p>
                <div className="flex flex-col gap-3">
                  <a 
                    href="https://www.linkedin.com/in/mohantyipsita92"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-all duration-300"
                  >
                    <span>💼</span>
                    <span>LinkedIn</span>
                  </a>
                  <a 
                    href="https://bsky.app/profile/ipsitamohanty.bsky.social"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-secondary/10 hover:bg-secondary/20 rounded-lg transition-all duration-300"
                  >
                    <span>🦋</span>
                    <span>BlueSky</span>
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
