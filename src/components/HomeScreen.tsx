
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trophy, User, Plus, ArrowRight, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

const HomeScreen = ({ onNavigate }: HomeScreenProps) => {
  const [points, setPoints] = useState(1250);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-yellow-100 p-2 rounded-full">
            <Trophy className="text-yellow-600" size={24} />
          </div>
          <div className="text-2xl font-bold text-gray-900 animate-pulse">
            {points.toLocaleString()}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <User className="text-purple-600" size={20} />
          </div>
          <span className="text-sm text-gray-600">citizen@ts.gov</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Report Problem Button */}
        <Card className="p-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer animate-pulse" 
              style={{ animationDuration: '3s' }}
              onClick={() => onNavigate('report')}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Report a Problem</h3>
              <p className="text-purple-100">Help improve your community</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <Plus size={24} />
            </div>
          </div>
        </Card>

        {/* Latest Report Progress */}
        <Card className="p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
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
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-2/3 animate-pulse"></div>
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
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in">
            <div className="text-2xl font-bold text-purple-600 mb-1">12</div>
            <div className="text-sm text-gray-600">Reported</div>
          </Card>
          
          <Card className="p-4 text-center rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in" 
                style={{ animationDelay: '0.2s' }}>
            <div className="text-2xl font-bold text-green-600 mb-1">8</div>
            <div className="text-sm text-gray-600">Solved</div>
          </Card>
          
          <Card className="p-4 text-center rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in" 
                style={{ animationDelay: '0.4s' }}>
            <div className="text-2xl font-bold text-yellow-600 mb-1">4.2</div>
            <div className="text-sm text-gray-600">Rating</div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="p-6 h-auto rounded-xl border-2 hover:bg-gray-50 transition-all duration-300"
            onClick={() => onNavigate('history')}
          >
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900 mb-1">History</div>
              <div className="text-sm text-gray-600">View past reports</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="p-6 h-auto rounded-xl border-2 hover:bg-gray-50 transition-all duration-300"
            onClick={() => onNavigate('map')}
          >
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900 mb-1">Map</div>
              <div className="text-sm text-gray-600">Area overview</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
