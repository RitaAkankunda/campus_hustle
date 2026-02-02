import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, CheckCircle, Heart } from 'lucide-react';
import { useNotifications, NotificationContainer } from '../components/Notification';

const ForgotPassword: React.FC = () => {
  const { showSuccess, showError } = useNotifications();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError(
        'Invalid Email Format',
        'Please enter a valid email address.',
        4000
      );
      setIsSubmitting(false);
      return;
    }

    // Check if it's a Makerere University email
    if (!email.includes('@students.mak.ac.ug') && !email.includes('@mak.ac.ug')) {
      showError(
        'Invalid Email Domain',
        'Please use your Makerere University email address (@students.mak.ac.ug or @mak.ac.ug).',
        5000
      );
      setIsSubmitting(false);
      return;
    }

    // Simulate API call for password reset
    setTimeout(() => {
      setIsSubmitting(false);
      setIsEmailSent(true);
      showSuccess(
        'Reset Link Sent! 📧',
        'Check your email for password reset instructions.',
        6000
      );
    }, 2000);
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Check Your Email!</h2>
            <p className="text-gray-600 mb-6">
              We've sent password reset instructions to <strong>{email}</strong>
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <div className="text-center space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">What's next?</h3>
                <ul className="text-sm text-blue-700 space-y-1 text-left">
                  <li>• Check your email inbox</li>
                  <li>• Look for an email from MSH Connect</li>
                  <li>• Click the reset link in the email</li>
                  <li>• Create your new password</li>
                </ul>
              </div>
              
              <p className="text-sm text-gray-500">
                Didn't receive the email? Check your spam folder or{' '}
                <button 
                  onClick={() => {
                    setIsEmailSent(false);
                    setEmail('');
                  }}
                  className="text-pink-600 hover:text-pink-700 font-medium"
                >
                  try again
                </button>
              </p>
            </div>

            <div className="flex space-x-4">
              <Link
                to="/login"
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold text-center hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-4">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Forgot Your Password?</h2>
          <p className="mt-2 text-gray-600">
            No worries! Enter your email and we'll send you reset instructions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="your.email@students.mak.ac.ug"
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Please use your Makerere University email address
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending Reset Link...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Reset Link
              </>
            )}
          </button>

          <div className="text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center text-sm text-gray-600 hover:text-pink-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Login
            </Link>
          </div>
        </form>

        {/* Additional Help */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Make sure you're using your Makerere University email</p>
            <p>• Check your spam/junk folder for the reset email</p>
            <p>• Contact MSH Connect support if you continue having issues</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              For technical support, contact us through Mary Stuart Hall administration
            </p>
          </div>
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
};

export default ForgotPassword;
