
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Settings, Star, Plus, Bell, Trophy, FileText, CheckCircle, TrendingUp } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

const HomeScreen = ({ onNavigate }: HomeScreenProps) => {
  const [points, setPoints] = useState(1250);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm px-4 md:px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">Namaste, Rajesh!</h2>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Ready to make Telangana better?</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Bell size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('settings')}
            className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Settings size={18} />
          </Button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="p-4 md:p-6">
        <Card className="bg-gray-900 dark:bg-gray-800 text-white p-4 md:p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3 md:space-x-4">
              <Avatar className="w-12 h-12 md:w-16 md:h-16">
                <AvatarImage src="/placeholder.svg" alt="Rajesh Kumar" />
                <AvatarFallback className="bg-gray-700 dark:bg-gray-600 text-white text-sm md:text-lg">RK</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg md:text-xl font-bold">Rajesh Kumar</h3>
                <p className="text-gray-300 text-xs md:text-sm">rajesh.kumar@example.com</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 mb-1">
                <Trophy className="text-gray-300 dark:text-gray-400" size={16} />
                <span className="text-lg md:text-2xl font-bold">{points.toLocaleString()}</span>
              </div>
              <p className="text-xs md:text-sm text-gray-300">Reward Points</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-700 dark:bg-gray-600 rounded-full h-2 mb-2">
            <div className="bg-gray-400 dark:bg-gray-300 h-2 rounded-full" style={{ width: '60%' }}></div>
          </div>
          <p className="text-xs md:text-sm text-gray-300">750 points to next level</p>
        </Card>
      </div>

      {/* Report Progress Card */}
      <div className="px-4 md:px-6 mb-6">
        <Card className="p-4 rounded-xl shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">Latest Report Progress</h3>
            <TrendingUp className="text-gray-600 dark:text-gray-400" size={18} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Pothole at Jubilee Hills</span>
              <span className="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full">In Progress</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-yellow-500 dark:bg-yellow-400 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Expected completion: 3 days</p>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 md:px-6">
        {/* Statistics Grid */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
          <Card className="p-3 md:p-4 text-center rounded-xl shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
              <FileText className="text-gray-600 dark:text-gray-400" size={16} />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">12</div>
            <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Reported</div>
          </Card>
          
          <Card className="p-3 md:p-4 text-center rounded-xl shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
              <CheckCircle className="text-gray-600 dark:text-gray-400" size={16} />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">8</div>
            <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Solved</div>
          </Card>
          
          <Card className="p-3 md:p-4 text-center rounded-xl shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
              <Star className="text-gray-600 dark:text-gray-400" size={16} />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">4.5</div>
            <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Rating</div>
          </Card>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="p-4 md:p-6 space-y-4">
        <Button
          onClick={() => onNavigate('report')}
          className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-gray-900 rounded-full py-3 md:py-4 text-base md:text-lg font-semibold flex items-center justify-center space-x-2"
        >
          <Plus size={18} />
          <span>Report a Problem</span>
        </Button>
        
        <Button
          onClick={() => onNavigate('history')}
          variant="outline"
          className="w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full py-3 md:py-4 text-base md:text-lg font-semibold flex items-center justify-center space-x-2"
        >
          <FileText size={18} />
          <span>View My Reports</span>
        </Button>
      </div>
    </div>
  );
};

export default HomeScreen;
