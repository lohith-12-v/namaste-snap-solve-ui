
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Clock, AlertCircle, Share } from 'lucide-react';

interface HistoryScreenProps {
  onNavigate: (screen: string) => void;
}

const HistoryScreen = ({ onNavigate }: HistoryScreenProps) => {
  const [selectedReport, setSelectedReport] = useState<number | null>(null);

  const reports = [
    {
      id: 1,
      title: 'Broken streetlight',
      summary: 'Street light not working on Road No. 12, Jubilee Hills',
      status: 'Under Review',
      date: '2 days ago',
      image: '/placeholder.svg',
      timeline: [
        { status: 'Reported', date: '2 days ago', completed: true },
        { status: 'Under Review', date: '1 day ago', completed: true },
        { status: 'Work Assigned', date: 'Pending', completed: false },
        { status: 'Resolved', date: 'Pending', completed: false }
      ]
    },
    {
      id: 2,
      title: 'Pothole on main road',
      summary: 'Large pothole causing traffic issues near Metro station',
      status: 'Resolved',
      date: '1 week ago',
      image: '/placeholder.svg',
      timeline: [
        { status: 'Reported', date: '1 week ago', completed: true },
        { status: 'Under Review', date: '5 days ago', completed: true },
        { status: 'Work Assigned', date: '3 days ago', completed: true },
        { status: 'Resolved', date: '1 day ago', completed: true }
      ]
    },
    {
      id: 3,
      title: 'Water leakage',
      summary: 'Continuous water leakage from main pipe',
      status: 'Pending',
      date: '3 days ago',
      image: '/placeholder.svg',
      timeline: [
        { status: 'Reported', date: '3 days ago', completed: true },
        { status: 'Under Review', date: 'Pending', completed: false },
        { status: 'Work Assigned', date: 'Pending', completed: false },
        { status: 'Resolved', date: 'Pending', completed: false }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string, completed: boolean) => {
    if (completed) return <CheckCircle className="text-green-500" size={20} />;
    if (status === 'Under Review') return <Clock className="text-yellow-500" size={20} />;
    return <AlertCircle className="text-gray-300" size={20} />;
  };

  if (selectedReport) {
    const report = reports.find(r => r.id === selectedReport);
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setSelectedReport(null)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft size={24} />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{report?.title}</h1>
              <p className="text-sm text-gray-600">Report Details</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Share size={24} />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Report Image */}
          <Card className="p-4 rounded-2xl">
            <div className="aspect-video bg-gray-200 rounded-xl mb-4"></div>
            <p className="text-gray-600">{report?.summary}</p>
          </Card>

          {/* Timeline */}
          <Card className="p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Progress Timeline</h3>
            <div className="space-y-4">
              {report?.timeline.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  {getStatusIcon(item.status, item.completed)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${item.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                        {item.status}
                      </span>
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                    {index < report.timeline.length - 1 && (
                      <div className={`w-0.5 h-6 ml-2.5 mt-2 ${item.completed ? 'bg-green-200' : 'bg-gray-200'}`} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Comments Section */}
          <Card className="p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Updates & Comments</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">GHMC Official</span>
                  <span className="text-sm text-gray-500">1 day ago</span>
                </div>
                <p className="text-gray-700">Thank you for reporting this issue. Our team has been assigned and will begin work shortly.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={() => onNavigate('home')}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={24} />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Report History</h1>
          <p className="text-sm text-gray-600">Your submitted reports</p>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {reports.map((report) => (
          <Card 
            key={report.id}
            className="p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedReport(report.id)}
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-xl flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">{report.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{report.summary}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">{report.date}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HistoryScreen;
