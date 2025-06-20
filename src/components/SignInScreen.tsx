
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, CreditCard, Mail, Lock, Fingerprint } from 'lucide-react';

interface SignInScreenProps {
  isSignUp?: boolean;
  onSignIn: () => void;
  onNavigate: (screen: string) => void;
}

const SignInScreen = ({ isSignUp = false, onSignIn, onNavigate }: SignInScreenProps) => {
  const [formData, setFormData] = useState({
    aadhaar: '',
    emailOrMobile: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateAadhaar = (value: string) => {
    return value.length === 12 && /^\d{12}$/.test(value);
  };

  const validateEmailOrMobile = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;
    return emailRegex.test(value) || mobileRegex.test(value);
  };

  const validatePassword = (value: string) => {
    return value.length >= 6;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Real-time validation
    let error = '';
    if (field === 'aadhaar' && value && !validateAadhaar(value)) {
      error = 'Aadhaar must be 12 digits';
    } else if (field === 'emailOrMobile' && value && !validateEmailOrMobile(value)) {
      error = 'Enter valid email or 10-digit mobile';
    } else if (field === 'password' && value && !validatePassword(value)) {
      error = 'Password must be at least 6 characters';
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const isFieldValid = (field: string) => {
    const value = formData[field as keyof typeof formData];
    if (!value) return false;
    
    switch (field) {
      case 'aadhaar': return validateAadhaar(value);
      case 'emailOrMobile': return validateEmailOrMobile(value);
      case 'password': return validatePassword(value);
      default: return false;
    }
  };

  const handleSubmit = () => {
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
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-6 md:px-8">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-['Poppins']">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-white/80 font-['Poppins']">
              {isSignUp ? 'Join TG FixIt community' : 'Sign in to continue'}
            </p>
          </div>

          <div className="space-y-4">
            {/* Aadhaar Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CreditCard className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Aadhaar Number"
                value={formData.aadhaar}
                onChange={(e) => handleInputChange('aadhaar', e.target.value)}
                maxLength={12}
                className={`w-full pl-10 pr-10 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-300 focus:outline-none transition-all duration-300 font-['Poppins'] ${
                  errors.aadhaar ? 'border-red-400 animate-pulse' : 
                  isFieldValid('aadhaar') ? 'border-green-400' : 
                  'border-white/30 focus:border-white/50 focus:animate-pulse'
                }`}
              />
              {isFieldValid('aadhaar') && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
              )}
              {errors.aadhaar && (
                <p className="text-red-300 text-sm mt-1 font-['Poppins']">{errors.aadhaar}</p>
              )}
            </div>

            {/* Email/Mobile Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Email or Mobile"
                value={formData.emailOrMobile}
                onChange={(e) => handleInputChange('emailOrMobile', e.target.value)}
                className={`w-full pl-10 pr-10 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-300 focus:outline-none transition-all duration-300 font-['Poppins'] ${
                  errors.emailOrMobile ? 'border-red-400 animate-pulse' : 
                  isFieldValid('emailOrMobile') ? 'border-green-400' : 
                  'border-white/30 focus:border-white/50 focus:animate-pulse'
                }`}
              />
              {isFieldValid('emailOrMobile') && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
              )}
              {errors.emailOrMobile && (
                <p className="text-red-300 text-sm mt-1 font-['Poppins']">{errors.emailOrMobile}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full pl-10 pr-20 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-300 focus:outline-none transition-all duration-300 font-['Poppins'] ${
                  errors.password ? 'border-red-400 animate-pulse' : 
                  isFieldValid('password') ? 'border-green-400' : 
                  'border-white/30 focus:border-white/50 focus:animate-pulse'
                }`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-2">
                {isFieldValid('password') && (
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-300 text-sm mt-1 font-['Poppins']">{errors.password}</p>
              )}
            </div>

            {/* Fingerprint Icon */}
            <div className="flex justify-center py-4">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full animate-pulse">
                <Fingerprint className="h-8 w-8 text-white/70" />
              </div>
            </div>

            {/* Sign In Button */}
            <Button
              onClick={handleSubmit}
              className="w-full bg-gray-900/80 hover:bg-gray-800/90 backdrop-blur-sm text-white rounded-xl py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 font-['Poppins']"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>

            {/* Forgot Password */}
            {!isSignUp && (
              <div className="text-center">
                <button className="text-white/80 hover:text-white text-sm transition-colors font-['Poppins']">
                  Forgot password?
                </button>
              </div>
            )}

            {/* Social Login */}
            <div className="flex justify-center space-x-4 pt-4">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:shadow-lg cursor-pointer">
                <span className="text-white font-bold">G</span>
              </div>
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:shadow-lg cursor-pointer">
                <span className="text-white font-bold">f</span>
              </div>
            </div>

            {/* Toggle Sign Up/Sign In */}
            <div className="text-center pt-4">
              <span className="text-white/80 text-sm font-['Poppins']">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              </span>
              <button
                onClick={() => onNavigate(isSignUp ? 'signin' : 'signup')}
                className="text-white hover:text-gray-300 text-sm font-semibold transition-colors font-['Poppins']"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInScreen;
