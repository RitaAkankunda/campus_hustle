import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { User, Camera, Star, Heart, Sparkles, Upload, X, Plus, Trash2, Eye } from 'lucide-react';
import { useNotifications } from '../components/Notification';
import SEO from '../components/SEO';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  images: File[];
  imageUrls: string[]; // For preview
}

const Signup: React.FC = () => {
  const { showSuccess } = useNotifications();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    roomNumber: '',
    yearOfStudy: '',
    course: '',
    category: '',
    services: '',
    priceRange: '',
    bio: '',
    profileImage: null as File | null,
    profileImageUrl: '' // For preview
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Beauty & Hair',
    'Tech & Design', 
    'Snacks & Treats',
    'Events & Photography',
    'Academics',
    'Totebag & Accessories'
  ];

  const yearOptions = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5+'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        profileImage: file,
        profileImageUrl: imageUrl
      }));
    }
  };

  // Product Management Functions
  const addProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: '',
      description: '',
      price: '',
      category: formData.category,
      images: [],
      imageUrls: []
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const removeProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const updateProduct = (productId: string, field: keyof Product, value: any) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, [field]: value }
        : product
    ));
  };

  const handleProductImageUpload = (productId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const imageUrls = files.map(file => URL.createObjectURL(file));
      setProducts(prev => prev.map(product => 
        product.id === productId 
          ? { 
              ...product, 
              images: [...product.images, ...files],
              imageUrls: [...product.imageUrls, ...imageUrls]
            }
          : product
      ));
    }
  };

  const removeProductImage = (productId: string, imageIndex: number) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { 
            ...product, 
            images: product.images.filter((_, index) => index !== imageIndex),
            imageUrls: product.imageUrls.filter((_, index) => index !== imageIndex)
          }
        : product
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate account creation and get new hustler ID (in real app, get from backend)
    const newHustlerId = Date.now().toString();
    setTimeout(() => {
      setIsSubmitting(false);
      showSuccess(
        'Welcome to MSH Connect! 🌸',
        `Your entrepreneur profile with ${products.length} products has been submitted for review. You'll receive a confirmation via WhatsApp within 24 hours.`,
        180000, // 3 minutes
        { large: true }
      );
      setTimeout(() => {
        navigate(`/hustler/${newHustlerId}`);
      }, 2500);
    }, 2000);
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <SEO 
        title="Join MSH Connect - Start Your Entrepreneurial Journey"
        description="Sign up as an entrepreneur at Mary Stuart Hall and showcase your products and services to fellow students."
        keywords="MSH Connect, entrepreneur signup, Mary Stuart Hall, student business"
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Join MSH Connect</h1>
          <p className="text-xl text-gray-600">Start your entrepreneurial journey at Mary Stuart Hall</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((number) => (
              <React.Fragment key={number}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  step >= number 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-purple-600 text-white' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {number}
                </div>
                {number < 4 && (
                  <div className={`w-16 h-1 ${
                    step > number ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-300'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-center mt-2 space-x-16 text-sm text-gray-600">
            <span>Personal Info</span>
            <span>Business Details</span>
            <span>Products</span>
            <span>Review</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <User className="h-6 w-6 mr-2 text-blue-600" />
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Grace Nakimuli"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="grace.nakimuli@students.mak.ac.ug"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    required
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="07XX XXX XXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    MSH Room Number *
                  </label>
                  <input
                    type="text"
                    name="roomNumber"
                    required
                    value={formData.roomNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Room 204"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year of Study *
                  </label>
                  <select
                    name="yearOfStudy"
                    required
                    value={formData.yearOfStudy}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Year</option>
                    {yearOptions.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course/Program *
                  </label>
                  <input
                    type="text"
                    name="course"
                    required
                    value={formData.course}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Bachelor of Computer Science"
                  />
                </div>
              </div>

              {/* Profile Picture Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture *
                </label>
                <div className="flex items-center space-x-6">
                  <div className="shrink-0">
                    {formData.profileImageUrl ? (
                      <img
                        className="h-24 w-24 object-cover rounded-full border-4 border-blue-200"
                        src={formData.profileImageUrl}
                        alt="Profile preview"
                      />
                    ) : (
                      <div className="h-24 w-24 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                        <Camera className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      id="profileImage"
                      accept="image/*"
                      onChange={handleProfileImageUpload}
                      className="hidden"
                      required
                    />
                    <label
                      htmlFor="profileImage"
                      className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Profile Picture
                    </label>
                    <p className="text-xs text-gray-500 mt-2">
                      Upload a clear photo of yourself. JPG, PNG, or GIF (max 5MB)
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.fullName || !formData.email || !formData.whatsapp || !formData.roomNumber || !formData.profileImage}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Next Step →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Business Information */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Star className="h-6 w-6 mr-2 text-blue-600" />
                Business Details
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Category *
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Services You Offer *
                  </label>
                  <input
                    type="text"
                    name="services"
                    required
                    value={formData.services}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Box Braids, Cornrows, Hair Extensions (separate with commas)"
                  />
                  <p className="text-sm text-gray-500 mt-1">List your services separated by commas</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    General Price Range *
                  </label>
                  <input
                    type="text"
                    name="priceRange"
                    required
                    value={formData.priceRange}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., From 15,000 UGX or 15,000 - 50,000 UGX"
                  />
                  <p className="text-sm text-gray-500 mt-1">This is your general pricing range. You'll set specific prices for each product in the next step.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    About Your Business *
                  </label>
                  <textarea
                    name="bio"
                    required
                    rows={4}
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell MSH students about your business, experience, and what makes you special..."
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.category || !formData.services || !formData.priceRange || !formData.bio}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Next Step →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Products */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Heart className="h-6 w-6 mr-2 text-blue-600" />
                Your Products & Services
              </h2>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  Add specific products/services with individual pricing and photos. This helps customers see exactly what you offer!
                </p>
              </div>

              {/* Products List */}
              <div className="space-y-6">
                {products.map((product, index) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Product {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeProduct(product.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Product/Service Name *
                        </label>
                        <input
                          type="text"
                          value={product.name}
                          onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Box Braids (Medium Size)"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price *
                        </label>
                        <input
                          type="text"
                          value={product.price}
                          onChange={(e) => updateProduct(product.id, 'price', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., 25,000 UGX"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={product.description}
                        onChange={(e) => updateProduct(product.id, 'description', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Brief description of this product/service..."
                      />
                    </div>

                    {/* Product Images */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Images
                      </label>
                      <div className="flex flex-wrap gap-4 mb-4">
                        {product.imageUrls.map((imageUrl, imageIndex) => (
                          <div key={imageIndex} className="relative">
                            <img
                              src={imageUrl}
                              alt={`Product ${index + 1} image ${imageIndex + 1}`}
                              className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                            />
                            <button
                              type="button"
                              onClick={() => removeProductImage(product.id, imageIndex)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                        <div>
                          <input
                            type="file"
                            id={`product-images-${product.id}`}
                            accept="image/*"
                            multiple
                            onChange={(e) => handleProductImageUpload(product.id, e)}
                            className="hidden"
                          />
                          <label
                            htmlFor={`product-images-${product.id}`}
                            className="cursor-pointer flex items-center justify-center w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors duration-200"
                          >
                            <Plus className="h-6 w-6 text-gray-400" />
                          </label>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">
                        Add multiple images to showcase your product. JPG, PNG, or GIF (max 5MB each)
                      </p>
                    </div>
                  </div>
                ))}

                {/* Add Product Button */}
                <button
                  type="button"
                  onClick={addProduct}
                  className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors duration-200 flex items-center justify-center text-gray-600 hover:text-blue-600"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Another Product/Service
                </button>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={products.length === 0 || products.some(p => !p.name || !p.price)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Review & Submit →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Eye className="h-6 w-6 mr-2 text-blue-600" />
                Review Your Information
              </h2>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><strong>Name:</strong> {formData.fullName}</div>
                  <div><strong>Email:</strong> {formData.email}</div>
                  <div><strong>WhatsApp:</strong> {formData.whatsapp}</div>
                  <div><strong>Room:</strong> {formData.roomNumber}</div>
                  <div><strong>Year:</strong> {formData.yearOfStudy}</div>
                  <div><strong>Course:</strong> {formData.course}</div>
                  <div><strong>Category:</strong> {formData.category}</div>
                  <div><strong>Price Range:</strong> {formData.priceRange}</div>
                </div>
                <div>
                  <strong>Services:</strong> {formData.services}
                </div>
                <div>
                  <strong>About:</strong> {formData.bio}
                </div>
                <div>
                  <strong>Products Added:</strong> {products.length} products/services with individual pricing
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Your entrepreneur profile and products will be reviewed within 24 hours</li>
                  <li>• We'll verify your MSH residency and contact details</li>
                  <li>• Once approved, you'll receive setup instructions via WhatsApp</li>
                  <li>• Your products will be featured in the MSH Connect marketplace!</li>
                </ul>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  ← Previous
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    'Join MSH Connect! 🌸'
                  )}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p>Already have an account? <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">Sign in here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
