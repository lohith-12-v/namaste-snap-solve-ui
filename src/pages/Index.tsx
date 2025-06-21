
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import WelcomeScreen from '../components/WelcomeScreen';
import SignInScreen from '../components/SignInScreen';
import HomeScreen from '../components/HomeScreen';
import SettingsScreen from '../components/SettingsScreen';
import ProfileDetailsScreen from '../components/ProfileDetailsScreen';
import ReportScreen from '../components/ReportScreen';
import HistoryScreen from '../components/HistoryScreen';
import MapScreen from '../components/MapScreen';
import ChatBot from '../components/ChatBot';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const { user, loading } = useAuth();

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    // If user is authenticated, go to home screen
    if (user && currentScreen === 'welcome') {
      setCurrentScreen('home');
    }
    // If user is not authenticated and trying to access protected screens, redirect to welcome
    if (!user && !['welcome', 'signin', 'signup'].includes(currentScreen)) {
      setCurrentScreen('welcome');
    }
  }, [user, currentScreen]);

  const navigateToScreen = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleSignIn = () => {
    setCurrentScreen('home');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10">
        {!user && (
          <>
            {currentScreen === 'welcome' && (
              <WelcomeScreen onNavigate={navigateToScreen} />
            )}
            {currentScreen === 'signin' && (
              <SignInScreen onSignIn={handleSignIn} onNavigate={navigateToScreen} />
            )}
            {currentScreen === 'signup' && (
              <SignInScreen isSignUp onSignIn={handleSignIn} onNavigate={navigateToScreen} />
            )}
          </>
        )}
        
        {user && (
          <>
            {currentScreen === 'home' && (
              <HomeScreen onNavigate={navigateToScreen} />
            )}
            {currentScreen === 'settings' && (
              <SettingsScreen onNavigate={navigateToScreen} />
            )}
            {currentScreen === 'profile' && (
              <ProfileDetailsScreen onNavigate={navigateToScreen} />
            )}
            {currentScreen === 'report' && (
              <ReportScreen onNavigate={navigateToScreen} />
            )}
            {currentScreen === 'history' && (
              <HistoryScreen onNavigate={navigateToScreen} />
            )}
            {currentScreen === 'map' && (
              <MapScreen onNavigate={navigateToScreen} />
            )}
          </>
        )}
      </div>

      {/* Floating ChatBot */}
      {user && <ChatBot />}
    </div>
  );
};

export default Index;
