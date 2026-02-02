import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Phone, Calendar, ArrowLeft, Camera, X, Upload, ChevronLeft, ChevronRight, BarChart3 } from 'lucide-react';
import { testimonials as initialTestimonials } from '../data/cleanMockData';
import HustlerReviewForm from '../components/Hustlers/HustlerReviewForm';
import { useNotifications } from '../components/Notification';
import { getApiUrl, getAuthHeaders } from '../utils/api';
import { Hustler, Product, Testimonial } from '../types';


const HustlerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [hustler, setHustler] = useState<Hustler | null>(null);
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditImageModal, setShowEditImageModal] = useState(false);
  const [newProfileImage, setNewProfileImage] = useState<string>('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [editingProductImage, setEditingProductImage] = useState<Product | null>(null);
  const [showProductImageModal, setShowProductImageModal] = useState(false);
  const [productImageUpdates, setProductImageUpdates] = useState<string[]>([]);
  const [productImageIndex, setProductImageIndex] = useState<{ [key: string]: number }>({});
  const { showSuccess, showError } = useNotifications();
  
  // Check if current user is viewing their own profile
  const currentUserId = localStorage.getItem('currentHustlerId');
  const isOwnProfile = useMemo(() => {
    // Only show dashboard if user is logged in AND viewing their own profile
    if (!currentUserId) return false;
    if (!hustler || !hustler.id) return false;
    return String(currentUserId) === String(hustler.id);
  }, [currentUserId, hustler]);

  useEffect(() => {
    const fetchHustler = async () => {
      setLoading(true);
      try {
        const res = await fetch(getApiUrl('/api/hustlers'));
        if (!res.ok) {
          throw new Error(`Failed to fetch hustlers: ${res.status}`);
        }
        const data = await res.json();
        const found = data.find((h: Hustler) => String(h.id) === String(id));
        
        if (!found) {
          showError(
            'Profile Not Found',
            'The entrepreneur profile you are looking for does not exist.',
            5000
          );
          setHustler(null);
        } else {
          setHustler(found);
          // Initialize image indices for all products
          if (found.products) {
            const indices: { [key: string]: number } = {};
            found.products.forEach((product: Product) => {
              if (product.images && product.images.length > 0) {
                indices[product.id] = 0;
              }
            });
            setProductImageIndex(indices);
          }
        }
      } catch (err) {
        console.error('Error fetching hustler:', err);
        showError(
          'Error Loading Profile',
          'Failed to load the entrepreneur profile. Please try again later.',
          5000
        );
        setHustler(null);
      } finally {
        setLoading(false);
      }
    };
    fetchHustler();
  }, [id, showError]);

  const hustlerTestimonials = testimonials.filter((t: Testimonial) => t.hustler === hustler?.name);
  
  // Handle new review submission
  const handleReviewSubmit = async (review: { name: string; rating: number; comment: string }) => {
    if (!hustler) return;
    
    try {
      // Submit review to backend
      const res = await fetch(getApiUrl(`/api/hustlers/${hustler.id}/reviews`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
      });
      
      if (!res.ok) {
        throw new Error('Failed to submit review');
      }
      
      const newReview = await res.json();
      
      // Update local testimonials
      setTestimonials((prev: Testimonial[]) => [...prev, newReview]);
      
      // Refresh hustler data to get updated rating and review count
      const hustlerRes = await fetch(getApiUrl(`/api/hustlers/${hustler.id}`));
      const updatedHustler = await hustlerRes.json();
      setHustler(updatedHustler);
      
      // Show success notification
      showSuccess(
        'Review Submitted! 🎉',
        'Thank you for your feedback. Your review has been posted successfully.',
        5000
      );
    } catch (_err) {
      showError(
        'Review Submission Failed',
        'There was a problem submitting your review. Please try again.',
        5000
      );
    }
  };

  // Handle profile image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showError('Image too large', 'Please choose an image smaller than 5MB');
        return;
      }
      
      // Convert image to base64 so it can be stored permanently
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setNewProfileImage(base64String);
      };
      reader.onerror = () => {
        showError('Upload failed', 'There was an error reading your image. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  };

  // Save new profile image
  const handleSaveProfileImage = async () => {
    if (!hustler || !newProfileImage) return;
    
    setIsUploadingImage(true);
    try {
      // Only send the profileImage field to avoid sending the entire large object
      const updateData = {
        profileImage: newProfileImage
      };
      
      const res = await fetch(getApiUrl(`/api/hustlers/${hustler.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(updateData)
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `HTTP ${res.status}: Failed to update profile image`);
      }
      
      const updatedHustler = await res.json();
      setHustler(updatedHustler);
      setShowEditImageModal(false);
      setNewProfileImage('');
      
      showSuccess(
        'Profile Image Updated! 🎉',
        'Your profile picture has been updated successfully.',
        5000
      );
    } catch (err: unknown) {
      console.error('Error updating profile image:', err);
      showError(
        'Update Failed',
        err instanceof Error ? err.message : 'There was a problem updating your profile image. Please try again.',
        5000
      );
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Handle product image upload
  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showError('Image too large', 'Please choose an image smaller than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProductImageUpdates([...productImageUpdates, base64String]);
      };
      reader.onerror = () => {
        showError('Upload failed', 'There was an error reading your image. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  };

  // Save product image updates
  const handleSaveProductImages = async () => {
    if (!hustler || !editingProductImage) return;
    
    setIsUploadingImage(true);
    try {
      const updatedProducts = hustler.products.map((product: Product) => {
        if (product.id === editingProductImage.id) {
          return {
            ...product,
            images: productImageUpdates.length > 0 ? productImageUpdates : product.images
          };
        }
        return product;
      });

      const res = await fetch(getApiUrl(`/api/hustlers/${hustler.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({
          products: updatedProducts
        })
      });
      
      if (!res.ok) {
        throw new Error('Failed to update product images');
      }
      
      const updatedHustler = await res.json();
      setHustler(updatedHustler);
      setShowProductImageModal(false);
      setEditingProductImage(null);
      setProductImageUpdates([]);
      
      showSuccess(
        'Product Images Updated! 🎉',
        'Your product images have been updated successfully.',
        5000
      );
    } catch (err: unknown) {
      console.error('Error updating product images:', err);
      showError(
        'Update Failed',
        err instanceof Error ? err.message : 'There was a problem updating product images. Please try again.',
        5000
      );
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Open product image editor
  const handleEditProductImages = (product: Product) => {
    setEditingProductImage(product);
    setProductImageUpdates(product.images && product.images.length > 0 ? [...product.images] : []);
    setShowProductImageModal(true);
  };

  // Delete profile handler
  const handleDeleteProfile = async () => {
    setShowDeleteConfirm(false);
    try {
      if (!hustler) return;
      const res = await fetch(getApiUrl(`/api/hustlers/${hustler.id}`), {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (!res.ok) throw new Error('Failed to delete profile');
      showSuccess('Profile Deleted', 'Your profile has been deleted successfully.');
      setTimeout(() => {
        window.location.href = '/hustlers';
      }, 1500);
    } catch (_err) {
      showError('Delete Failed', 'There was a problem deleting your profile. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }
  if (!hustler) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Hustler Not Found</h1>
          <Link to="/hustlers" className="text-purple-600 hover:text-purple-700">
            ← Back to Hustlers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/hustlers"
          className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Hustlers
        </Link>

        <div className="max-w-4xl mx-auto">
          {/* Main Profile Content */}
          <div className="space-y-8">
            {/* Profile Header */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-64 bg-gradient-to-r from-purple-600 to-blue-600">
                <div className="absolute inset-0 bg-black/20"></div>
                {/* Badges and Featured label removed for a cleaner look */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-end space-x-6">
                    <div className="relative group">
                      {hustler.profileImage ? (
                        <img
                          src={hustler.profileImage}
                          alt={hustler.name}
                          className="w-24 h-24 rounded-full border-4 border-white object-cover"
                          onError={(e) => {
                            // If image fails to load, hide it and show default
                            const target = e.currentTarget as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full border-4 border-white bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">{hustler.name.charAt(0).toUpperCase()}</span>
                        </div>
                      )}
                      {/* Edit Image Button - Only visible to profile owner */}
                      {isOwnProfile && (
                        <button
                          onClick={() => {
                            setNewProfileImage(hustler.profileImage || '');
                            setShowEditImageModal(true);
                          }}
                          className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 transform hover:scale-110"
                          title="Edit Profile Picture"
                        >
                          <Camera className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    {/* Name removed from header for cleaner look */}
                  </div>
                </div>
              </div>

              {/* Name moved below header for clarity */}
              <div className="px-6 pt-6">
                <h1 className="text-3xl font-bold mb-2 text-gray-900">{hustler.name}</h1>
              </div>
              <div className="p-6 pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{hustler.rating}</span>
                    <span className="text-gray-500">({hustler.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700">{hustler.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700">Since {new Date(hustler.joinedDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">About</h3>
                  <p className="text-gray-700 leading-relaxed">{hustler.bio}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">University</h3>
                  <p className="text-gray-700">{hustler.university}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {hustler.services.map((service: string, index: number) => (
                      <span
                        key={index}
                        className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Pricing</h3>
                  <p className="text-2xl font-bold text-purple-600">{hustler.pricing}</p>
                </div>
              </div>
            </div>
            {/* Delete Profile Button - Only visible to profile owner */}
            {isOwnProfile && (
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition-all duration-200"
                >
                  Delete Profile
                </button>
              </div>
            )}

            {/* Custom Delete Confirmation Modal */}
            {showDeleteConfirm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full">
                  <h2 className="text-xl font-bold mb-4 text-red-700">Delete Profile?</h2>
                  <p className="mb-6 text-gray-700">Are you sure you want to delete your profile? This action cannot be undone.</p>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteProfile}
                      className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Products */}
            {hustler.products && hustler.products.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Available Products</h3>
                  <span className="text-sm text-gray-600">{hustler.products.length} {hustler.products.length === 1 ? 'product' : 'products'}</span>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-4" style={{ 
                  scrollbarWidth: 'thin',
                  WebkitOverflowScrolling: 'touch',
                  overflowY: 'hidden'
                }}>
                  {hustler.products.map((product: Product, index: number) => (
                    <div
                      key={product.id || index}
                      className="flex-shrink-0 w-80 min-w-[320px] bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 border border-pink-100 hover:shadow-lg transition-all duration-200 hover:scale-105 relative group"
                    >
                      <div className="relative mb-4">
                        {product.images && product.images.length > 0 ? (
                          <>
                            <div className="relative w-full h-40 overflow-hidden rounded-lg">
                              <img
                                src={product.images[productImageIndex[product.id] || 0]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.currentTarget as HTMLImageElement;
                                  target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                                }}
                              />
                              
                              {/* Image Navigation for Multiple Images */}
                              {product.images.length > 1 && (
                                <>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      const currentIndex = productImageIndex[product.id] || 0;
                                      const newIndex = (currentIndex - 1 + product.images.length) % product.images.length;
                                      setProductImageIndex(prev => ({ ...prev, [product.id]: newIndex }));
                                    }}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                                    aria-label="Previous image"
                                  >
                                    <ChevronLeft className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      const currentIndex = productImageIndex[product.id] || 0;
                                      const newIndex = (currentIndex + 1) % product.images.length;
                                      setProductImageIndex(prev => ({ ...prev, [product.id]: newIndex }));
                                    }}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                                    aria-label="Next image"
                                  >
                                    <ChevronRight className="h-4 w-4" />
                                  </button>
                                  
                                  {/* Image Indicators */}
                                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                                    {product.images.map((_: string, idx: number) => (
                                      <div
                                        key={idx}
                                        className={`h-1.5 rounded-full transition-all ${
                                          idx === (productImageIndex[product.id] || 0) ? 'bg-white w-6' : 'bg-white/50 w-1.5'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </>
                              )}
                              
                              {/* All Images Thumbnail Strip */}
                              {product.images.length > 1 && (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                                  <div className="flex gap-1.5 justify-center overflow-x-auto">
                                    {product.images.map((img: string, idx: number) => (
                                      <button
                                        key={idx}
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          setProductImageIndex(prev => ({ ...prev, [product.id]: idx }));
                                        }}
                                        className={`flex-shrink-0 w-10 h-10 rounded border-2 overflow-hidden ${
                                          idx === (productImageIndex[product.id] || 0) 
                                            ? 'border-white shadow-lg scale-110' 
                                            : 'border-white/50 opacity-70 hover:opacity-100'
                                        } transition-all`}
                                      >
                                        <img
                                          src={img}
                                          alt={`${product.name} ${idx + 1}`}
                                          className="w-full h-full object-cover"
                                        />
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                            <Camera className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium z-10 ${
                          product.inStock 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </div>
                        {/* Edit Image Button - Only visible to profile owner */}
                        {isOwnProfile && (
                          <button
                            onClick={() => handleEditProductImages(product)}
                            className="absolute top-2 left-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 shadow-lg transition-all duration-200 opacity-100 group-hover:opacity-100 z-10"
                            title="Edit Images"
                          >
                            <Camera className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      
                      <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-purple-600">{product.price}</span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {product.category}
                        </span>
                      </div>

                      {/* Image count indicator - only show if multiple images */}
                      {product.images && product.images.length > 1 && (
                        <div className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                          <Camera className="h-3 w-3" />
                          <span>
                            Image {productImageIndex[product.id] !== undefined 
                              ? `${(productImageIndex[product.id] || 0) + 1} of ${product.images.length}` 
                              : `${product.images.length}`}
                          </span>
                        </div>
                      )}
                      
                      <a
                        href={`https://wa.me/${hustler.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi! I'm interested in your ${product.name}. Is it still available?`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 text-sm font-medium flex items-center justify-center gap-2"
                      >
                        <Phone className="h-4 w-4" />
                        Order via WhatsApp
                      </a>
                    </div>
                  ))}
                </div>
                
                {hustler.products.filter((product: Product) => !product.inStock).length > 0 && (
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-4 text-gray-600">Currently Out of Stock</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {hustler.products.filter((product: Product) => !product.inStock).map((product: Product) => (
                        <div
                          key={product.id}
                          className="bg-gray-50 rounded-xl p-4 border border-gray-200 opacity-75"
                        >
                          <div className="relative mb-4">
                            {product.images && product.images.length > 0 ? (
                              <>
                                <div className="relative w-full h-40 overflow-hidden rounded-lg">
                                  <img
                                    src={product.images[productImageIndex[product.id] || 0]}
                                    alt={product.name}
                                    className="w-full h-40 object-cover rounded-lg grayscale"
                                    onError={(e) => {
                                      const target = e.currentTarget as HTMLImageElement;
                                      target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                                    }}
                                  />
                                  
                                  {/* Image Navigation for Multiple Images */}
                                  {product.images.length > 1 && (
                                    <>
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          const currentIndex = productImageIndex[product.id] || 0;
                                          const newIndex = (currentIndex - 1 + product.images.length) % product.images.length;
                                          setProductImageIndex(prev => ({ ...prev, [product.id]: newIndex }));
                                        }}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                                        aria-label="Previous image"
                                      >
                                        <ChevronLeft className="h-4 w-4" />
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          const currentIndex = productImageIndex[product.id] || 0;
                                          const newIndex = (currentIndex + 1) % product.images.length;
                                          setProductImageIndex(prev => ({ ...prev, [product.id]: newIndex }));
                                        }}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                                        aria-label="Next image"
                                      >
                                        <ChevronRight className="h-4 w-4" />
                                      </button>
                                      
                                      {/* Image Indicators */}
                                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                                        {product.images.map((_: string, idx: number) => (
                                          <div
                                            key={idx}
                                            className={`h-1.5 rounded-full transition-all ${
                                              idx === (productImageIndex[product.id] || 0) ? 'bg-white w-6' : 'bg-white/50 w-1.5'
                                            }`}
                                          />
                                        ))}
                                      </div>
                                      
                                      {/* All Images Thumbnail Strip */}
                                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                                        <div className="flex gap-1.5 justify-center overflow-x-auto">
                                          {product.images.map((img: string, idx: number) => (
                                            <button
                                              key={idx}
                                              onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setProductImageIndex(prev => ({ ...prev, [product.id]: idx }));
                                              }}
                                              className={`flex-shrink-0 w-10 h-10 rounded border-2 overflow-hidden grayscale ${
                                                idx === (productImageIndex[product.id] || 0) 
                                                  ? 'border-white shadow-lg scale-110' 
                                                  : 'border-white/50 opacity-70 hover:opacity-100'
                                              } transition-all`}
                                            >
                                              <img
                                                src={img}
                                                alt={`${product.name} ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                              />
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </>
                            ) : (
                              <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 grayscale">
                                <Camera className="h-8 w-8 text-gray-400" />
                              </div>
                            )}
                            <div className="absolute top-2 right-2 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium z-10">
                              Out of Stock
                            </div>
                            {/* Edit Image Button - Only visible to profile owner */}
                            {isOwnProfile && (
                              <button
                                onClick={() => handleEditProductImages(product)}
                                className="absolute top-2 left-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 shadow-lg transition-all duration-200 opacity-100 z-10"
                                title="Edit Images"
                              >
                                <Camera className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                          
                          <h4 className="font-semibold text-gray-700 mb-2">{product.name}</h4>
                          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-gray-500">{product.price}</span>
                            <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded">
                              {product.category}
                            </span>
                          </div>
                          
                          <button
                            onClick={() => {
                              const message = `Hi! When will your ${product.name} be back in stock?`;
                              window.open(`https://wa.me/${hustler.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
                            }}
                            className="w-full mt-4 bg-gray-400 text-white py-2 px-4 rounded-lg text-sm font-medium"
                          >
                            Ask About Availability
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Get in Touch Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
              
              <div className="space-y-4">
                {/* Dashboard Link - Only shown to the profile owner when logged in */}
                {(() => {
                  const loggedInUserId = localStorage.getItem('currentHustlerId');
                  const viewingOwnProfile = loggedInUserId && hustler && String(loggedInUserId) === String(hustler.id);
                  return viewingOwnProfile ? (
                    <Link
                      to={`/dashboard/${hustler.id}`}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium flex items-center justify-center space-x-2"
                    >
                      <BarChart3 className="h-5 w-5" />
                      <span>View My Dashboard</span>
                    </Link>
                  ) : null;
                })()}

                <a
                  href={`https://wa.me/${hustler.whatsapp.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <Phone className="h-5 w-5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Portfolio */}
            {hustler.portfolio.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Portfolio</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hustler.portfolio.map((image: string, index: number) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Portfolio ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Reviews</h3>
              <HustlerReviewForm hustlerId={hustler.id} onSubmit={handleReviewSubmit} />
              {hustlerTestimonials.length > 0 ? (
                <div className="space-y-4">
                  {hustlerTestimonials.map((testimonial: Testimonial) => (
                    <div key={testimonial.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-gray-500">{testimonial.university}</p>
                        </div>
                        <div className="flex items-center">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{testimonial.comment}</p>
                      <p className="text-sm text-gray-500 mt-1">{new Date(testimonial.date).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-sm">No reviews yet. Be the first to leave one!</div>
              )}
            </div>
          </div>
        </div>

        {/* Edit Product Images Modal - Only accessible to profile owner */}
        {isOwnProfile && showProductImageModal && editingProductImage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold">Edit Product Images</h3>
                  <p className="text-sm text-gray-600 mt-1">{editingProductImage.name}</p>
                </div>
                <button
                  onClick={() => {
                    setShowProductImageModal(false);
                    setEditingProductImage(null);
                    setProductImageUpdates([]);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Current Images Preview */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Product Images ({productImageUpdates.length})
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {productImageUpdates.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50">
                          {image.startsWith('data:image') || image.startsWith('http') ? (
                            <img
                              src={image}
                              alt={`Product ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.currentTarget as HTMLImageElement;
                                target.src = 'https://via.placeholder.com/150';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <Camera className="h-8 w-8" />
                            </div>
                          )}
                        </div>
                        {/* Delete Image Button */}
                        <button
                          type="button"
                          onClick={() => {
                            setProductImageUpdates(productImageUpdates.filter((_, i) => i !== index));
                          }}
                          className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          title="Delete image"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    
                    {/* Add Image Button */}
                    <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-colors">
                      <div className="text-center">
                        <Upload className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                        <span className="text-xs text-gray-500">Add</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProductImageUpload}
                      />
                    </label>
                  </div>
                </div>

                {/* Upload via URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Or Add Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="Paste image URL here (e.g., https://example.com/image.jpg)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    onBlur={(e) => {
                      const url = e.target.value.trim();
                      if (url) {
                        setProductImageUpdates([...productImageUpdates, url]);
                        e.target.value = '';
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const target = e.target as HTMLInputElement;
                        const url = target.value.trim();
                        if (url) {
                          setProductImageUpdates([...productImageUpdates, url]);
                          target.value = '';
                        }
                      }
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-2">Press Enter or click outside to add URL</p>
                </div>

                {productImageUpdates.length === 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800 text-center">
                      💡 Add at least one image to showcase your product!
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => {
                      setShowProductImageModal(false);
                      setEditingProductImage(null);
                      setProductImageUpdates([]);
                    }}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProductImages}
                    disabled={productImageUpdates.length === 0 || isUploadingImage}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                  >
                    {isUploadingImage ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Profile Image Modal - Only accessible to profile owner */}
        {isOwnProfile && showEditImageModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Edit Profile Picture</h3>
                <button
                  onClick={() => {
                    setShowEditImageModal(false);
                    setNewProfileImage('');
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Preview */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center overflow-hidden shadow-lg border-4 border-purple-200">
                      {newProfileImage ? (
                        <img
                          src={newProfileImage}
                          alt="Profile preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Camera className="w-16 h-16 text-white" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Upload Button */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Choose New Image
                  </label>
                  <label className="cursor-pointer inline-flex items-center px-6 py-3 border-2 border-purple-300 text-purple-700 rounded-xl hover:bg-purple-50 transition-colors font-medium w-full justify-center">
                    <Camera className="h-5 w-5 mr-2" />
                    Select Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    JPG, PNG, or GIF (max 5MB)
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowEditImageModal(false);
                      setNewProfileImage('');
                    }}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfileImage}
                    disabled={!newProfileImage || isUploadingImage}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                  >
                    {isUploadingImage ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default HustlerProfile;