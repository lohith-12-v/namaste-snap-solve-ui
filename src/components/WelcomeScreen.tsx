
import React from 'react';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onNavigate: (screen: string) => void;
}

const WelcomeScreen = ({ onNavigate }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(/lovable-uploads/ff17cad1-0c31-4b44-84ba-6c99b21b6145.png)' 
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen px-6 md:px-8">
        <div className="flex-1 flex flex-col justify-center items-start text-left pl-4 md:pl-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 tracking-wide drop-shadow-lg font-['Poppins']">
            Namaste
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white/90 mb-4 tracking-wide drop-shadow-lg font-['Poppins']">
            TG FixIt
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 font-light drop-shadow-md font-['Poppins']">
            Ready to make Telangana better?
          </p>
        </div>

        <div className="pb-8 md:pb-16 space-y-4 max-w-md mx-auto w-full">
          <Button
            onClick={() => onNavigate('signin')}
            className="w-full bg-gray-900/80 hover:bg-gray-800/90 backdrop-blur-sm text-white rounded-full py-3 md:py-4 text-base md:text-lg font-semibold border border-gray-500/30 font-['Poppins'] transition-all duration-300 hover:scale-105"
          >
            Sign In
          </Button>
          <Button
            onClick={() => onNavigate('signup')}
            variant="outline"
            className="w-full bg-transparent border-2 border-white/50 text-white hover:bg-white/10 backdrop-blur-sm rounded-full py-3 md:py-4 text-base md:text-lg font-semibold font-['Poppins'] transition-all duration-300 hover:scale-105"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
