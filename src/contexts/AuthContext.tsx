
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  aadhaar: string;
  address: string;
  profile_photo_url?: string;
  reward_points: number;
  problems_reported: number;
  problems_solved: number;
  rating: number;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string, address: string, aadhaar: string) => Promise<{ error: any }>;
  signIn: (identifier: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session);
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      console.log('Profile fetched:', data);
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const signUp = async (email: string, password: string, name: string, address: string, aadhaar: string) => {
    try {
      console.log('Attempting sign up with:', { email, name, address, aadhaar });
      
      // Validate required fields
      if (!email || !password || !name || !address || !aadhaar) {
        return { error: { message: 'All fields are required' } };
      }

      if (aadhaar.length !== 12 || !/^\d{12}$/.test(aadhaar)) {
        return { error: { message: 'Aadhaar must be exactly 12 digits' } };
      }

      if (password.length < 6) {
        return { error: { message: 'Password must be at least 6 characters' } };
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            name,
            address,
            aadhaar
          }
        }
      });

      if (error) {
        console.error('Sign up error:', error);
        return { error };
      }

      console.log('Sign up successful:', data);
      toast({
        title: "Account created successfully!",
        description: "Please check your email to verify your account.",
      });

      return { error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error };
    }
  };

  const signIn = async (identifier: string, password: string) => {
    try {
      console.log('Attempting sign in with identifier:', identifier);
      
      if (!identifier || !password) {
        return { error: { message: 'Email/Aadhaar and password are required' } };
      }

      // Try signing in with email first
      let result = await supabase.auth.signInWithPassword({
        email: identifier,
        password
      });

      // If that fails and identifier looks like aadhaar (12 digits), try to find user by aadhaar
      if (result.error && /^\d{12}$/.test(identifier)) {
        console.log('Email login failed, trying aadhaar lookup');
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('email')
          .eq('aadhaar', identifier)
          .single();

        if (profileData && !profileError) {
          console.log('Found user by aadhaar, trying email login');
          result = await supabase.auth.signInWithPassword({
            email: profileData.email,
            password
          });
        }
      }

      if (result.error) {
        console.error('Sign in error:', result.error);
        let errorMessage = 'Invalid email/aadhaar or password';
        if (result.error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email/aadhaar or password';
        } else if (result.error.message.includes('Email not confirmed')) {
          errorMessage = 'Please check your email and confirm your account';
        }
        return { error: { message: errorMessage } };
      }

      console.log('Sign in successful:', result.data);
      toast({
        title: "Welcome back!",
        description: "You have been signed in successfully.",
      });

      return { error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
      } else {
        toast({
          title: "Signed out",
          description: "You have been signed out successfully.",
        });
      }
      return { error };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error };
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: 'No user logged in' };

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id);

      if (!error) {
        await refreshProfile();
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        });
      }

      return { error };
    } catch (error) {
      console.error('Update profile error:', error);
      return { error };
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const value = {
    user,
    session,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    refreshProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
