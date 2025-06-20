
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Settings, Star, Plus, ArrowRight, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

const HomeScreen = ({ onNavigate }: HomeScreenProps) => {
  const [points, setPoints] = useState(1250);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Star className="text-yellow-500" size={20} />
          <div className="text-xl font-bold text-gray-900">
            {points.toLocaleString()}
          </div>
          <span className="text-sm text-gray-600">Trust Points</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNavigate('settings')}
          className="text-gray-600 hover:bg-gray-100"
        >
          <Settings size={20} />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 flex flex-col justify-center items-center">
        {/* Profile Section - Center */}
        <div className="text-center mb-8">
          <Avatar className="w-24 h-24 mx-auto mb-4">
            <AvatarImage src="/placeholder.svg" alt="Sarah Johnson" />
            <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">SJ</AvatarFallback>
          </Avatar>
          <div className="flex items-center justify-center mb-2">
            <Star className="text-yellow-500 mr-1" size={16} />
            <span className="text-lg font-semibold text-gray-900">4.6</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Sarah Johnson</h2>
          <p className="text-gray-600">MBBS, MD</p>
          <p className="text-sm text-gray-500">Practice Specialist</p>
        </div>

        {/* Latest Report Progress Card */}
        <Card className="w-full max-w-sm p-6 rounded-2xl shadow-md mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Latest Report Progress</h3>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              Under Review
            </span>
          </div>
          
          <div className="space-y-3">
            <p className="text-gray-600">Broken streetlight on Road No. 12</p>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-2/3"></div>
            </div>
            
            <div className="flex justify-between text-sm text-gray-500">
              <span>Submitted 2 days ago</span>
              <span>66% Complete</span>
            </div>

            {/* Status Timeline Preview */}
            <div className="flex items-center space-x-4 pt-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-500" size={16} />
                <span className="text-sm text-gray-600">Reported</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="text-yellow-500" size={16} />
                <span className="text-sm text-gray-600">Under Review</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertCircle className="text-gray-300" size={16} />
                <span className="text-sm text-gray-400">Resolution</span>
              </div>
            </div>
          </div>

          <Button 
            variant="ghost" 
            className="w-full mt-4 text-purple-600 hover:bg-purple-50"
            onClick={() => onNavigate('history')}
          >
            View Full Timeline <ArrowRight size={16} className="ml-2" />
          </Button>
        </Card>

        {/* Statistics Grid */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-sm mb-8">
          <Card className="p-4 text-center rounded-xl shadow-md">
            <div className="text-2xl font-bold text-purple-600 mb-1">12</div>
            <div className="text-sm text-gray-600">Reported</div>
          </Card>
          
          <Card className="p-4 text-center rounded-xl shadow-md">
            <div className="text-2xl font-bold text-green-600 mb-1">8</div>
            <div className="text-sm text-gray-600">Solved</div>
          </Card>
          
          <Card className="p-4 text-center rounded-xl shadow-md">
            <div className="text-2xl font-bold text-yellow-600 mb-1">4.2</div>
            <div className="text-sm text-gray-600">Rating</div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          <Button 
            variant="outline" 
            className="p-6 h-auto rounded-xl border-2 hover:bg-gray-50"
            onClick={() => onNavigate('history')}
          >
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900 mb-1">History</div>
              <div className="text-sm text-gray-600">View past reports</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="p-6 h-auto rounded-xl border-2 hover:bg-gray-50"
            onClick={() => onNavigate('map')}
          >
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900 mb-1">Map</div>
              <div className="text-sm text-gray-600">Area overview</div>
            </div>
          </Button>
        </div>
      </div>

      {/* Footer Report Button */}
      <div className="p-6 pb-8">
        <Button
          onClick={() => onNavigate('report')}
          className="w-full bg-slate-800 hover:bg-slate-700 text-white rounded-full py-4 text-lg font-semibold"
        >
          <Plus size={20} className="mr-2" />
          Report a Problem
        </Button>
      </div>
    </div>
  );
};

export default HomeScreen;
