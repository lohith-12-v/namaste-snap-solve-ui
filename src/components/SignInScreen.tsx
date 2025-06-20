
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, CreditCard, Phone } from 'lucide-react';

interface SignInScreenProps {
  onSignIn: () => void;
  onNavigate: (screen: string) => void;
  isSignUp?: boolean;
}

const SignInScreen = ({ onSignIn, onNavigate, isSignUp = false }: SignInScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 via-blue-300 to-blue-400 relative overflow-hidden">
      {/* Background elements same as welcome screen */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-10 w-20 h-12 bg-white/40 rounded-full"></div>
        <div className="absolute top-24 right-16 w-16 h-8 bg-white/30 rounded-full"></div>
        <div className="absolute top-20 left-1/3 w-24 h-10 bg-white/35 rounded-full"></div>
      </div>

      {/* Hyderabad Skyline - Buildings */}
      <div className="absolute bottom-0 left-0 right-0">
        {/* Buildings same as welcome screen */}
        <div className="absolute bottom-0 left-8 w-16 h-32 bg-blue-600/80 rounded-t-lg"></div>
        <div className="absolute bottom-0 left-16 w-12 h-40 bg-blue-700/80 rounded-t-lg"></div>
        <div className="absolute bottom-0 left-24 w-14 h-36 bg-blue-600/80 rounded-t-lg"></div>
        
        {/* Charminar */}
        <div className="absolute bottom-0 left-40 w-20 h-28 bg-blue-800/80 relative">
          <div className="absolute bottom-16 left-2 w-3 h-12 bg-blue-900/80"></div>
          <div className="absolute bottom-16 right-2 w-3 h-12 bg-blue-900/80"></div>
          <div className="absolute bottom-20 left-6 w-8 h-6 bg-blue-900/80 rounded-t-lg"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-900/80 rounded-full"></div>
        </div>

        <div className="absolute bottom-0 right-8 w-18 h-35 bg-blue-600/80 rounded-t-lg"></div>
        <div className="absolute bottom-0 right-20 w-14 h-42 bg-blue-700/80 rounded-t-lg"></div>
        <div className="absolute bottom-0 right-32 w-16 h-38 bg-blue-600/80 rounded-t-lg"></div>
        
        {/* Car */}
        <div className="absolute bottom-8 right-16 w-16 h-6 bg-white rounded-lg shadow-lg">
          <div className="absolute top-1 left-2 w-3 h-2 bg-blue-200 rounded"></div>
          <div className="absolute top-1 right-2 w-3 h-2 bg-blue-200 rounded"></div>
          <div className="absolute -bottom-1 left-1 w-3 h-3 bg-gray-800 rounded-full"></div>
          <div className="absolute -bottom-1 right-1 w-3 h-3 bg-gray-800 rounded-full"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center p-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('welcome')}
            className="text-slate-800 hover:bg-white/20 rounded-full"
          >
            <ArrowLeft size={20} />
          </Button>
        </div>

        <div className="flex-1 flex items-end pb-8 px-6">
          <Card className="w-full bg-white rounded-3xl p-6 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Aadhaar Field */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <CreditCard className="text-gray-400" size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Aadhaar"
                  value={aadhaar}
                  onChange={(e) => setAadhaar(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-2xl border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  maxLength={12}
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Mail className="text-gray-400" size={20} />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-2xl border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Lock className="text-gray-400" size={20} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-gray-100 rounded-2xl border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full bg-slate-800 hover:bg-slate-700 text-white rounded-2xl py-4 text-lg font-semibold"
              >
                Sign In
              </Button>

              {/* Forgot Password */}
              <div className="text-center">
                <button type="button" className="text-gray-600 text-sm">
                  Forgot password?
                </button>
              </div>

              {/* Social Login */}
              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 rounded-2xl py-3 border-blue-200 hover:bg-blue-50"
                >
                  <div className="w-5 h-5 bg-blue-600 rounded-full mr-2"></div>
                  Sign In
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 rounded-2xl py-3 border-red-200 hover:bg-red-50"
                >
                  <div className="w-5 h-5 bg-red-600 rounded-full mr-2"></div>
                  Sign In
                </Button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <span className="text-gray-600 text-sm">Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => onNavigate('signup')}
                  className="text-slate-800 font-semibold text-sm"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignInScreen;
