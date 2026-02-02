import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Save, Camera, X, Upload, Plus } from 'lucide-react';
import { useNotifications } from '../components/Notification';
import { getApiUrl, getAuthHeaders } from '../utils/api';
import { Hustler } from '../types';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hustlerId = searchParams.get('id') || localStorage.getItem('currentHustlerId');
  const { showSuccess, showError } = useNotifications();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hustler, setHustler] = useState<Hustler | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    university: '',
    category: '',
    location: '',
    bio: '',
    profileImage: '',
    whatsapp: '',
    services: [] as string[],
    pricing: ''
  });
  
  const [newService, setNewService] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    const fetchHustler = async () => {
      if (!hustlerId) {
        showError('Error', 'No profile ID provided. Please access this page from your dashboard.');
        navigate('/');
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(getApiUrl('/api/hustlers'));
        const data = await res.json();
        const found = data.find((h: Hustler) => String(h.id) === String(hustlerId));
        
        if (!found) {
          showError('Profile Not Found', 'The profile you are trying to edit does not exist.');
          navigate('/');
          return;
        }
        
        setHustler(found);
        setFormData({
          name: found.name || '',
          university: found.university || '',
          category: found.category || '',
          location: found.location || '',
          bio: found.bio || '',
          profileImage: found.profileImage || '',
          whatsapp: found.whatsapp || '',
          services: found.services || [],
          pricing: found.pricing || ''
        });
        setImagePreview(found.profileImage || '');
      } catch (err) {
        console.error('Error fetching hustler:', err);
        showError('Error', 'Failed to load profile data. Please try again.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    
    fetchHustler();
  }, [hustlerId, navigate, showError]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddService = () => {
    if (newService.trim() && !formData.services.includes(newService.trim())) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, newService.trim()]
      }));
      setNewService('');
    }
  };

  const handleRemoveService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData(prev => ({
          ...prev,
          profileImage: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImagePreview(url);
    setFormData(prev => ({
      ...prev,
      profileImage: url
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hustler) return;

    // Validation
    if (!formData.name.trim()) {
      showError('Validation Error', 'Name is required.');
      return;
    }
    
    if (!formData.bio.trim()) {
      showError('Validation Error', 'Bio is required.');
      return;
    }

    setSaving(true);
    try {
      const updatedHustler = {
        ...hustler,
        ...formData,
        updatedDate: new Date().toISOString().split('T')[0]
      };

      const res = await fetch(getApiUrl(`/api/hustlers/${hustler.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(updatedHustler)
      });

      if (res.ok) {
        showSuccess(
          'Profile Updated! ✨',
          'Your profile has been successfully updated.',
          4000
        );
        setTimeout(() => {
          navigate(`/dashboard/${hustler.id}`);
        }, 1500);
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      showError('Update Failed', 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!hustler) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(`/dashboard/${hustler.id}`)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
          <p className="text-gray-600 mt-2">Update your profile information and services</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
          {/* Profile Image */}
          <div className="border-b border-gray-200 pb-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Profile Picture
            </label>
            <div className="flex items-start space-x-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center overflow-hidden shadow-lg border-4 border-purple-200">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="w-16 h-16 text-white" />
                  )}
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={formData.profileImage}
                    onChange={handleImageUrlChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-2">
                University
              </label>
              <input
                type="text"
                id="university"
                name="university"
                value={formData.university}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp Number
              </label>
              <input
                type="text"
                id="whatsapp"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleInputChange}
                placeholder="+1234567890"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="pricing" className="block text-sm font-medium text-gray-700 mb-2">
                Pricing
              </label>
              <input
                type="text"
                id="pricing"
                name="pricing"
                value={formData.pricing}
                onChange={handleInputChange}
                placeholder="e.g., Starting from $10"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
              Bio <span className="text-red-500">*</span>
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              required
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              placeholder="Tell us about yourself and your services..."
            />
          </div>

          {/* Services */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Services
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddService();
                  }
                }}
                placeholder="Add a service"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleAddService}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.services.map((service, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                >
                  {service}
                  <button
                    type="button"
                    onClick={() => handleRemoveService(index)}
                    className="ml-2 text-purple-600 hover:text-purple-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))}
              {formData.services.length === 0 && (
                <p className="text-gray-500 text-sm">No services added yet. Add your first service above.</p>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate(`/dashboard/${hustler.id}`)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

