
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Camera, User, MapPin, Mail, CreditCard, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface ProfileDetailsScreenProps {
  onNavigate: (screen: string) => void;
}

const ProfileDetailsScreen = ({ onNavigate }: ProfileDetailsScreenProps) => {
  const { profile, updateProfile } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    address: profile?.address || '',
    email: profile?.email || '',
    aadhaar: profile?.aadhaar || ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await updateProfile(formData);
      if (error) {
        toast.error('Failed to update profile');
        console.error('Update error:', error);
      } else {
        toast.success('Profile updated successfully');
        setIsEditing(false);
      }
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Update error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: profile?.name || '',
      address: profile?.address || '',
      email: profile?.email || '',
      aadhaar: profile?.aadhaar || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('settings')}
            className="mr-4 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
            {t('profile_details')}
          </h1>
        </div>
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-gray-900 hover:bg-gray-800 text-white"
          >
            Edit
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={loading}
              className="bg-gray-900 hover:bg-gray-800 text-white"
            >
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        )}
      </div>

      <div className="p-4 md:p-6 space-y-6 max-w-2xl mx-auto">
        {/* Profile Photo Section */}
        <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile?.profile_photo_url || "/placeholder.svg"} alt={profile?.name} />
                <AvatarFallback className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-2xl">
                  {profile?.name?.charAt(0)?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-gray-900 text-white rounded-full p-2 hover:bg-gray-800 transition-colors">
                  <Camera size={16} />
                </button>
              )}
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{profile?.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">{profile?.email}</p>
            </div>
          </div>
        </Card>

        {/* Profile Details */}
        <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <User size={16} />
                <span>{t('full_name')}</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              ) : (
                <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-lg">
                  {profile?.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Mail size={16} />
                <span>{t('email_address')}</span>
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              ) : (
                <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-lg">
                  {profile?.email}
                </p>
              )}
            </div>

            {/* Aadhaar */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <CreditCard size={16} />
                <span>{t('aadhaar_number')}</span>
              </label>
              <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-lg">
                {profile?.aadhaar ? `****-****-${profile.aadhaar.slice(-4)}` : 'Not provided'}
              </p>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <MapPin size={16} />
                <span>{t('address')}</span>
              </label>
              {isEditing ? (
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none"
                />
              ) : (
                <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-lg">
                  {profile?.address}
                </p>
              )}
            </div>

            {/* Password Change Button */}
            <div className="pt-4">
              <Button
                variant="outline"
                className="w-full flex items-center space-x-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Lock size={16} />
                <span>Change Password</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfileDetailsScreen;
