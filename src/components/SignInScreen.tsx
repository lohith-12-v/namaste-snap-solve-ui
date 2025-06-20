
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Fingerprint } from 'lucide-react';

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
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(/lovable-uploads/ff17cad1-0c31-4b44-84ba-6c99b21b6145.png)' 
        }}
      >
        {/* Dark overlay for better content readability */}
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center p-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('welcome')}
            className="text-white hover:bg-white/20 rounded-full backdrop-blur-sm"
          >
            <ArrowLeft size={20} />
          </Button>
        </div>

        <div className="flex-1 flex items-end">
          <div className="w-full px-6 pb-8">
            {/* Form Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Login Card */}
              <Card className="bg-gray-900/90 dark:bg-gray-950/90 backdrop-blur-md text-white rounded-3xl p-6 border border-gray-500/30">
                <h3 className="text-2xl font-bold mb-6 text-center">Login</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Mobile/Email Field */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Mobile Number or Email ID"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-4 bg-transparent border-2 border-gray-500/50 dark:border-gray-400/50 rounded-2xl text-white placeholder-gray-300 focus:border-gray-400 dark:focus:border-gray-300 focus:outline-none"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-4 bg-transparent border-2 border-gray-500/50 dark:border-gray-400/50 rounded-2xl text-white placeholder-gray-300 focus:border-gray-400 dark:focus:border-gray-300 focus:outline-none"
                    />
                  </div>

                  {/* Fingerprint Icon */}
                  <div className="flex justify-center py-4">
                    <div className="w-16 h-16 bg-gray-700/30 dark:bg-gray-600/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Fingerprint className="text-gray-300" size={32} />
                    </div>
                  </div>

                  {/* Sign In Button */}
                  <Button
                    type="submit"
                    className="w-full bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-2xl py-4 text-lg font-semibold"
                  >
                    Sign In
                  </Button>
                </form>
                
                <p className="text-center text-sm text-gray-300 mt-4">
                  The state where there is a blend of tradition
                </p>
              </Card>

              {/* Sign Up Card */}
              <Card className="bg-gray-900/90 dark:bg-gray-950/90 backdrop-blur-md text-white rounded-3xl p-6 border border-gray-500/30">
                <h3 className="text-2xl font-bold mb-6 text-center">Sign Up</h3>
                <form className="space-y-4">
                  {/* Aadhaar Field */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Aadhaar Card Details"
                      value={aadhaar}
                      onChange={(e) => setAadhaar(e.target.value)}
                      className="w-full px-4 py-4 bg-transparent border-2 border-gray-500/50 dark:border-gray-400/50 rounded-2xl text-white placeholder-gray-300 focus:border-gray-400 dark:focus:border-gray-300 focus:outline-none"
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
                      className="w-full px-4 py-4 bg-transparent border-2 border-gray-500/50 dark:border-gray-400/50 rounded-2xl text-white placeholder-gray-300 focus:border-gray-400 dark:focus:border-gray-300 focus:outline-none"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Email ID"
                      className="w-full px-4 py-4 bg-transparent border-2 border-gray-500/50 dark:border-gray-400/50 rounded-2xl text-white placeholder-gray-300 focus:border-gray-400 dark:focus:border-gray-300 focus:outline-none"
                    />
                  </div>

                  {/* Mobile Field */}
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full px-4 py-4 bg-transparent border-2 border-gray-500/50 dark:border-gray-400/50 rounded-2xl text-white placeholder-gray-300 focus:border-gray-400 dark:focus:border-gray-300 focus:outline-none"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full px-4 py-4 bg-transparent border-2 border-gray-500/50 dark:border-gray-400/50 rounded-2xl text-white placeholder-gray-300 focus:border-gray-400 dark:focus:border-gray-300 focus:outline-none"
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
