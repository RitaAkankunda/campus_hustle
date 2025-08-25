import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Phone, Calendar, Award, MessageCircle, ArrowLeft, Send } from 'lucide-react';
import { testimonials as initialTestimonials } from '../data/cleanMockData';
import HustlerReviewForm from '../components/Hustlers/HustlerReviewForm';
import { useNotifications } from '../components/Notification';


const HustlerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    message: '',
    phone: ''
  });
  const [hustler, setHustler] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { showSuccess, showError } = useNotifications();

  useEffect(() => {
    const fetchHustler = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:4000/api/hustlers`);
        const data = await res.json();
        const found = data.find((h: any) => String(h.id) === String(id));
        setHustler(found || null);
      } catch (err) {
        setHustler(null);
      } finally {
        setLoading(false);
      }
    };
    fetchHustler();
  }, [id]);

  const hustlerTestimonials = testimonials.filter((t: any) => t.hustler === hustler?.name);
  // Handle new review submission
  const handleReviewSubmit = (review: { name: string; rating: number; comment: string }) => {
    if (!hustler) return;
    setTestimonials((prev: any[]) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: review.name,
        university: hustler.university,
        rating: review.rating,
        comment: review.comment,
        hustler: hustler.name,
        date: new Date().toISOString().slice(0, 10)
      }
    ]);
  };

  // Delete profile handler
  const handleDeleteProfile = async () => {
    setShowDeleteConfirm(false);
    try {
      if (!hustler) return;
      const res = await fetch(`http://localhost:4000/api/hustlers/${hustler.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete profile');
      showSuccess('Profile Deleted', 'Your profile has been deleted successfully.');
      setTimeout(() => {
        window.location.href = '/hustlers';
      }, 1500);
    } catch (err) {
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

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the booking submission
    alert('Booking request sent! The hustler will contact you soon.');
    setShowBookingForm(false);
    setBookingData({ name: '', email: '', message: '', phone: '' });
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Header */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-64 bg-gradient-to-r from-purple-600 to-blue-600">
                <div className="absolute inset-0 bg-black/20"></div>
                {/* Badges and Featured label removed for a cleaner look */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-end space-x-6">
                    <div className="relative">
                      <img
                        src={hustler.profileImage}
                        alt={hustler.name}
                        className="w-24 h-24 rounded-full border-4 border-white object-cover"
                      />
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
            {/* Delete Profile Button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition-all duration-200"
              >
                Delete Profile
              </button>
            </div>

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
                <h3 className="text-xl font-semibold mb-4">Available Products</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hustler.products.filter((product: any) => product.inStock).map((product: any) => (
                    <div
                      key={product.id}
                      className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 border border-pink-100 hover:shadow-lg transition-all duration-200 hover:scale-105"
                    >
                      <div className="relative mb-4">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          In Stock
                        </div>
                      </div>
                      
                      <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-purple-600">{product.price}</span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {product.category}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => {
                          const message = `Hi! I'm interested in your ${product.name}. Is it still available?`;
                          window.open(`https://wa.me/${hustler.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
                        }}
                        className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 text-sm font-medium"
                      >
                        Order via WhatsApp
                      </button>
                    </div>
                  ))}
                </div>
                
                {hustler.products.filter((product: any) => !product.inStock).length > 0 && (
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-4 text-gray-600">Currently Out of Stock</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {hustler.products.filter((product: any) => !product.inStock).map((product: any) => (
                        <div
                          key={product.id}
                          className="bg-gray-50 rounded-xl p-4 border border-gray-200 opacity-75"
                        >
                          <div className="relative mb-4">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-40 object-cover rounded-lg grayscale"
                            />
                            <div className="absolute top-2 right-2 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                              Out of Stock
                            </div>
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
                  {hustlerTestimonials.map((testimonial: any) => (
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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
              
              <div className="space-y-4">
                <a
                  href={`https://wa.me/${hustler.whatsapp.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <Phone className="h-5 w-5" />
                  <span>WhatsApp</span>
                </a>
                
                <button
                  onClick={() => setShowBookingForm(true)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">Quick Stats</span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• {hustler.reviewCount} satisfied customers</p>
                  <p>• {hustler.rating} average rating</p>
                  <p>• Member since {new Date(hustler.joinedDate).getFullYear()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md"
            >
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={bookingData.email}
                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={bookingData.message}
                    onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                    placeholder="Describe what you need..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-medium flex items-center justify-center space-x-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HustlerProfile;