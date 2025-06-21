
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, CreditCard, Mail, Lock, User, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface SignInScreenProps {
  isSignUp?: boolean;
  onSignIn: () => void;
  onNavigate: (screen: string) => void;
}

const SignInScreen = ({ isSignUp = false, onSignIn, onNavigate }: SignInScreenProps) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    aadhaar: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState(false);
  const { signUp, signIn } = useAuth();
  const { toast } = useToast();

  const validateAadhaar = (value: string) => {
    return value.length === 12 && /^\d{12}$/.test(value);
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validatePassword = (value: string) => {
    return value.length >= 6;
  };

  const validateName = (value: string) => {
    return value.length >= 2;
  };

  const validateAddress = (value: string) => {
    return value.length >= 10;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Real-time validation
    let error = '';
    if (field === 'aadhaar' && value && !validateAadhaar(value)) {
      error = 'Aadhaar must be 12 digits';
    } else if (field === 'email' && value && !validateEmail(value)) {
      error = 'Enter valid email address';
    } else if (field === 'password' && value && !validatePassword(value)) {
      error = 'Password must be at least 6 characters';
    } else if (field === 'name' && value && !validateName(value)) {
      error = 'Name must be at least 2 characters';
    } else if (field === 'address' && value && !validateAddress(value)) {
      error = 'Address must be at least 10 characters';
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const isFieldValid = (field: string) => {
    const value = formData[field as keyof typeof formData];
    if (!value) return false;
    
    switch (field) {
      case 'aadhaar': return validateAadhaar(value);
      case 'email': return validateEmail(value);
      case 'password': return validatePassword(value);
      case 'name': return validateName(value);
      case 'address': return validateAddress(value);
      default: return false;
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (isSignUp) {
      if (!formData.name || !validateName(formData.name)) {
        newErrors.name = 'Name must be at least 2 characters';
      }
      if (!formData.address || !validateAddress(formData.address)) {
        newErrors.address = 'Address must be at least 10 characters';
      }
      if (!formData.email || !validateEmail(formData.email)) {
        newErrors.email = 'Enter valid email address';
      }
    } else {
      // For sign in, we need email or mobile (we'll treat as email for now)
      if (!formData.email) {
        newErrors.email = 'Email or Aadhaar is required';
      }
    }
    
    if (!formData.aadhaar || !validateAadhaar(formData.aadhaar)) {
      newErrors.aadhaar = 'Aadhaar must be 12 digits';
    }
    if (!formData.password || !validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      if (isSignUp) {
        const { error } = await signUp(
          formData.email,
          formData.password,
          formData.name,
          formData.address,
          formData.aadhaar
        );
        
        if (error) {
          toast({
            title: "Sign Up Failed",
            description: error.message || "Failed to create account",
            variant: "destructive",
          });
        } else {
          onSignIn();
        }
      } else {
        const identifier = formData.email || formData.aadhaar;
        const { error } = await signIn(identifier, formData.password);
        
        if (error) {
          toast({
            title: "Sign In Failed",
            description: error.message || "Failed to sign in",
            variant: "destructive",
          });
        } else {
          onSignIn();
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
            {/* Sign Up Fields */}
            {isSignUp && (
              <>
                {/* Name Field */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full pl-10 pr-10 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-300 focus:outline-none transition-all duration-300 font-['Poppins'] ${
                      errors.name ? 'border-red-400 animate-pulse' : 
                      isFieldValid('name') ? 'border-green-400' : 
                      'border-white/30 focus:border-white/50 focus:animate-pulse'
                    }`}
                  />
                  {isFieldValid('name') && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </div>
                  )}
                  {errors.name && (
                    <p className="text-red-300 text-sm mt-1 font-['Poppins']">{errors.name}</p>
                  )}
                </div>

                {/* Address Field */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={`w-full pl-10 pr-10 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-300 focus:outline-none transition-all duration-300 font-['Poppins'] ${
                      errors.address ? 'border-red-400 animate-pulse' : 
                      isFieldValid('address') ? 'border-green-400' : 
                      'border-white/30 focus:border-white/50 focus:animate-pulse'
                    }`}
                  />
                  {isFieldValid('address') && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </div>
                  )}
                  {errors.address && (
                    <p className="text-red-300 text-sm mt-1 font-['Poppins']">{errors.address}</p>
                  )}
                </div>

                {/* Email Field for Sign Up */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pl-10 pr-10 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-300 focus:outline-none transition-all duration-300 font-['Poppins'] ${
                      errors.email ? 'border-red-400 animate-pulse' : 
                      isFieldValid('email') ? 'border-green-400' : 
                      'border-white/30 focus:border-white/50 focus:animate-pulse'
                    }`}
                  />
                  {isFieldValid('email') && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </div>
                  )}
                  {errors.email && (
                    <p className="text-red-300 text-sm mt-1 font-['Poppins']">{errors.email}</p>
                  )}
                </div>
              </>
            )}

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

            {/* Email/Mobile Field for Sign In */}
            {!isSignUp && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Email or Aadhaar"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-10 pr-10 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-300 focus:outline-none transition-all duration-300 font-['Poppins'] ${
                    errors.email ? 'border-red-400 animate-pulse' : 
                    'border-white/30 focus:border-white/50 focus:animate-pulse'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-300 text-sm mt-1 font-['Poppins']">{errors.email}</p>
                )}
              </div>
            )}

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

            {/* Sign In Button */}
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gray-900/80 hover:bg-gray-800/90 backdrop-blur-sm text-white rounded-xl py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 font-['Poppins'] disabled:opacity-50"
            >
              {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </Button>

            {/* Forgot Password */}
            {!isSignUp && (
              <div className="text-center">
                <button className="text-white/80 hover:text-white text-sm transition-colors font-['Poppins']">
                  Forgot password?
                </button>
              </div>
            )}

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
