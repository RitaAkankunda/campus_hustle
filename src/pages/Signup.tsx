import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Camera, ArrowLeft, ArrowRight, Sparkles, Star, Heart, Zap, CheckCircle, Upload, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useNotifications } from '../components/Notification';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
}

const categories = [
  { id: '1', name: 'Beauty & Hair', icon: '💇‍♀️', color: 'from-purple-500 to-pink-500' },
  { id: '2', name: 'Tech & Design', icon: '💻', color: 'from-blue-500 to-cyan-500' },
  { id: '3', name: 'Snacks & Treats', icon: '🍰', color: 'from-yellow-500 to-orange-500' },
  { id: '4', name: 'Events & Photography', icon: '📸', color: 'from-indigo-500 to-purple-500' },
  { id: '5', name: 'Academics', icon: '📚', color: 'from-green-500 to-teal-500' },
  { id: '6', name: 'Totebag & Accessories', icon: '👜', color: 'from-pink-500 to-rose-500' },
];

const hallBlocks = ['Block A', 'Block B', 'Block C', 'Block D'];

const Signup: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    hallBlock: '',
    category: '',
    bio: '',
    priceRange: '',
    profilePicture: '',
  });
  const [products, setProducts] = useState<Product[]>([]);
  const { showSuccess, showError } = useNotifications();
  const navigate = useNavigate();

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
        setFormData((prev) => ({ ...prev, profilePicture: base64String }));
      };
      reader.onerror = () => {
        showError('Upload failed', 'There was an error reading your image. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  };

  const addQuickProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: '',
      description: '',
      price: '',
      images: [],
    };
    setProducts([...products, newProduct]);
  };

  const removeProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const updateProduct = (id: string, field: keyof Product, value: string | string[]) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  // Handle product image upload
  const handleProductImageUpload = (productId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showError('Image too large', 'Please choose an image smaller than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const product = products.find(p => p.id === productId);
        if (product) {
          updateProduct(productId, 'images', [...product.images, base64String]);
        }
      };
      reader.onerror = () => {
        showError('Upload failed', 'There was an error reading your image. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove product image
  const removeProductImage = (productId: string, imageIndex: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      const updatedImages = product.images.filter((_, idx) => idx !== imageIndex);
      updateProduct(productId, 'images', updatedImages);
    }
  };

  // State for product image carousel
  const [productImageIndex, setProductImageIndex] = useState<{ [key: string]: number }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const hustler = {
      name: formData.fullName,
      university: 'Makerere University',
      category: formData.category,
      location: `Mary Stuart Hall - ${formData.hallBlock}`,
      bio: formData.bio || `Check out my amazing ${formData.category} services!`,
      profileImage: formData.profilePicture || '',
      whatsapp: formData.whatsapp,
      rating: 5,
      reviewCount: 0,
      portfolio: [],
      featured: false,
      joinedDate: new Date().toISOString(),
      services: products.map((p) => p.name).filter(Boolean),
      pricing: formData.priceRange || 'Contact for pricing',
      products: products.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        category: formData.category,
        images: p.images,
        inStock: true,
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
      })),
    };

    try {
      const res = await fetch('http://localhost:4000/api/hustlers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hustler),
      });
      if (!res.ok) throw new Error('Failed to create hustler');
      const data = await res.json();
      
      showSuccess(
        '🎉 Welcome to the Community!',
        `${formData.fullName}, you're all set! Start connecting with MSH students now.`,
        5000,
        { large: true }
      );
      
      setTimeout(() => {
        navigate(`/hustler/${data.id}`);
      }, 2000);
    } catch (err) {
      showError(
        'Oops! Something went wrong',
        'Please try again or contact support if the issue persists.',
        5000
      );
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.email && formData.whatsapp && formData.hallBlock;
      case 2:
        return formData.category && formData.bio;
      case 3:
        return true; // Review step - always valid
      default:
        return false;
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <SEO
        title="Join MSH Community - Campus Hustle"
        description="Become an entrepreneur at Mary Stuart Hall. Showcase your skills and connect with your hall mates."
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Join the Community
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start your entrepreneurial journey at Mary Stuart Hall in just 3 simple steps!
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-between max-w-xl mx-auto">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                      currentStep >= step
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-110'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {currentStep > step ? <CheckCircle className="h-6 w-6" /> : step}
                  </div>
                  <span className="text-xs text-gray-600 mt-2 text-center hidden sm:block">
                    {step === 1 && 'Your Info'}
                    {step === 2 && 'Your Business'}
                    {step === 3 && 'Add Products'}
                  </span>
                </div>
                {step < 3 && (
                  <div
                    className={`h-1 flex-1 mx-2 rounded-full transition-all duration-300 ${
                      currentStep > step
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                        : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20"
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Tell us about you</h2>
                  <p className="text-gray-600">Just the basics to get you started</p>
                </div>

                <div className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center overflow-hidden shadow-lg">
                        {formData.profilePicture ? (
                          <img
                            src={formData.profilePicture}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-14 h-14 text-white" />
                        )}
                      </div>
                      <label className="absolute bottom-0 right-0 bg-white rounded-full p-3 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <Camera className="w-5 h-5 text-gray-600" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="text-sm text-gray-500">Tap to add your photo</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="e.g., Grace Nakimuli"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="your.email@students.mak.ac.ug"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp *</label>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="07XX XXX XXX"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Which Block? *</label>
                    <select
                      name="hallBlock"
                      value={formData.hallBlock}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    >
                      <option value="">Select your block</option>
                      {hallBlocks.map((block) => (
                        <option key={block} value={block}>
                          {block}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                  >
                    Next
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Business */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20"
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">What's your hustle?</h2>
                  <p className="text-gray-600">Tell us about your business</p>
                </div>

                <div className="space-y-6">
                  {/* Category Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-4">Choose Your Category *</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, category: category.name }))}
                          className={`p-4 rounded-2xl border-2 transition-all duration-200 transform hover:scale-105 ${
                            formData.category === category.name
                              ? `border-purple-500 bg-gradient-to-br ${category.color} text-white shadow-lg`
                              : 'border-gray-200 bg-white hover:border-purple-300'
                          }`}
                        >
                          <div className="text-3xl mb-2">{category.icon}</div>
                          <div className="text-sm font-semibold">{category.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Describe Your Business *
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                      placeholder="Tell MSH students about what you offer and what makes you special..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range (Optional)</label>
                    <input
                      type="text"
                      name="priceRange"
                      value={formData.priceRange}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="e.g., From 15,000 UGX or 5,000 - 50,000 UGX"
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                  >
                    Continue
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Products (Optional) */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20"
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mb-4">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Add Your Products</h2>
                  <p className="text-gray-600">Optional - You can add products later too!</p>
                </div>

                <div className="space-y-4 mb-6">
                  {products.map((product, index) => (
                    <div key={product.id} className="bg-white rounded-xl p-5 border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-semibold text-gray-700">Product {index + 1}</span>
                        <button
                          type="button"
                          onClick={() => removeProduct(product.id)}
                          className="text-red-500 hover:text-red-700 font-bold text-lg"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Product Image Section */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Product Images {product.images.length > 0 && `(${product.images.length})`}
                        </label>
                        
                        {product.images.length > 0 ? (
                          <div className="relative mb-3">
                            {/* Main Image Display */}
                            <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50 mb-3 group">
                              <img
                                src={product.images[productImageIndex[product.id] || 0]}
                                alt={`Product ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              
                              {/* Image Navigation for Multiple Images */}
                              {product.images.length > 1 && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => {
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
                                    type="button"
                                    onClick={() => {
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
                                    {product.images.map((_, idx) => (
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
                            </div>

                            {/* Image Thumbnail Grid */}
                            <div className="grid grid-cols-4 gap-2">
                              {product.images.map((img, imgIndex) => (
                                <div key={imgIndex} className="relative group">
                                  <div className={`aspect-square rounded-lg overflow-hidden border-2 ${
                                    imgIndex === (productImageIndex[product.id] || 0) 
                                      ? 'border-blue-500 ring-2 ring-blue-200' 
                                      : 'border-gray-200'
                                  }`}>
                                    <img
                                      src={img}
                                      alt={`Product ${index + 1} image ${imgIndex + 1}`}
                                      className="w-full h-full object-cover cursor-pointer"
                                      onClick={() => setProductImageIndex(prev => ({ ...prev, [product.id]: imgIndex }))}
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeProductImage(product.id, imgIndex)}
                                    className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
                                    title="Remove image"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                              ))}
                              
                              {/* Add More Images Button */}
                              <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                                <div className="text-center">
                                  <Upload className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                                  <span className="text-xs text-gray-500">Add</span>
                                </div>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleProductImageUpload(product.id, e)}
                                />
                              </label>
                            </div>
                          </div>
                        ) : (
                          <div className="mb-3">
                            <label className="cursor-pointer inline-flex items-center px-4 py-3 border-2 border-dashed border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors font-medium w-full justify-center">
                              <Upload className="h-5 w-5 mr-2" />
                              Upload Product Image
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleProductImageUpload(product.id, e)}
                              />
                            </label>
                            <p className="text-xs text-gray-500 mt-2 text-center">Or paste image URL below</p>
                          </div>
                        )}

                        {/* URL Input for Images */}
                        <input
                          type="url"
                          placeholder="Or paste image URL here (e.g., https://example.com/image.jpg)"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                          onBlur={(e) => {
                            const url = e.target.value.trim();
                            if (url) {
                              const foundProduct = products.find(p => p.id === product.id);
                              if (foundProduct) {
                                updateProduct(product.id, 'images', [...foundProduct.images, url]);
                                e.target.value = '';
                              }
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const target = e.target as HTMLInputElement;
                              const url = target.value.trim();
                              if (url) {
                                const foundProduct = products.find(p => p.id === product.id);
                                if (foundProduct) {
                                  updateProduct(product.id, 'images', [...foundProduct.images, url]);
                                  target.value = '';
                                }
                              }
                            }
                          }}
                        />
                        <p className="text-xs text-gray-500 mt-1">Press Enter or click outside to add URL</p>
                      </div>

                      {/* Product Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Product name *"
                          value={product.name}
                          onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Price (e.g., 25,000 UGX) *"
                          value={product.price}
                          onChange={(e) => updateProduct(product.id, 'price', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Description (optional)"
                          value={product.description}
                          onChange={(e) => updateProduct(product.id, 'description', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addQuickProduct}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-gray-600 hover:text-blue-600 font-semibold"
                  >
                    + Add Product/Service
                  </button>
                </div>

                {products.length === 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                    <p className="text-sm text-blue-800 text-center">
                      💡 No worries! You can skip this and add products anytime from your dashboard.
                    </p>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                  >
                    <Zap className="h-5 w-5" />
                    Join the Community!
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
