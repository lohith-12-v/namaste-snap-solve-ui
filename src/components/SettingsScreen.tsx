
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, ChevronRight, User, Lock, Bell, Moon, Info, HelpCircle, Trash2 } from 'lucide-react';

interface SettingsScreenProps {
  onNavigate: (screen: string) => void;
}

const SettingsScreen = ({ onNavigate }: SettingsScreenProps) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm px-4 md:px-6 py-4 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNavigate('home')}
          className="mr-4 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">Settings</h1>
      </div>

      <div className="p-4 md:p-6 space-y-6 max-w-2xl mx-auto">
        {/* Profile Section */}
        <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/placeholder.svg" alt="Rajesh Kumar" />
                <AvatarFallback className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">RK</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Rajesh Kumar</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Product/UI Designer</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400 dark:text-gray-500" size={20} />
          </div>
        </Card>

        {/* Other Settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">Other settings</h3>
          
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden">
            <div className="space-y-0">
              <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <User className="text-gray-600 dark:text-gray-400" size={20} />
                  <span className="text-gray-900 dark:text-white">Profile details</span>
                </div>
                <ChevronRight className="text-gray-400 dark:text-gray-500" size={20} />
              </div>

              <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <Lock className="text-gray-600 dark:text-gray-400" size={20} />
                  <span className="text-gray-900 dark:text-white">Password</span>
                </div>
                <ChevronRight className="text-gray-400 dark:text-gray-500" size={20} />
              </div>

              <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <Bell className="text-gray-600 dark:text-gray-400" size={20} />
                  <span className="text-gray-900 dark:text-white">Notifications</span>
                </div>
                <ChevronRight className="text-gray-400 dark:text-gray-500" size={20} />
              </div>

              <div className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center space-x-3">
                  <Moon className="text-gray-600 dark:text-gray-400" size={20} />
                  <span className="text-gray-900 dark:text-white">Dark mode</span>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    darkMode ? 'bg-gray-900 dark:bg-gray-100' : 'bg-gray-300 dark:bg-gray-600'
                  } relative`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white dark:bg-gray-900 shadow-md transition-transform ${
                      darkMode ? 'transform translate-x-6' : 'transform translate-x-0.5'
                    } absolute top-0.5`}
                  />
                </button>
              </div>
            </div>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden">
            <div className="space-y-0">
              <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <Info className="text-gray-600 dark:text-gray-400" size={20} />
                  <span className="text-gray-900 dark:text-white">About application</span>
                </div>
                <ChevronRight className="text-gray-400 dark:text-gray-500" size={20} />
              </div>

              <div className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <HelpCircle className="text-gray-600 dark:text-gray-400" size={20} />
                  <span className="text-gray-900 dark:text-white">Help/FAQ</span>
                </div>
                <ChevronRight className="text-gray-400 dark:text-gray-500" size={20} />
              </div>
            </div>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
            <div className="p-4 flex items-center justify-between hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3">
                <Trash2 className="text-red-500" size={20} />
                <span className="text-red-500">Deactivate my account</span>
              </div>
              <ChevronRight className="text-red-500" size={20} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
