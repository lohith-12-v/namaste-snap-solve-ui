
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, MapPin, Filter } from 'lucide-react';

interface MapScreenProps {
  onNavigate: (screen: string) => void;
}

const MapScreen = ({ onNavigate }: MapScreenProps) => {
  const reports = [
    { id: 1, lat: 17.4239, lng: 78.4738, type: 'streetlight', status: 'pending' },
    { id: 2, lat: 17.4249, lng: 78.4748, type: 'pothole', status: 'resolved' },
    { id: 3, lat: 17.4229, lng: 78.4728, type: 'water', status: 'review' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={24} />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Area Map</h1>
            <p className="text-sm text-gray-600">Reports in your area</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="p-2 rounded-full"
        >
          <Filter size={20} />
        </Button>
      </div>

      <div className="relative">
        {/* Map Container */}
        <div className="h-96 bg-gradient-to-br from-blue-200 via-green-200 to-blue-300 relative overflow-hidden">
          {/* Current Location Pin */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative">
              <MapPin className="text-purple-600 animate-bounce" size={32} />
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-purple-600 rounded-full"></div>
            </div>
          </div>

          {/* Report Markers */}
          {reports.map((report, index) => (
            <div
              key={report.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform duration-200"
              style={{
                top: `${40 + index * 10}%`,
                left: `${45 + index * 8}%`,
              }}
            >
              <div className={`w-4 h-4 rounded-full ${
                report.status === 'resolved' ? 'bg-green-500' :
                report.status === 'review' ? 'bg-yellow-500' : 'bg-red-500'
              } animate-pulse`}>
                <div className={`absolute inset-0 rounded-full ${
                  report.status === 'resolved' ? 'bg-green-500' :
                  report.status === 'review' ? 'bg-yellow-500' : 'bg-red-500'
                } opacity-30 animate-ping`}></div>
              </div>
            </div>
          ))}

          {/* Map Controls */}
          <div className="absolute bottom-4 right-4 space-y-2">
            <Button className="w-10 h-10 p-0 rounded-full bg-white text-gray-700 shadow-lg hover:bg-gray-50">
              +
            </Button>
            <Button className="w-10 h-10 p-0 rounded-full bg-white text-gray-700 shadow-lg hover:bg-gray-50">
              -
            </Button>
          </div>
        </div>

        {/* Legend */}
        <Card className="absolute bottom-4 left-4 p-4 bg-white/90 backdrop-blur rounded-xl shadow-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Legend</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Pending</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Under Review</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Resolved</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Nearby Reports */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Nearby Reports</h3>
        <div className="space-y-3">
          {reports.map((report) => (
            <Card key={report.id} className="p-4 rounded-xl hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  report.status === 'resolved' ? 'bg-green-500' :
                  report.status === 'review' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 capitalize">{report.type} Issue</div>
                  <div className="text-sm text-gray-600">0.{report.id}km away</div>
                </div>
                <div className="text-xs text-gray-500 capitalize">{report.status}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapScreen;
