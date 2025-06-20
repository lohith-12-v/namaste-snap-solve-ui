
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, MapPin, Camera, Mic, Check, Construction, Droplets, Zap, Shield } from 'lucide-react';

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
    { 
      name: 'Roads & Transport', 
      icon: Construction,
      subcategories: ['Potholes', 'Broken Traffic Lights', 'Missing Signs'],
      image: '🚧'
    },
    { 
      name: 'Water & Sanitation', 
      icon: Droplets,
      subcategories: ['Water Leakage', 'Drainage Issues', 'Garbage Collection'],
      image: '💧'
    },
    { 
      name: 'Electricity', 
      icon: Zap,
      subcategories: ['Street Lights', 'Power Outage', 'Damaged Poles'],
      image: '⚡'
    },
    { 
      name: 'Public Safety', 
      icon: Shield,
      subcategories: ['Unsafe Areas', 'Vandalism', 'Missing Security'],
      image: '🛡️'
    }
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        onNavigate('home');
      }, 6000);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center relative overflow-hidden px-4">
        {/* Enhanced Confetti Animation */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-3 h-3 rounded-full animate-bounce ${
                i % 3 === 0 ? 'bg-gray-900 dark:bg-gray-100' : 
                i % 3 === 1 ? 'bg-gray-700 dark:bg-gray-300' : 
                'bg-gray-500 dark:bg-gray-500'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.5 + Math.random()}s`
              }}
            />
          ))}
        </div>

        <Card className="p-6 md:p-8 rounded-2xl shadow-xl text-center max-w-sm mx-auto bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 relative z-10">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <Check className="text-gray-900 dark:text-gray-100" size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Report Submitted!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm md:text-base">
            Your report has been successfully submitted. We'll keep you updated on the progress.
          </p>
          <div className="text-4xl mb-4">🎉</div>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-500">
            Redirecting to home in a few seconds...
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : onNavigate('home')}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">Report Problem</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Step {currentStep} of 4</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 md:px-6 py-4">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gray-900 dark:bg-gray-100 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-4 md:p-6 max-w-2xl mx-auto">
        {/* Step 1: Location */}
        {currentStep === 1 && (
          <Card className="p-4 md:p-6 rounded-2xl shadow-md space-y-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Location</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">Where is the problem located?</p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                <Input
                  placeholder="Current location (Auto-detected)"
                  value="Jubilee Hills, Hyderabad"
                  className="pl-12 py-3 rounded-xl border-2 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  readOnly
                />
              </div>

              <Input
                placeholder="Nearby landmark"
                value={formData.landmark}
                onChange={(e) => setFormData(prev => ({ ...prev, landmark: e.target.value }))}
                className="py-3 rounded-xl border-2 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />

              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700"></div>
                <div className="relative z-10 bg-gray-900 dark:bg-gray-100 w-4 h-4 rounded-full animate-bounce"></div>
                <div className="absolute bottom-2 right-2 text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded">
                  Tap to adjust pin
                </div>
              </div>
            </div>

            <Button
              onClick={() => setCurrentStep(2)}
              className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-gray-900 py-3 rounded-xl"
              disabled={!formData.landmark}
            >
              Next: Problem Type
            </Button>
          </Card>
        )}

        {/* Step 2: Problem Type */}
        {currentStep === 2 && (
          <Card className="p-4 md:p-6 rounded-2xl shadow-md space-y-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Problem Type</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">What kind of issue are you reporting?</p>
            </div>

            <div className="space-y-3">
              {categories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <div key={category.name} className="space-y-2">
                    <Button
                      variant={formData.category === category.name ? "default" : "outline"}
                      className={`w-full p-4 rounded-xl text-left justify-start transition-all duration-300 ${
                        formData.category === category.name 
                          ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600'
                      }`}
                      onClick={() => setFormData(prev => ({ 
                        ...prev, 
                        category: category.name, 
                        subcategory: '' 
                      }))}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <span className="text-2xl">{category.image}</span>
                        </div>
                        <div>
                          <span className="font-medium text-sm md:text-base">{category.name}</span>
                          <div className="flex items-center space-x-2 mt-1">
                            <IconComponent size={16} className="text-gray-600 dark:text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </Button>

                    {formData.category === category.name && (
                      <div className="ml-6 space-y-2 animate-fade-in">
                        {category.subcategories.map((sub) => (
                          <Button
                            key={sub}
                            variant={formData.subcategory === sub ? "default" : "outline"}
                            className={`w-full p-3 rounded-lg text-left justify-start text-sm ${
                              formData.subcategory === sub 
                                ? 'bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900' 
                                : 'hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600'
                            }`}
                            onClick={() => setFormData(prev => ({ ...prev, subcategory: sub }))}
                          >
                            {sub}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <Button
              onClick={() => setCurrentStep(3)}
              className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-gray-900 py-3 rounded-xl"
              disabled={!formData.subcategory}
            >
              Next: Description
            </Button>
          </Card>
        )}

        {/* Step 3: Description */}
        {currentStep === 3 && (
          <Card className="p-4 md:p-6 rounded-2xl shadow-md space-y-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Description</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">Please describe the problem in detail</p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Textarea
                  placeholder="Describe the problem, its impact, and any other relevant details..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-32 rounded-xl border-2 resize-none bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  maxLength={250}
                />
                <div className="absolute bottom-3 right-3 text-sm text-gray-500 dark:text-gray-400">
                  {formData.description.length}/250
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full p-3 rounded-xl border-2 border-dashed hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              >
                <Mic className="mr-2" size={20} />
                Voice to Text
              </Button>
            </div>

            <Button
              onClick={() => setCurrentStep(4)}
              className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-gray-900 py-3 rounded-xl"
              disabled={formData.description.length < 10}
            >
              Next: Add Photos
            </Button>
          </Card>
        )}

        {/* Step 4: Photos */}
        {currentStep === 4 && (
          <Card className="p-4 md:p-6 rounded-2xl shadow-md space-y-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Add Photos</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">Photos help us understand the problem better</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer transition-all duration-300"
                >
                  <div className="text-center">
                    <Camera className="mx-auto mb-2 text-gray-400 dark:text-gray-500" size={20} />
                    <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Add Photo {i}</span>
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-gray-900 py-3 rounded-xl transition-all duration-300"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white dark:border-gray-900 border-t-transparent rounded-full animate-spin mr-2" />
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
