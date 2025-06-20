
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, MapPin, Camera, Mic, Check } from 'lucide-react';

interface ReportScreenProps {
  onNavigate: (screen: string) => void;
}

const ReportScreen = ({ onNavigate }: ReportScreenProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    landmark: '',
    category: '',
    subcategory: '',
    description: '',
    photos: []
  });

  const categories = [
    { name: 'Roads & Transport', subcategories: ['Potholes', 'Broken Traffic Lights', 'Missing Signs'] },
    { name: 'Water & Sanitation', subcategories: ['Water Leakage', 'Drainage Issues', 'Garbage Collection'] },
    { name: 'Electricity', subcategories: ['Street Lights', 'Power Outage', 'Damaged Poles'] },
    { name: 'Public Safety', subcategories: ['Unsafe Areas', 'Vandalism', 'Missing Security'] }
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Auto navigate after 6 seconds
      setTimeout(() => {
        onNavigate('home');
      }, 6000);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center relative overflow-hidden">
        {/* Confetti Animation */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-500 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            />
          ))}
        </div>

        <Card className="p-8 rounded-2xl shadow-xl text-center max-w-sm mx-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <Check className="text-green-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Report Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your report has been successfully submitted. We'll keep you updated on the progress.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to home in a few seconds...
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : onNavigate('home')}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={24} />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Report Problem</h1>
            <p className="text-sm text-gray-600">Step {currentStep} of 4</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-6">
        {/* Step 1: Location */}
        {currentStep === 1 && (
          <Card className="p-6 rounded-2xl shadow-md space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Location</h2>
              <p className="text-gray-600">Where is the problem located?</p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Current location (Auto-detected)"
                  value="Jubilee Hills, Hyderabad"
                  className="pl-12 py-3 rounded-xl border-2"
                  readOnly
                />
              </div>

              <Input
                placeholder="Nearby landmark"
                value={formData.landmark}
                onChange={(e) => setFormData(prev => ({ ...prev, landmark: e.target.value }))}
                className="py-3 rounded-xl border-2"
              />

              {/* Mini Map Placeholder */}
              <div className="h-32 bg-gray-200 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-green-200"></div>
                <div className="relative z-10 bg-purple-600 w-4 h-4 rounded-full animate-bounce"></div>
                <div className="absolute bottom-2 right-2 text-xs text-gray-600 bg-white px-2 py-1 rounded">
                  Tap to adjust pin
                </div>
              </div>
            </div>

            <Button
              onClick={() => setCurrentStep(2)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl"
              disabled={!formData.landmark}
            >
              Next: Problem Type
            </Button>
          </Card>
        )}

        {/* Step 2: Problem Type */}
        {currentStep === 2 && (
          <Card className="p-6 rounded-2xl shadow-md space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Problem Type</h2>
              <p className="text-gray-600">What kind of issue are you reporting?</p>
            </div>

            <div className="space-y-3">
              {categories.map((category, index) => (
                <div key={category.name} className="space-y-2">
                  <Button
                    variant={formData.category === category.name ? "default" : "outline"}
                    className={`w-full p-4 rounded-xl text-left justify-start transition-all duration-300 ${
                      formData.category === category.name ? 'bg-purple-600 text-white' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setFormData(prev => ({ 
                      ...prev, 
                      category: category.name, 
                      subcategory: '' 
                    }))}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-bold">{index + 1}</span>
                      </div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                  </Button>

                  {/* Subcategories */}
                  {formData.category === category.name && (
                    <div className="ml-6 space-y-2 animate-fade-in">
                      {category.subcategories.map((sub) => (
                        <Button
                          key={sub}
                          variant={formData.subcategory === sub ? "default" : "outline"}
                          className={`w-full p-3 rounded-lg text-left justify-start ${
                            formData.subcategory === sub ? 'bg-purple-500 text-white' : 'hover:bg-gray-50'
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, subcategory: sub }))}
                        >
                          {sub}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Button
              onClick={() => setCurrentStep(3)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl"
              disabled={!formData.subcategory}
            >
              Next: Description
            </Button>
          </Card>
        )}

        {/* Step 3: Description */}
        {currentStep === 3 && (
          <Card className="p-6 rounded-2xl shadow-md space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Description</h2>
              <p className="text-gray-600">Please describe the problem in detail</p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Textarea
                  placeholder="Describe the problem, its impact, and any other relevant details..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-32 rounded-xl border-2 resize-none"
                  maxLength={250}
                />
                <div className="absolute bottom-3 right-3 text-sm text-gray-500">
                  {formData.description.length}/250
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full p-3 rounded-xl border-2 border-dashed hover:bg-gray-50"
              >
                <Mic className="mr-2" size={20} />
                Voice to Text
              </Button>
            </div>

            <Button
              onClick={() => setCurrentStep(4)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl"
              disabled={formData.description.length < 10}
            >
              Next: Add Photos
            </Button>
          </Card>
        )}

        {/* Step 4: Photos */}
        {currentStep === 4 && (
          <Card className="p-6 rounded-2xl shadow-md space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Photos</h2>
              <p className="text-gray-600">Photos help us understand the problem better</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-50 cursor-pointer transition-all duration-300"
                >
                  <div className="text-center">
                    <Camera className="mx-auto mb-2 text-gray-400" size={24} />
                    <span className="text-sm text-gray-500">Add Photo {i}</span>
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl transition-all duration-300"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting...
                </div>
              ) : (
                'Submit Report'
              )}
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ReportScreen;
