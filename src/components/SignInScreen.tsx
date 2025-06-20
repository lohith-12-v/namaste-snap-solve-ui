
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Fingerprint, Eye, EyeOff, Mail, Phone, Lock, CreditCard, Check } from 'lucide-react';

interface SignInScreenProps {
  onSignIn: () => void;
  onNavigate: (screen: string) => void;
  isSignUp?: boolean;
}

const SignInScreen = ({ onSignIn, onNavigate, isSignUp = false }: SignInScreenProps) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ aadhaar: '', name: '', email: '', mobile: '', password: '' });
  const [showPassword, setShowPassword] = useState({ login: false, signup: false });
  const [validations, setValidations] = useState({
    aadhaar: false,
    email: false,
    mobile: false,
    password: false
  });

  const validateAadhaar = (value: string) => {
    const isValid = /^\d{12}$/.test(value);
    setValidations(prev => ({ ...prev, aadhaar: isValid }));
    return isValid;
  };

  const validateEmail = (value: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setValidations(prev => ({ ...prev, email: isValid }));
    return isValid;
  };

  const validateMobile = (value: string) => {
    const isValid = /^\d{10}$/.test(value);
    setValidations(prev => ({ ...prev, mobile: isValid }));
    return isValid;
  };

  const validatePassword = (value: string) => {
    const isValid = value.length >= 8;
    setValidations(prev => ({ ...prev, password: isValid }));
    return isValid;
  };

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
                <h3 className="text-2xl font-bold mb-6 text-center font-['Poppins']">Login</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email/Mobile Field */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      {loginData.email.includes('@') ? <Mail size={20} /> : <Phone size={20} />}
                    </div>
                    <input
                      type="text"
                      placeholder="Mobile Number or Email ID"
                      value={loginData.email}
                      onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-12 pr-12 py-4 bg-transparent border-2 border-gray-500/50 dark:border-gray-400/50 rounded-2xl text-white placeholder-gray-300 focus:border-gray-400 dark:focus:border-gray-300 focus:outline-none transition-all duration-300 focus:animate-pulse font-['Poppins']"
                    />
                    {validateEmail(loginData.email) && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Check className="text-green-400 animate-bounce" size={20} />
                      </div>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Lock size={20} />
                    </div>
                    <input
                      type={showPassword.login ? 'text' : 'password'}
                      placeholder="Password"
                      value={loginData.password}
                      onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full pl-12 pr-12 py-4 bg-transparent border-2 border-gray-500/50 dark:border-gray-400/50 rounded-2xl text-white placeholder-gray-300 focus:border-gray-400 dark:focus:border-gray-300 focus:outline-none transition-all duration-300 focus:animate-pulse font-['Poppins']"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(prev => ({ ...prev, login: !prev.login }))}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showPassword.login ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* Fingerprint Icon */}
                  <div className="flex justify-center py-4">
                    <div className="w-16 h-16 bg-gray-700/30 dark:bg-gray-600/30 rounded-full flex items-center justify-center backdrop-blur-sm animate-pulse">
                      <Fingerprint className="text-gray-300 animate-bounce" size={32} />
                    </div>
                  </div>

                  {/* Sign In Button */}
                  <Button
                    type="submit"
                    className="w-full bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-2xl py-4 text-lg font-semibold font-['Poppins'] transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    Sign In
                  </Button>

                  {/* Forgot Password */}
                  <div className="text-center">
                    <button type="button" className="text-sm text-gray-300 hover:text-white underline font-['Poppins']">
                      Forgot password?
                    </button>
                  </div>

                  {/* Social Login */}
                  <div className="flex justify-center space-x-4 pt-4">
                    <button className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center hover:bg-gray-600/50 transition-all duration-300 hover:shadow-lg">
                      <div className="w-6 h-6 bg-white rounded-full"></div>
                    </button>
                    <button className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center hover:bg-gray-600/50 transition-all duration-300 hover:shadow-lg">
                      <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                    </button>
                  </div>
                </form>
                
                <p className="text-center text-sm text-gray-300 mt-4 font-['Poppins']">
                  The state where there is a blend of tradition
                </p>
              </Card>

              {/* Sign Up Card */}
              <Card className="bg-gray-900/90 dark:bg-gray-950/90 backdrop-blur-md text-white rounded-3xl p-6 border border-gray-500/30">
                <h3 className="text-2xl font-bold mb-6 text-center font-['Poppins']">Sign Up</h3>
                <form className="space-y-4">
                  {/* Aadhaar Field */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <CreditCard size={20} />
                    </div>
                    <input
                      type="text"
                      placeholder="Aadhaar Card Details"
                      value={signupData.aadhaar}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 12);
                        setSignupData(prev => ({ ...prev, aadhaar: value }));
                        validateAadhaar(value);
                      }}
                      className="w-full pl-12 pr-12 py-4 bg-transparent border-2 border-gray-500/50 dark:border-gray-400/50 rounded-2xl text-white placeholder-gray-300 focus:border-gray-400 dark:focus:border-gray-300 focus:outline-none transition-all duration-300 focus:animate-pulse font-['Poppins']"
                      maxLength={12}
                    />
                    {validations.aadhaar && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Check className="text-green-400 animate-bounce" size={20} />
                      </div>
                    )}
                  </div>

                  {/* Name Field */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Name"
                      value={signupData.name}
                      onChange={(e) => setSignupData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-4 bg-transparent border-2 border-gray-500/50 dark:border-gray-400/50 rounded-2xl text-white placeholder-gray-300 focus:border-gray-400 dark:focus:border-gray-300 focus:outline-none transition-all duration-300 focus:animate-pulse font-['Poppins']"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Mail size={20} />
                    </div>
                    <input
                      type="email"
                      placeholder="Email ID"
                      value={signupData.email}
                      onChange={(e) => {
                        setSignupData(prev => ({ ...prev, email: e.target.value }));
                        validateEmail(e.target.value);
                      }}
                      className="w-full pl-12 pr-12 py-4 bg-transparent border-2 border-gray-500/50 dark:border-gray-400/50 rounded-2xl text-white placeholder-gray-300 focus:border-gray-400 dark:focus:border-gray-300 focus:outline-none transition-all duration-300 focus:animate-pulse font-['Poppins']"
                    />
                    {validations.email && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Check className="text-green-400 animate-bounce" size={20} />
                      </div>
                    )}
                  </div>

                  {/* Mobile Field */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Phone size={20} />
                    </div>
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      value={signupData.mobile}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setSignupData(prev => ({ ...prev, mobile: value }));
                        validateMobile(value);
                      }}
                      className="w-full pl-12 pr-12 py-4 bg-transparent border-2 border-gray-500/50 dark:border-gray-400/50 rounded-2xl text-white placeholder-gray-300 focus:border-gray-400 dark:focus:border-gray-300 focus:outline-none transition-all duration-300 focus:animate-pulse font-['Poppins']"
                    />
                    {validations.mobile && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Check className="text-green-400 animate-bounce" size={20} />
                      </div>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Lock size={20} />
                    </div>
                    <input
                      type={showPassword.signup ? 'text' : 'password'}
                      placeholder="Password"
                      value={signupData.password}
                      onChange={(e) => {
                        setSignupData(prev => ({ ...prev, password: e.target.value }));
                        validatePassword(e.target.value);
                      }}
                      className="w-full pl-12 pr-12 py-4 bg-transparent border-2 border-gray-500/50 dark:border-gray-400/50 rounded-2xl text-white placeholder-gray-300 focus:border-gray-400 dark:focus:border-gray-300 focus:outline-none transition-all duration-300 focus:animate-pulse font-['Poppins']"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(prev => ({ ...prev, signup: !prev.signup }))}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showPassword.signup ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    {validations.password && (
                      <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                        <Check className="text-green-400 animate-bounce" size={20} />
                      </div>
                    )}
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
