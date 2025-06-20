
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Clock, AlertCircle, Share, Calendar, MapPin } from 'lucide-react';

interface HistoryScreenProps {
  onNavigate: (screen: string) => void;
}

const HistoryScreen = ({ onNavigate }: HistoryScreenProps) => {
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');

  const reports = [
    {
      id: 1,
      title: 'Broken streetlight',
      category: 'Electricity',
      summary: 'Street light not working on Road No. 12, Jubilee Hills',
      status: 'Under Review',
      date: '2 days ago',
      location: 'Jubilee Hills, Road No. 12',
      priority: 'medium',
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
      category: 'Roads & Transport',
      summary: 'Large pothole causing traffic issues near Metro station',
      status: 'Resolved',
      date: '1 week ago',
      location: 'Metro Station Road',
      priority: 'high',
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
      category: 'Water & Sanitation',
      summary: 'Continuous water leakage from main pipe',
      status: 'Pending',
      date: '3 days ago',
      location: 'Banjara Hills, Main Road',
      priority: 'low',
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
      case 'Resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Pending': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const getStatusIcon = (status: string, completed: boolean) => {
    if (completed) return <CheckCircle className="text-green-500" size={20} />;
    if (status === 'Under Review') return <Clock className="text-yellow-500" size={20} />;
    return <AlertCircle className="text-gray-300" size={20} />;
  };

  const filteredReports = reports.filter(report => {
    if (filter === 'all') return true;
    return report.status.toLowerCase().replace(' ', '') === filter;
  });

  if (selectedReport) {
    const report = reports.find(r => r.id === selectedReport);
    
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setSelectedReport(null)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ArrowLeft size={24} />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">{report?.title}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Report Details</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Share size={24} />
          </Button>
        </div>

        <div className="p-4 md:p-6 space-y-6">
          {/* Report Overview */}
          <Card className="p-4 md:p-6 rounded-2xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{report?.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{report?.summary}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <MapPin size={16} />
                    <span>{report?.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span>{report?.date}</span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report?.status || '')}`}>
                {report?.status}
              </span>
            </div>
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          </Card>

          {/* Timeline */}
          <Card className="p-4 md:p-6 rounded-2xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Progress Timeline</h3>
            <div className="space-y-4">
              {report?.timeline.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  {getStatusIcon(item.status, item.completed)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${item.completed ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                        {item.status}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{item.date}</span>
                    </div>
                    {index < report.timeline.length - 1 && (
                      <div className={`w-0.5 h-6 ml-2.5 mt-2 ${item.completed ? 'bg-green-200 dark:bg-green-800' : 'bg-gray-200 dark:bg-gray-700'}`} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Comments Section */}
          <Card className="p-4 md:p-6 rounded-2xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Updates & Comments</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-gray-900 dark:text-white">GHMC Official</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">1 day ago</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Thank you for reporting this issue. Our team has been assigned and will begin work shortly.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm px-4 md:px-6 py-4 flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={() => onNavigate('home')}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ArrowLeft size={24} />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Report History</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Your submitted reports</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 md:px-6 py-4">
        <div className="flex space-x-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          {['all', 'pending', 'underreview', 'resolved'].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize ${
                filter === filterOption
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {filterOption === 'underreview' ? 'Under Review' : filterOption}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-4">
        {filteredReports.map((report) => (
          <Card 
            key={report.id}
            className={`p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 ${getPriorityColor(report.priority)} bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700`}
            onClick={() => setSelectedReport(report.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{report.title}</h3>
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                    {report.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">{report.summary}</p>
                <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <MapPin size={12} />
                    <span>{report.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={12} />
                    <span>{report.date}</span>
                  </div>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)} ml-4`}>
                {report.status}
              </span>
            </div>
          </Card>
        ))}
        
        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No reports found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your filter or submit a new report.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryScreen;
