
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Mail, Phone, Lock, Eye, EyeOff, CreditCard, Fingerprint, ArrowLeft } from 'lucide-react';

interface SignInScreenProps {
  isSignUp?: boolean;
  onSignIn: () => void;
  onNavigate: (screen: string) => void;
}

const SignInScreen = ({ isSignUp = false, onSignIn, onNavigate }: SignInScreenProps) => {
  const [formData, setFormData] = useState({
    aadhaar: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validFields, setValidFields] = useState({
    aadhaar: false,
    email: false,
    password: false
  });

  const validateAadhaar = (value: string) => {
    const isValid = /^\d{12}$/.test(value);
    setValidFields(prev => ({ ...prev, aadhaar: isValid }));
    return isValid;
  };

  const validateEmail = (value: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^\d{10}$/.test(value);
    setValidFields(prev => ({ ...prev, email: isValid }));
    return isValid;
  };

  const validatePassword = (value: string) => {
    const isValid = value.length >= 6;
    setValidFields(prev => ({ ...prev, password: isValid }));
    return isValid;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    switch (field) {
      case 'aadhaar':
        validateAadhaar(value);
        break;
      case 'email':
        validateEmail(value);
        break;
      case 'password':
        validatePassword(value);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-700 to-slate-600 relative overflow-hidden">
      {/* Background Elements (Same as Welcome) */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-12 bg-white/20 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-20 right-16 w-16 h-8 bg-white/15 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Landmarks */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="absolute bottom-0 left-8 w-24 h-32 bg-black/30 relative">
          <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-16 left-2 w-4 h-16 bg-black/40"></div>
          <div className="absolute bottom-16 right-2 w-4 h-16 bg-black/40"></div>
          <div className="absolute bottom-20 left-6 w-12 h-8 bg-black/50 rounded-t-lg"></div>
        </div>
        <div className="absolute bottom-0 right-8 w-20 h-28 bg-black/30 relative">
          <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-black/50 rounded-t-full"></div>
        </div>
      </div>

      {/* Walking Person */}
      <div className="absolute bottom-32 left-1/4 transform -translate-x-1/2 animate-bounce" style={{ animationDuration: '3s' }}>
        <div className="w-12 h-20 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-700 rounded-full"></div>
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-3 h-10 bg-gray-600 rounded-lg"></div>
          <div className="absolute top-6 left-1 w-2 h-6 bg-gray-600 rounded-lg transform rotate-12"></div>
          <div className="absolute top-6 right-1 w-2 h-6 bg-gray-600 rounded-lg transform -rotate-12"></div>
          <div className="absolute bottom-0 left-2 w-2 h-6 bg-gray-700 rounded-lg"></div>
          <div className="absolute bottom-0 right-2 w-2 h-6 bg-gray-700 rounded-lg"></div>
        </div>
      </div>

      {/* Back Button */}
      <Button
        onClick={() => onNavigate('welcome')}
        variant="ghost"
        className="absolute top-8 left-4 text-white hover:bg-white/10 rounded-full p-2 z-20"
      >
        <ArrowLeft size={24} />
      </Button>

      {/* Form Card */}
      <div className="absolute bottom-0 left-0 right-0 h-[70%]">
        <Card className="h-full rounded-t-3xl bg-white shadow-2xl p-8">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-gray-600">
                {isSignUp ? 'Join SnapSolve TS today' : 'Sign in to continue'}
              </p>
            </div>

            <div className="space-y-4">
              {/* Aadhaar Field */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <CreditCard size={20} />
                </div>
                <Input
                  type="text"
                  placeholder="Aadhaar Number"
                  value={formData.aadhaar}
                  onChange={(e) => handleInputChange('aadhaar', e.target.value)}
                  className={`pl-12 pr-12 py-3 rounded-xl border-2 transition-all duration-300 ${
                    formData.aadhaar ? (validFields.aadhaar ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : 'border-gray-200 focus:border-purple-500'
                  }`}
                  maxLength={12}
                />
                {validFields.aadhaar && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 animate-scale-in">
                    ✓
                  </div>
                )}
              </div>

              {/* Email/Mobile Field */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  {formData.email.includes('@') ? <Mail size={20} /> : <Phone size={20} />}
                </div>
                <Input
                  type="text"
                  placeholder="Email or Mobile"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`pl-12 pr-12 py-3 rounded-xl border-2 transition-all duration-300 ${
                    formData.email ? (validFields.email ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : 'border-gray-200 focus:border-purple-500'
                  }`}
                />
                {validFields.email && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 animate-scale-in">
                    ✓
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Lock size={20} />
                </div>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`pl-12 pr-12 py-3 rounded-xl border-2 transition-all duration-300 ${
                    formData.password ? (validFields.password ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : 'border-gray-200 focus:border-purple-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Confirm Password for Sign Up */}
              {isSignUp && (
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock size={20} />
                  </div>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="pl-12 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 transition-all duration-300"
                  />
                </div>
              )}
            </div>

            {/* Biometric Login */}
            {!isSignUp && (
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-purple-100 animate-pulse cursor-pointer hover:bg-purple-200 transition-colors duration-300">
                  <Fingerprint size={32} className="text-purple-600" />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              onClick={onSignIn}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>

            {/* Forgot Password */}
            {!isSignUp && (
              <div className="text-center">
                <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                  Forgot password?
                </a>
              </div>
            )}

            {/* Social Login */}
            <div className="flex space-x-4">
              <Button variant="outline" className="flex-1 py-3 rounded-xl border-2 hover:bg-gray-50">
                <div className="w-6 h-6 bg-red-500 rounded-full mr-2"></div>
                Google
              </Button>
              <Button variant="outline" className="flex-1 py-3 rounded-xl border-2 hover:bg-gray-50">
                <div className="w-6 h-6 bg-blue-600 rounded-full mr-2"></div>
                Facebook
              </Button>
            </div>

            {/* Switch Mode */}
            <div className="text-center">
              <span className="text-gray-600">
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              </span>
              <button
                onClick={() => onNavigate(isSignUp ? 'signin' : 'signup')}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignInScreen;
