
import React from 'react';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onNavigate: (screen: string) => void;
}

const WelcomeScreen = ({ onNavigate }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-700 to-slate-600 relative overflow-hidden">
      {/* Animated Sky Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-12 bg-white/20 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-20 right-16 w-16 h-8 bg-white/15 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-16 left-1/3 w-24 h-10 bg-white/25 rounded-full animate-pulse opacity-50" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Landmark Silhouettes */}
      <div className="absolute bottom-0 left-0 right-0">
        {/* Charminar Silhouette */}
        <div className="absolute bottom-0 left-8 w-24 h-32 bg-black/30 relative">
          <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-16 left-2 w-4 h-16 bg-black/40"></div>
          <div className="absolute bottom-16 right-2 w-4 h-16 bg-black/40"></div>
          <div className="absolute bottom-20 left-6 w-12 h-8 bg-black/50 rounded-t-lg"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-black/50 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>

        {/* Hussain Sagar Buddha Statue */}
        <div className="absolute bottom-0 right-8 w-20 h-28 bg-black/30 relative">
          <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-black/50 rounded-t-full"></div>
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-black/50 rounded-full animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
      </div>

      {/* Walking Person */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 animate-bounce" style={{ animationDuration: '3s' }}>
        <div className="w-16 h-24 relative">
          {/* Head */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-700 rounded-full"></div>
          {/* Body */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-4 h-12 bg-gray-600 rounded-lg"></div>
          {/* Arms */}
          <div className="absolute top-8 left-2 w-3 h-8 bg-gray-600 rounded-lg transform rotate-12"></div>
          <div className="absolute top-8 right-2 w-3 h-8 bg-gray-600 rounded-lg transform -rotate-12"></div>
          {/* Legs */}
          <div className="absolute bottom-0 left-3 w-3 h-8 bg-gray-700 rounded-lg"></div>
          <div className="absolute bottom-0 right-3 w-3 h-8 bg-gray-700 rounded-lg"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 text-center">
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in">
            Namaste
          </h1>
          <p className="text-lg text-gray-300 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            Welcome back to SnapSolve TS
          </p>
        </div>

        <div className="absolute bottom-16 left-8 right-8 space-y-4">
          <Button
            onClick={() => onNavigate('signin')}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-full py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            Sign In
          </Button>
          <Button
            onClick={() => onNavigate('signup')}
            variant="outline"
            className="w-full bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 rounded-full py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
