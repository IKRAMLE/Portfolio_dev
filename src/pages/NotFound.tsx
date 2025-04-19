
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-4">
      <div className="animated-gradient"></div>
      
      <div className="max-w-md w-full glass-card p-8 rounded-xl text-center relative z-10 animate-scale-in">
        <div className="mb-6">
          <h1 className="text-6xl font-display font-bold text-gradient mb-4">404</h1>
          <p className="text-white/80 text-lg mb-8">Oops! Page not found</p>
          
          <div className="w-16 h-1 bg-accent mx-auto my-6 rounded-full"></div>
          
          <p className="text-white/60 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <Button asChild className="bg-accent hover:bg-accent/90 text-white transition-all duration-300 shadow-[0_0_15px_rgba(124,58,237,0.3)]">
          <Link to="/" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
