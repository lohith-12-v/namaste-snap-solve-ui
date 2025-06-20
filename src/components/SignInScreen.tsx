
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, CreditCard, Fingerprint } from 'lucide-react';

interface SignInScreenProps {
  onSignIn: () => void;
  onNavigate: (screen: string) => void;
  isSignUp?: boolean;
}

const SignInScreen = ({ onSignIn, onNavigate, isSignUp = false }: SignInScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-orange-600 relative overflow-hidden">
      {/* Hyderabad Skyline Background - Same as Welcome */}
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

        {/* Additional structures */}
        <div className="absolute bottom-0 left-32 w-20 h-32 bg-gradient-to-t from-gray-900/70 to-gray-800/50 rounded-t-lg"></div>
        <div className="absolute bottom-0 right-40 w-16 h-28 bg-gradient-to-t from-gray-900/70 to-gray-800/50 rounded-t-lg"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-20 bg-gradient-to-t from-gray-900/50 to-gray-800/30 rounded-t-lg opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center p-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('welcome')}
            className="text-white hover:bg-white/20 rounded-full"
          >
            <ArrowLeft size={20} />
          </Button>
        </div>

        <div className="flex-1 flex items-end">
          <div className="w-full px-6 pb-8">
            {/* Form Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Login Card */}
              <Card className="bg-gray-900/90 backdrop-blur-sm text-white rounded-3xl p-6 border border-orange-500/30">
                <h3 className="text-2xl font-bold mb-6 text-center">Login</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Mobile/Email Field */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Mobile Number or Email ID"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-4 bg-transparent border-2 border-orange-500/50 rounded-2xl text-white placeholder-gray-300 focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-4 bg-transparent border-2 border-orange-500/50 rounded-2xl text-white placeholder-gray-300 focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  {/* Fingerprint Icon */}
                  <div className="flex justify-center py-4">
                    <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center">
                      <Fingerprint className="text-orange-500" size={32} />
                    </div>
                  </div>

                  {/* Sign In Button */}
                  <Button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-2xl py-4 text-lg font-semibold"
                  >
                    Sign In
                  </Button>
                </form>
                
                <p className="text-center text-sm text-gray-300 mt-4">
                  The state where there is a blend of tradition
                </p>
              </Card>

              {/* Sign Up Card */}
              <Card className="bg-gray-900/90 backdrop-blur-sm text-white rounded-3xl p-6 border border-orange-500/30">
                <h3 className="text-2xl font-bold mb-6 text-center">Sign Up</h3>
                <form className="space-y-4">
                  {/* Aadhaar Field */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Aadhaar Card Details"
                      value={aadhaar}
                      onChange={(e) => setAadhaar(e.target.value)}
                      className="w-full px-4 py-4 bg-transparent border-2 border-orange-500/50 rounded-2xl text-white placeholder-gray-300 focus:border-orange-500 focus:outline-none"
                      maxLength={12}
                    />
                  </div>

                  {/* Name Field */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-4 bg-transparent border-2 border-orange-500/50 rounded-2xl text-white placeholder-gray-300 focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Email ID"
                      className="w-full px-4 py-4 bg-transparent border-2 border-orange-500/50 rounded-2xl text-white placeholder-gray-300 focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  {/* Mobile Field */}
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full px-4 py-4 bg-transparent border-2 border-orange-500/50 rounded-2xl text-white placeholder-gray-300 focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full px-4 py-4 bg-transparent border-2 border-orange-500/50 rounded-2xl text-white placeholder-gray-300 focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInScreen;
