
import React from 'react';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onNavigate: (screen: string) => void;
}

const WelcomeScreen = ({ onNavigate }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 via-blue-300 to-blue-400 relative overflow-hidden">
      {/* Clouds */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-10 w-20 h-12 bg-white/40 rounded-full"></div>
        <div className="absolute top-24 right-16 w-16 h-8 bg-white/30 rounded-full"></div>
        <div className="absolute top-20 left-1/3 w-24 h-10 bg-white/35 rounded-full"></div>
      </div>

      {/* Hyderabad Skyline - Buildings */}
      <div className="absolute bottom-0 left-0 right-0">
        {/* Modern Buildings Group 1 */}
        <div className="absolute bottom-0 left-8 w-16 h-32 bg-blue-600/80 rounded-t-lg"></div>
        <div className="absolute bottom-0 left-16 w-12 h-40 bg-blue-700/80 rounded-t-lg"></div>
        <div className="absolute bottom-0 left-24 w-14 h-36 bg-blue-600/80 rounded-t-lg"></div>
        
        {/* Charminar Silhouette */}
        <div className="absolute bottom-0 left-40 w-20 h-28 bg-blue-800/80 relative">
          <div className="absolute bottom-16 left-2 w-3 h-12 bg-blue-900/80"></div>
          <div className="absolute bottom-16 right-2 w-3 h-12 bg-blue-900/80"></div>
          <div className="absolute bottom-20 left-6 w-8 h-6 bg-blue-900/80 rounded-t-lg"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-900/80 rounded-full"></div>
        </div>

        {/* Modern Buildings Group 2 */}
        <div className="absolute bottom-0 right-8 w-18 h-35 bg-blue-600/80 rounded-t-lg"></div>
        <div className="absolute bottom-0 right-20 w-14 h-42 bg-blue-700/80 rounded-t-lg"></div>
        <div className="absolute bottom-0 right-32 w-16 h-38 bg-blue-600/80 rounded-t-lg"></div>
        
        {/* Car */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-white rounded-lg shadow-lg">
          <div className="absolute top-1 left-2 w-3 h-2 bg-blue-200 rounded"></div>
          <div className="absolute top-1 right-2 w-3 h-2 bg-blue-200 rounded"></div>
          <div className="absolute -bottom-1 left-1 w-3 h-3 bg-gray-800 rounded-full"></div>
          <div className="absolute -bottom-1 right-1 w-3 h-3 bg-gray-800 rounded-full"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen px-8">
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            HELLO
          </h1>
          <p className="text-lg text-slate-700 mb-8">
            Lorem ipsum dolor sit amet
          </p>
        </div>

        <div className="pb-16 space-y-4">
          <Button
            onClick={() => onNavigate('signin')}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white rounded-full py-4 text-lg font-semibold"
          >
            Sign In
          </Button>
          <Button
            onClick={() => onNavigate('signup')}
            variant="outline"
            className="w-full bg-white border-2 border-slate-300 text-slate-800 hover:bg-slate-50 rounded-full py-4 text-lg font-semibold"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
