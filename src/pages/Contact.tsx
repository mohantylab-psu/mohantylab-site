import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import MolecularBackground from '@/components/MolecularBackground';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show a success message
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: '', email: '', position: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      position: value
    }));
  };

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
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="gradient-card border-primary/10 shadow-glow p-8">
              <h2 className="text-3xl font-display font-bold mb-6 text-gradient-hero">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-foreground font-medium">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2 bg-background/50 border-primary/20 focus:border-primary"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-foreground font-medium">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2 bg-background/50 border-primary/20 focus:border-primary"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="position" className="text-foreground font-medium">Position of Interest</Label>
                  <Select
                    value={formData.position}
                    onValueChange={handleSelectChange}
                    required
                  >
                    <SelectTrigger className="mt-2 bg-background/50 border-primary/20 focus:border-primary">
                      <SelectValue placeholder="Select a position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="graduate">Graduate Student</SelectItem>
                      <SelectItem value="postdoc">Postdoc</SelectItem>
                      <SelectItem value="undergraduate">Undergraduate Researcher</SelectItem>
                      <SelectItem value="collaboration">Research Collaboration</SelectItem>
                      <SelectItem value="other">Other Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message" className="text-foreground font-medium">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="mt-2 bg-background/50 border-primary/20 focus:border-primary"
                    placeholder="Tell us about yourself, your research interests, and why you'd like to join our team..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-accent hover:shadow-glow transition-all duration-300 font-semibold py-3 text-lg"
                >
                  Send Message 📧
                </Button>
              </form>
            </Card>
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
                <p>Penn State University</p>
                <p>University Park, PA 16802</p>
                <p className="text-muted-foreground italic">
                  Exact building and room information will be updated once our lab space is finalized.
                </p>
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

            {/* Quick Response */}
            <Card className="gradient-card border-primary/10 shadow-molecular p-8">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">⚡</div>
                <h3 className="text-2xl font-display font-bold text-gradient-accent">
                  Quick Response
                </h3>
              </div>
              <div className="space-y-4 text-foreground/90">
                <p>
                  We typically respond to inquiries within <strong>24-48 hours</strong> during business days.
                </p>
                <p>
                  For urgent matters or time-sensitive opportunities, please mention it in your message subject line.
                </p>
                <div className="bg-accent/10 rounded-lg p-4 border-l-4 border-accent">
                  <p className="font-medium text-accent">Currently Prioritizing:</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Applications from graduate students and postdocs for founding team positions
                  </p>
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
