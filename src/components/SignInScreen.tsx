
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Mail, Lock, User, MapPin, CreditCard } from 'lucide-react';
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
  const [loading, setLoading] = useState(false);
  const { signUp, signIn } = useAuth();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      toast({
        title: "Required Fields",
        description: "Please enter email and password",
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
          formData.name || 'User',
          formData.address || 'Address',
          formData.aadhaar || '123456789012'
        );
        
        if (error) {
          toast({
            title: "Sign Up Failed",
            description: error.message || "Failed to create account",
            variant: "destructive",
          });
        } else {
          // Auto sign in after successful sign up
          setTimeout(async () => {
            const signInResult = await signIn(formData.email, formData.password);
            if (!signInResult.error) {
              onSignIn();
            }
          }, 1000);
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
            {/* Sign Up Optional Fields */}
            {isSignUp && (
              <>
                {/* Name Field - Optional */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Full Name (Optional)"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full pl-10 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-white/50 transition-all duration-300 font-['Poppins']"
                  />
                </div>

                {/* Address Field - Optional */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Address (Optional)"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full pl-10 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-white/50 transition-all duration-300 font-['Poppins']"
                  />
                </div>

                {/* Aadhaar Field - Optional */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Aadhaar Number (Optional)"
                    value={formData.aadhaar}
                    onChange={(e) => handleInputChange('aadhaar', e.target.value)}
                    maxLength={12}
                    className="w-full pl-10 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-white/50 transition-all duration-300 font-['Poppins']"
                  />
                </div>
              </>
            )}

            {/* Email Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder={isSignUp ? "Email Address" : "Email or Aadhaar"}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full pl-10 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-white/50 transition-all duration-300 font-['Poppins']"
              />
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
                className="w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-white/50 transition-all duration-300 font-['Poppins']"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gray-900/80 hover:bg-gray-800/90 backdrop-blur-sm text-white rounded-xl py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 font-['Poppins'] disabled:opacity-50"
            >
              {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </Button>

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
