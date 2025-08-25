import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Camera, Plus, X, ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import NotificationContainer, { useNotifications } from '../components/Notification/NotificationContainer';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
}

interface EntrepreneurFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profilePicture: string;
  businessName: string;
  category: string;
  description: string;
  location: string;
  hallBlock: string;
  priceRange: string;
  products: Product[];
  termsAccepted: boolean;
}


const categories = [
  'Beauty & Hair', 'Tech & Design', 'Snacks & Treats', 'Events & Photography', 'Academics', 'Totebag & Accessories'
];
const hallBlocks = ['Block A', 'Block B', 'Block C', 'Block D'];

const Signup: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  // Step navigation handlers must be inside the component
  const nextStep = () => setCurrentStep((prev: number) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev: number) => Math.max(prev - 1, 1));
  const [formData, setFormData] = useState<EntrepreneurFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profilePicture: '',
    businessName: '',
    category: '',
    description: '',
    location: 'Mary Stuart Hall',
    hallBlock: '',
    priceRange: '',
    products: [],
    termsAccepted: false
  });
  const [currentProduct, setCurrentProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    images: []
  });
  const { notifications, addNotification, removeNotification } = useNotifications();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentProduct(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isProfile = false) => {
    const files = e.target.files;
    if (files) {
      const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));

      if (isProfile) {
        setFormData(prev => ({ ...prev, profilePicture: imageUrls[0] }));
      } else {
        setCurrentProduct(prev => ({
          ...prev,
          images: [...prev.images, ...imageUrls]
        }));
      }
    }
  };

  const addProduct = () => {
    if (currentProduct.name && currentProduct.price > 0) {
      const newProduct: Product = {
        ...currentProduct,
        id: Date.now().toString(),
        category: currentProduct.category || formData.category
      };

      setFormData(prev => ({
        ...prev,
        products: [...prev.products, newProduct]
      }));

      setCurrentProduct({
        name: '',
        description: '',
        price: 0,
        category: '',
        images: []
      });
    }
  };

  const removeProduct = (productId: string) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== productId)
    }));
  };

  const removeProductImage = (imageIndex: number) => {
    setCurrentProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== imageIndex)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Prepare hustler object for backend
    const hustler = {
      name: formData.firstName + ' ' + formData.lastName,
      university: 'Makerere University',
      category: formData.category,
      location: formData.location + (formData.hallBlock ? ' - ' + formData.hallBlock : ''),
      bio: formData.description,
      profileImage: formData.profilePicture,
      whatsapp: formData.phone,
      rating: 5,
      reviewCount: 0,
      portfolio: [],
      featured: false,
      joinedDate: new Date().toISOString(),
      services: formData.products.map(p => p.name),
      pricing: formData.priceRange,
      products: formData.products,
    };
    try {
      const res = await fetch('http://localhost:4000/api/hustlers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hustler),
      });
      if (!res.ok) throw new Error('Failed to create hustler');
      const data = await res.json();
      addNotification({
        type: 'success',
        title: '🎉 Welcome to MSH Community!',
        message: `${formData.firstName}, your entrepreneur account has been created successfully! You can now start showcasing your amazing services to your hall mates.`,
        duration: 180000,
        large: true
      });
      setTimeout(() => {
        navigate(`/hustler/${data.id}`);
      }, 2500);
    } catch (err) {
      addNotification({
        type: 'error',
        title: 'Signup Failed',
        message: 'There was a problem creating your account. Please try again.',
        duration: 8000,
      });
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Personal Information';
      case 2: return 'Business Details';
      case 3: return 'Add Your Products';
      case 4: return 'Review & Submit';
      default: return 'Sign Up';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <SEO
        title="Join MSH Community - Campus Hustle"
        description="Become an entrepreneur at Mary Stuart Hall. Showcase your skills and connect with your hall mates."
      />

      {/* Notification Container */}
      <NotificationContainer
        notifications={notifications}
        onRemove={removeNotification}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Join the MSH Community
          </h1>
          <p className="text-gray-600 text-lg">
            Start your entrepreneurial journey at Mary Stuart Hall
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  ${currentStep >= step
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                  }
                `}>
                  {step}
                </div>
                <span className="text-xs text-gray-500 mt-2 text-center">
                  {step === 1 && 'Personal'}
                  {step === 2 && 'Business'}
                  {step === 3 && 'Products'}
                  {step === 4 && 'Review'}
                </span>
              </div>
            ))}
          </div>
          <div className="flex mt-4">
            <div
              className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
            <div
              className="h-2 bg-gray-200 rounded-full flex-1"
              style={{ width: `${((4 - currentStep) / 4) * 100}%` }}
            />
          </div>
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{getStepTitle()}</h2>

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex flex-col items-center mb-8">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center overflow-hidden">
                      {formData.profilePicture ? (
                        <img
                          src={formData.profilePicture}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-16 h-16 text-white" />
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <Camera className="w-5 h-5 text-gray-600" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, true)}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Upload your profile picture</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Sarah's Hair Braiding"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hall Block</label>
                    <select
                      name="hallBlock"
                      value={formData.hallBlock}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select your block</option>
                      {hallBlocks.map(block => (
                        <option key={block} value={block}>{block}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your business and services..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">General Price Range</label>
                  <input
                    type="text"
                    name="priceRange"
                    value={formData.priceRange}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 5,000 - 50,000 UGX"
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Add a Product/Service</h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                        <input
                          type="text"
                          name="name"
                          value={currentProduct.name}
                          onChange={handleProductChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Box Braids"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price (UGX)</label>
                        <input
                          type="number"
                          name="price"
                          value={currentProduct.price || ''}
                          onChange={handleProductChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="25000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        name="description"
                        value={currentProduct.description}
                        onChange={handleProductChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Describe this product/service..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                      <div className="flex flex-wrap gap-4 mb-4">
                        {currentProduct.images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image}
                              alt={`Product ${index + 1}`}
                              className="w-20 h-20 object-cover rounded-lg border"
                            />
                            <button
                              type="button"
                              onClick={() => removeProductImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}

                        <label className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                          <Plus className="w-6 h-6 text-gray-400" />
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleImageUpload(e, false)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={addProduct}
                      disabled={!currentProduct.name || !currentProduct.price}
                      className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      Add Product
                    </button>
                  </div>
                </div>

                {formData.products.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Products ({formData.products.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {formData.products.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg border p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-800">{product.name}</h4>
                            <button
                              type="button"
                              onClick={() => removeProduct(product.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                          <p className="font-bold text-blue-600">{product.price.toLocaleString()} UGX</p>
                          {product.images.length > 0 && (
                            <div className="flex gap-2 mt-2">
                              {product.images.slice(0, 3).map((image, index) => (
                                <img
                                  key={index}
                                  src={image}
                                  alt=""
                                  className="w-12 h-12 object-cover rounded"
                                />
                              ))}
                              {product.images.length > 3 && (
                                <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                                  +{product.images.length - 3}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Review Your Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Personal Information</h4>
                      <div className="bg-white rounded-lg p-4 space-y-2">
                        <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
                        <p><span className="font-medium">Email:</span> {formData.email}</p>
                        <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                        <p><span className="font-medium">Location:</span> {formData.location} - {formData.hallBlock}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Business Information</h4>
                      <div className="bg-white rounded-lg p-4 space-y-2">
                        <p><span className="font-medium">Business:</span> {formData.businessName}</p>
                        <p><span className="font-medium">Category:</span> {formData.category}</p>
                        <p><span className="font-medium">Price Range:</span> {formData.priceRange}</p>
                        <p><span className="font-medium">Products:</span> {formData.products.length} items</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.termsAccepted}
                        onChange={(e) => setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
                        required
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        I agree to the <a href="#" className="text-blue-600 hover:text-blue-500">Terms of Service</a> and
                        <a href="#" className="text-blue-600 hover:text-blue-500 ml-1">Privacy Policy</a>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </button>
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 ml-auto"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!formData.termsAccepted}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ml-auto"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Create Account
                </button>
              )}
            </div>
          </form>
        </motion.div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
