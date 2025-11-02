import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Camera, 
  Package, 
  AlertCircle,
  CheckCircle,
  Settings,
  LogOut,
  User,
  X,
  Upload
} from 'lucide-react';
import { Product, Hustler } from '../../types';
import { useNotifications } from '../Notification';
import AnalyticsDashboard from './AnalyticsDashboard';

interface ProductDashboardProps {
  hustler: Hustler;
  onUpdateProduct: (productId: string, updates: Partial<Product>) => void;
  onDeleteProduct: (productId: string) => void;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onDeleteProfile: () => void;
}

const ProductDashboard: React.FC<ProductDashboardProps> = ({
  hustler,
  onUpdateProduct,
  onDeleteProduct,
  onAddProduct,
  onDeleteProfile
}) => {
  const { showSuccess, showError, showWarning } = useNotifications();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showProfileDeleteConfirm, setShowProfileDeleteConfirm] = useState(false);
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    images: [''],
    category: '',
    inStock: true
  });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.description && newProduct.price) {
      const product = {
        ...newProduct,
        createdDate: new Date().toISOString().split('T')[0],
        updatedDate: new Date().toISOString().split('T')[0]
      };
      onAddProduct(product);
      showSuccess(
        'Product Added! 🎉',
        `${newProduct.name} has been added to your store.`,
        4000
      );
      setNewProduct({
        name: '',
        description: '',
        price: '',
        images: [''],
        category: '',
        inStock: true
      });
      setShowAddForm(false);
    } else {
      showError(
        'Missing Information',
        'Please fill in all required fields (name, description, and price).',
        5000
      );
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowAddForm(false);
  };

  const handleUpdateProduct = () => {
    if (editingProduct) {
      onUpdateProduct(editingProduct.id, {
        ...editingProduct,
        updatedDate: new Date().toISOString().split('T')[0]
      });
      showSuccess(
        'Product Updated! ✨',
        `${editingProduct.name} has been updated successfully.`,
        4000
      );
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    const productName = hustler.products.find(p => p.id === productId)?.name || 'Product';
    onDeleteProduct(productId);
    showWarning(
      'Product Deleted',
      `${productName} has been removed from your store.`,
      4000
    );
    setShowDeleteConfirm(null);
  };

  const inStockProducts = hustler.products.filter(p => p.inStock);
  const outOfStockProducts = hustler.products.filter(p => !p.inStock);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Analytics Dashboard */}
        <AnalyticsDashboard hustler={hustler} />

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img
                src={hustler.profileImage}
                alt={hustler.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {hustler.name}!</h1>
                <p className="text-gray-600">{hustler.location} • {hustler.category}</p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-sm text-green-600 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    {inStockProducts.length} products available
                  </span>
                  {outOfStockProducts.length > 0 && (
                    <span className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {outOfStockProducts.length} out of stock
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to={`/hustler/${hustler.id}`}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Public Profile
              </Link>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{hustler.products.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Stock</p>
                <p className="text-2xl font-bold text-gray-900">{inStockProducts.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-gray-900">{outOfStockProducts.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <User className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rating</p>
                <p className="text-2xl font-bold text-gray-900">{hustler.rating}⭐</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Your Products</h2>
            <span className="text-sm text-gray-600">{hustler.products.length} total products</span>
          </div>

          {hustler.products.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
              <p className="text-gray-600 mb-6">Start showcasing your products to MSH entrepreneurs!</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Your First Product
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hustler.products.map((product) => (
                <div
                  key={product.id}
                  className={`bg-gray-50 rounded-xl p-4 border-2 ${
                    product.inStock ? 'border-green-200' : 'border-red-200'
                  }`}
                >
                  <div className="relative group">
                    {product.images && product.images.length > 0 && product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                        }}
                      />
                    ) : (
                      <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center border-2 border-dashed border-gray-300">
                        <div className="text-center">
                          <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-xs text-gray-500">No image</p>
                        </div>
                      </div>
                    )}
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                      product.inStock 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                  <p className="text-lg font-bold text-purple-600 mb-4">{product.price}</p>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      <Edit3 className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(product.id)}
                      className="flex items-center justify-center px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile Management */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Profile Management
          </h2>
          
          <div className="space-y-4">
            <Link
              to="/edit-profile"
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Edit Profile Information</p>
                  <p className="text-sm text-gray-600">Update your bio, contact details, and services</p>
                </div>
              </div>
              <Edit3 className="h-5 w-5 text-gray-400" />
            </Link>
            
            <button
              onClick={() => setShowProfileDeleteConfirm(true)}
              className="flex items-center justify-between w-full p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-left"
            >
              <div className="flex items-center">
                <LogOut className="h-5 w-5 text-red-400 mr-3" />
                <div>
                  <p className="font-medium text-red-900">Delete Profile</p>
                  <p className="text-sm text-red-600">Permanently remove your profile and all products</p>
                </div>
              </div>
              <Trash2 className="h-5 w-5 text-red-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {(showAddForm || editingProduct) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  value={editingProduct ? editingProduct.name : newProduct.name}
                  onChange={(e) => {
                    if (editingProduct) {
                      setEditingProduct({...editingProduct, name: e.target.value});
                    } else {
                      setNewProduct({...newProduct, name: e.target.value});
                    }
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="e.g., Box Braids - Medium Size"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  rows={3}
                  value={editingProduct ? editingProduct.description : newProduct.description}
                  onChange={(e) => {
                    if (editingProduct) {
                      setEditingProduct({...editingProduct, description: e.target.value});
                    } else {
                      setNewProduct({...newProduct, description: e.target.value});
                    }
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Describe your product, what makes it special..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                  <input
                    type="text"
                    value={editingProduct ? editingProduct.price : newProduct.price}
                    onChange={(e) => {
                      if (editingProduct) {
                        setEditingProduct({...editingProduct, price: e.target.value});
                      } else {
                        setNewProduct({...newProduct, price: e.target.value});
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="e.g., 25,000 UGX"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    value={editingProduct ? editingProduct.category : newProduct.category}
                    onChange={(e) => {
                      if (editingProduct) {
                        setEditingProduct({...editingProduct, category: e.target.value});
                      } else {
                        setNewProduct({...newProduct, category: e.target.value});
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="e.g., Hair Braiding"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                <p className="text-xs text-gray-500 mb-3">Upload images or use URLs. You can add multiple images.</p>
                
                {/* Image Preview Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {(editingProduct ? editingProduct.images : newProduct.images).filter(img => img).map((image, index) => (
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
                          const currentImages = editingProduct ? editingProduct.images : newProduct.images;
                          const updatedImages = currentImages.filter((_, i) => i !== index);
                          if (editingProduct) {
                            setEditingProduct({...editingProduct, images: updatedImages.length ? updatedImages : ['']});
                          } else {
                            setNewProduct({...newProduct, images: updatedImages.length ? updatedImages : ['']});
                          }
                        }}
                        className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        title="Delete image"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Upload Image Button */}
                <label className="cursor-pointer inline-flex items-center px-4 py-3 border-2 border-dashed border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors font-medium w-full justify-center mb-3">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // Validate file size (max 5MB)
                        if (file.size > 5 * 1024 * 1024) {
                          showError('Image too large', 'Please choose an image smaller than 5MB');
                          return;
                        }
                        
                        // Convert image to base64
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          const base64String = reader.result as string;
                          const currentImages = editingProduct ? editingProduct.images : newProduct.images;
                          const filteredImages = currentImages.filter(img => img);
                          const updatedImages = [...filteredImages, base64String];
                          
                          if (editingProduct) {
                            setEditingProduct({...editingProduct, images: updatedImages});
                          } else {
                            setNewProduct({...newProduct, images: updatedImages});
                          }
                        };
                        reader.onerror = () => {
                          showError('Upload failed', 'There was an error reading your image. Please try again.');
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>

                {/* URL Input (Alternative) */}
                <input
                  type="url"
                  placeholder="Or paste image URL here (e.g., https://example.com/image.jpg)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                  onBlur={(e) => {
                    const url = e.target.value.trim();
                    if (url) {
                      const currentImages = editingProduct ? editingProduct.images : newProduct.images;
                      const filteredImages = currentImages.filter(img => img && !img.startsWith('data:'));
                      const updatedImages = [...filteredImages, url];
                      
                      if (editingProduct) {
                        setEditingProduct({...editingProduct, images: updatedImages});
                      } else {
                        setNewProduct({...newProduct, images: updatedImages});
                      }
                      e.target.value = ''; // Clear input after adding
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const target = e.target as HTMLInputElement;
                      const url = target.value.trim();
                      if (url) {
                        const currentImages = editingProduct ? editingProduct.images : newProduct.images;
                        const filteredImages = currentImages.filter(img => img && !img.startsWith('data:'));
                        const updatedImages = [...filteredImages, url];
                        
                        if (editingProduct) {
                          setEditingProduct({...editingProduct, images: updatedImages});
                        } else {
                          setNewProduct({...newProduct, images: updatedImages});
                        }
                        target.value = ''; // Clear input after adding
                      }
                    }
                  }}
                />
                <p className="text-xs text-gray-500 mt-2">Press Enter or click outside to add URL</p>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={editingProduct ? editingProduct.inStock : newProduct.inStock}
                  onChange={(e) => {
                    if (editingProduct) {
                      setEditingProduct({...editingProduct, inStock: e.target.checked});
                    } else {
                      setNewProduct({...newProduct, inStock: e.target.checked});
                    }
                  }}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <label htmlFor="inStock" className="ml-2 block text-sm text-gray-700">
                  Product is currently in stock
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingProduct(null);
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
              >
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Product Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Delete Product?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProduct(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Profile Confirmation */}
      {showProfileDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-red-900 mb-4">Delete Your Profile?</h3>
            <p className="text-gray-600 mb-4">
              This will permanently delete your profile, all your products, and remove you from MSH Connect.
            </p>
            <p className="text-sm text-red-600 mb-6">
              <strong>This action cannot be undone!</strong>
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowProfileDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onDeleteProfile}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDashboard;
