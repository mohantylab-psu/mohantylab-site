import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Components
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "@/pages/Home";
import Research from "@/pages/Research";
import Team from "@/pages/Team";
import Publications from "@/pages/Publications";
import Join from "@/pages/Join";
import Contact from "@/pages/Contact";

// Theme
import { ThemeProvider } from "@/contexts/ThemeContext";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col">
              {/* Navigation */}
              <Navigation />
              
              {/* Main Content */}
              <main className="relative flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/research" element={<Research />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/publications" element={<Publications />} />
                  <Route path="/join" element={<Join />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              
              {/* Footer */}
              <Footer />
            </div>
            
            {/* Toast Notifications */}
            <Toaster />
            <Sonner />
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
