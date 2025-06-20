
import React from 'react';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onNavigate: (screen: string) => void;
}

const WelcomeScreen = ({ onNavigate }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Hyderabad Skyline Background */}
      <div className="absolute inset-0">
        {/* Charminar on the right */}
        <div className="absolute bottom-0 right-4 md:right-8 w-24 md:w-32 h-36 md:h-48 bg-gradient-to-t from-gray-900/80 to-gray-700/60 dark:from-gray-950/90 dark:to-gray-800/70">
          {/* Main structure */}
          <div className="absolute bottom-0 w-full h-24 md:h-32 bg-gradient-to-t from-gray-900/90 to-gray-800/70 dark:from-gray-950/95 dark:to-gray-900/80 rounded-t-lg">
            {/* Four minarets */}
            <div className="absolute bottom-12 md:bottom-16 left-1 md:left-2 w-3 md:w-4 h-12 md:h-20 bg-gray-900/90 dark:bg-gray-950/95 rounded-t-full"></div>
            <div className="absolute bottom-12 md:bottom-16 right-1 md:right-2 w-3 md:w-4 h-12 md:h-20 bg-gray-900/90 dark:bg-gray-950/95 rounded-t-full"></div>
            <div className="absolute bottom-12 md:bottom-16 left-6 md:left-8 w-3 md:w-4 h-12 md:h-20 bg-gray-900/90 dark:bg-gray-950/95 rounded-t-full"></div>
            <div className="absolute bottom-12 md:bottom-16 right-6 md:right-8 w-3 md:w-4 h-12 md:h-20 bg-gray-900/90 dark:bg-gray-950/95 rounded-t-full"></div>
            {/* Central arch */}
            <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 w-8 md:w-12 h-10 md:h-16 bg-gradient-to-t from-gray-600/30 to-transparent rounded-t-full"></div>
            {/* Main dome */}
            <div className="absolute bottom-15 md:bottom-20 left-1/2 transform -translate-x-1/2 w-6 md:w-8 h-6 md:h-8 bg-gray-900/90 dark:bg-gray-950/95 rounded-full"></div>
          </div>
        </div>

        {/* Hussain Sagar Buddha Statue on the left */}
        <div className="absolute bottom-0 left-4 md:left-8 w-18 md:w-24 h-30 md:h-40">
          {/* Water reflection */}
          <div className="absolute bottom-0 w-full h-6 md:h-8 bg-gradient-to-t from-gray-800/60 to-transparent"></div>
          {/* Buddha statue */}
          <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 w-8 md:w-12 h-16 md:h-24 bg-gradient-to-t from-gray-800/90 to-gray-700/70 dark:from-gray-900/95 dark:to-gray-800/80 rounded-t-full">
            {/* Head */}
            <div className="absolute top-1 md:top-2 left-1/2 transform -translate-x-1/2 w-4 md:w-6 h-4 md:h-6 bg-gray-800/90 dark:bg-gray-900/95 rounded-full"></div>
            {/* Body */}
            <div className="absolute top-5 md:top-8 left-1/2 transform -translate-x-1/2 w-6 md:w-8 h-8 md:h-12 bg-gray-800/90 dark:bg-gray-900/95 rounded"></div>
          </div>
          {/* Platform */}
          <div className="absolute bottom-3 md:bottom-4 left-1/2 transform -translate-x-1/2 w-12 md:w-16 h-3 md:h-4 bg-gray-900/80 dark:bg-gray-950/90 rounded"></div>
        </div>

        {/* Additional Hyderabad structures */}
        <div className="absolute bottom-0 left-24 md:left-32 w-12 md:w-20 h-20 md:h-32 bg-gradient-to-t from-gray-900/70 to-gray-800/50 dark:from-gray-950/80 dark:to-gray-900/60 rounded-t-lg"></div>
        <div className="absolute bottom-0 right-32 md:right-40 w-10 md:w-16 h-18 md:h-28 bg-gradient-to-t from-gray-900/70 to-gray-800/50 dark:from-gray-950/80 dark:to-gray-900/60 rounded-t-lg"></div>
        
        {/* Golconda Fort silhouette in background */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 md:w-40 h-12 md:h-20 bg-gradient-to-t from-gray-900/50 to-gray-800/30 dark:from-gray-950/60 dark:to-gray-900/40 rounded-t-lg opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen px-6 md:px-8">
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-wide">
            Namaste
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 font-light px-4">
            Ready to make Telangana better?
          </p>
        </div>

        <div className="pb-8 md:pb-16 space-y-4 max-w-md mx-auto w-full">
          <Button
            onClick={() => onNavigate('signin')}
            className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-gray-900 rounded-full py-3 md:py-4 text-base md:text-lg font-semibold border border-gray-500/30"
          >
            Sign In
          </Button>
          <Button
            onClick={() => onNavigate('signup')}
            variant="outline"
            className="w-full bg-transparent border-2 border-white/30 text-white hover:bg-white/10 dark:hover:bg-white/20 rounded-full py-3 md:py-4 text-base md:text-lg font-semibold"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
