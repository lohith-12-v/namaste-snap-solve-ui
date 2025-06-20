
import React from 'react';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onNavigate: (screen: string) => void;
}

const WelcomeScreen = ({ onNavigate }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-orange-600 relative overflow-hidden">
      {/* Hyderabad Skyline Background */}
      <div className="absolute inset-0">
        {/* Charminar on the right */}
        <div className="absolute bottom-0 right-8 w-32 h-48 bg-gradient-to-t from-purple-900/80 to-purple-700/60">
          {/* Main structure */}
          <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-900/90 to-gray-800/70 rounded-t-lg">
            {/* Four minarets */}
            <div className="absolute bottom-16 left-2 w-4 h-20 bg-gray-900/90 rounded-t-full"></div>
            <div className="absolute bottom-16 right-2 w-4 h-20 bg-gray-900/90 rounded-t-full"></div>
            <div className="absolute bottom-16 left-8 w-4 h-20 bg-gray-900/90 rounded-t-full"></div>
            <div className="absolute bottom-16 right-8 w-4 h-20 bg-gray-900/90 rounded-t-full"></div>
            {/* Central arch */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-16 bg-gradient-to-t from-yellow-600/30 to-transparent rounded-t-full"></div>
            {/* Main dome */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-900/90 rounded-full"></div>
          </div>
        </div>

        {/* Hussain Sagar Buddha Statue on the left */}
        <div className="absolute bottom-0 left-8 w-24 h-40">
          {/* Water reflection */}
          <div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-purple-800/60 to-transparent"></div>
          {/* Buddha statue */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-24 bg-gradient-to-t from-gray-800/90 to-gray-700/70 rounded-t-full">
            {/* Head */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-800/90 rounded-full"></div>
            {/* Body */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-gray-800/90 rounded"></div>
          </div>
          {/* Platform */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gray-900/80 rounded"></div>
        </div>

        {/* Additional Hyderabad structures */}
        <div className="absolute bottom-0 left-32 w-20 h-32 bg-gradient-to-t from-gray-900/70 to-gray-800/50 rounded-t-lg"></div>
        <div className="absolute bottom-0 right-40 w-16 h-28 bg-gradient-to-t from-gray-900/70 to-gray-800/50 rounded-t-lg"></div>
        
        {/* Golconda Fort silhouette in background */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-20 bg-gradient-to-t from-gray-900/50 to-gray-800/30 rounded-t-lg opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen px-8">
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-wide">
            Namaste
          </h1>
          <p className="text-xl text-white/90 mb-8 font-light">
            Ready to make Telangana better?
          </p>
        </div>

        <div className="pb-16 space-y-4">
          <Button
            onClick={() => onNavigate('signin')}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-full py-4 text-lg font-semibold border border-orange-500/30"
          >
            Sign In
          </Button>
          <Button
            onClick={() => onNavigate('signup')}
            variant="outline"
            className="w-full bg-transparent border-2 border-white/30 text-white hover:bg-white/10 rounded-full py-4 text-lg font-semibold"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
