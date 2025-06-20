import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, ChevronRight, User, Lock, Bell, Moon, Info, HelpCircle, Trash2 } from 'lucide-react';

interface SettingsScreenProps {
  onNavigate: (screen: string) => void;
}

const SettingsScreen = ({ onNavigate }: SettingsScreenProps) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm px-6 py-4 flex items-center`}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNavigate('home')}
          className={`mr-4 ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'}`}
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Settings</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Section */}
        <Card className={`p-4 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-xl shadow-sm`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/placeholder.svg" alt="Alfred Daniel" />
                <AvatarFallback className="bg-purple-100 text-purple-600">AD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Alfred Daniel</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Product/UI Designer</p>
              </div>
            </div>
            <ChevronRight className={`${darkMode ? 'text-gray-400' : 'text-gray-400'}`} size={20} />
          </div>
        </Card>

        {/* Other Settings */}
        <div className="space-y-4">
          <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>Other settings</h3>
          
          <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-xl shadow-sm overflow-hidden`}>
            <div className="space-y-0">
              <div className={`p-4 flex items-center justify-between border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer`}>
                <div className="flex items-center space-x-3">
                  <User className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`} size={20} />
                  <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>Profile details</span>
                </div>
                <ChevronRight className={`${darkMode ? 'text-gray-400' : 'text-gray-400'}`} size={20} />
              </div>

              <div className={`p-4 flex items-center justify-between border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer`}>
                <div className="flex items-center space-x-3">
                  <Lock className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`} size={20} />
                  <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>Password</span>
                </div>
                <ChevronRight className={`${darkMode ? 'text-gray-400' : 'text-gray-400'}`} size={20} />
              </div>

              <div className={`p-4 flex items-center justify-between border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer`}>
                <div className="flex items-center space-x-3">
                  <Bell className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`} size={20} />
                  <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>Notifications</span>
                </div>
                <ChevronRight className={`${darkMode ? 'text-gray-400' : 'text-gray-400'}`} size={20} />
              </div>

              <div className={`p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}>
                <div className="flex items-center space-x-3">
                  <Moon className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`} size={20} />
                  <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>Dark mode</span>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    darkMode ? 'bg-blue-600' : 'bg-gray-300'
                  } relative`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                      darkMode ? 'transform translate-x-6' : 'transform translate-x-0.5'
                    } absolute top-0.5`}
                  />
                </button>
              </div>
            </div>
          </Card>

          <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-xl shadow-sm overflow-hidden`}>
            <div className="space-y-0">
              <div className={`p-4 flex items-center justify-between border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer`}>
                <div className="flex items-center space-x-3">
                  <Info className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`} size={20} />
                  <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>About application</span>
                </div>
                <ChevronRight className={`${darkMode ? 'text-gray-400' : 'text-gray-400'}`} size={20} />
              </div>

              <div className={`p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer`}>
                <div className="flex items-center space-x-3">
                  <HelpCircle className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`} size={20} />
                  <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>Help/FAQ</span>
                </div>
                <ChevronRight className={`${darkMode ? 'text-gray-400' : 'text-gray-400'}`} size={20} />
              </div>
            </div>
          </Card>

          <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-xl shadow-sm`}>
            <div className={`p-4 flex items-center justify-between hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer`}>
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
