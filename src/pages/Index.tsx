
import React, { useState } from 'react';
import WelcomeScreen from '../components/WelcomeScreen';
import SignInScreen from '../components/SignInScreen';
import HomeScreen from '../components/HomeScreen';
import SettingsScreen from '../components/SettingsScreen';
import ReportScreen from '../components/ReportScreen';
import HistoryScreen from '../components/HistoryScreen';
import MapScreen from '../components/MapScreen';
import ChatBot from '../components/ChatBot';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigateToScreen = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleSignIn = () => {
    setIsAuthenticated(true);
    setCurrentScreen('home');
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10">
        {currentScreen === 'welcome' && (
          <WelcomeScreen onNavigate={navigateToScreen} />
        )}
        {currentScreen === 'signin' && (
          <SignInScreen onSignIn={handleSignIn} onNavigate={navigateToScreen} />
        )}
        {currentScreen === 'signup' && (
          <SignInScreen isSignUp onSignIn={handleSignIn} onNavigate={navigateToScreen} />
        )}
        {isAuthenticated && (
          <>
            {currentScreen === 'home' && (
              <HomeScreen onNavigate={navigateToScreen} />
            )}
            {currentScreen === 'settings' && (
              <SettingsScreen onNavigate={navigateToScreen} />
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
      {isAuthenticated && <ChatBot />}
    </div>
  );
};

export default Index;
