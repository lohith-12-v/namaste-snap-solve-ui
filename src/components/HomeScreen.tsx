
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Settings, Star, Plus, Bell, Trophy, FileText, CheckCircle } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

const HomeScreen = ({ onNavigate }: HomeScreenProps) => {
  const [points, setPoints] = useState(1250);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Namaste, Rajesh!</h2>
          <p className="text-sm text-gray-600">Ready to make Telangana better?</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:bg-gray-100"
          >
            <Bell size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('settings')}
            className="text-gray-600 hover:bg-gray-100"
          >
            <Settings size={20} />
          </Button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="p-6">
        <Card className="bg-gray-900 text-white p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder.svg" alt="Rajesh Kumar" />
                <AvatarFallback className="bg-gray-700 text-white text-lg">RK</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold">Rajesh Kumar</h3>
                <p className="text-gray-300 text-sm">rajesh.kumar@example.com</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 mb-1">
                <Trophy className="text-orange-400" size={20} />
                <span className="text-2xl font-bold">{points.toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-300">Reward Points</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '60%' }}></div>
          </div>
          <p className="text-sm text-gray-300">750 points to next level</p>
        </Card>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6">
        {/* Statistics Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="p-4 text-center rounded-xl shadow-sm bg-white">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="text-gray-600" size={20} />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
            <div className="text-sm text-gray-600">Reported</div>
          </Card>
          
          <Card className="p-4 text-center rounded-xl shadow-sm bg-white">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">8</div>
            <div className="text-sm text-gray-600">Solved</div>
          </Card>
          
          <Card className="p-4 text-center rounded-xl shadow-sm bg-white">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="text-orange-600" size={20} />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">4.5</div>
            <div className="text-sm text-gray-600">Rating</div>
          </Card>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="p-6 space-y-4">
        <Button
          onClick={() => onNavigate('report')}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-full py-4 text-lg font-semibold flex items-center justify-center space-x-2"
        >
          <Plus size={20} />
          <span>Report a Problem</span>
        </Button>
        
        <Button
          onClick={() => onNavigate('history')}
          variant="outline"
          className="w-full bg-white border-2 border-gray-200 text-gray-900 hover:bg-gray-50 rounded-full py-4 text-lg font-semibold flex items-center justify-center space-x-2"
        >
          <FileText size={20} />
          <span>View My Reports</span>
        </Button>
      </div>
    </div>
  );
};

export default HomeScreen;
