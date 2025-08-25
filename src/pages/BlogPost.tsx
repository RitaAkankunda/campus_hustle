import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Calendar, Tag } from 'lucide-react';
import { blogPosts } from '../data/cleanMockData';
import SEO from '../components/SEO';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Generate some sample content for the blog post
  const sampleContent = [
    {
      type: 'paragraph',
      content: `${post.excerpt} This comprehensive guide will walk you through everything you need to know about this important topic for student entrepreneurs at Makerere University.`
    },
    {
      type: 'heading',
      content: 'Getting Started'
    },
    {
      type: 'paragraph',
      content: 'As a student entrepreneur at Mary Stuart Hall, you have unique opportunities and challenges. Understanding how to navigate these effectively is crucial for your success. Here are some key strategies to help you build a thriving business while maintaining your academic excellence.'
    },
    {
      type: 'heading',
      content: 'Key Strategies for Success'
    },
    {
      type: 'list',
      content: [
        'Focus on building genuine relationships with your customers',
        'Always deliver high-quality work that exceeds expectations',
        'Be consistent with your pricing and service delivery',
        'Use social media effectively to showcase your work',
        'Network with other entrepreneurs in your hall and university'
      ]
    },
    {
      type: 'paragraph',
      content: 'Remember that success as a student entrepreneur takes time and dedication. Stay committed to your goals, learn from every experience, and don\'t be afraid to adapt your strategies as you grow.'
    },
    {
      type: 'heading',
      content: 'Taking Action'
    },
    {
      type: 'paragraph',
      content: 'The most important step is to start. Whether you\'re offering beauty services, academic tutoring, or selling products, begin with what you have and improve as you go. Your fellow students at Mary Stuart Hall are looking for quality services, and you can be the one to provide them.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <SEO 
        title={`${post.title} | Campus Hustle Blog`}
        description={post.excerpt}
        keywords="student entrepreneur, Makerere University, business tips, campus hustle"
        url={`https://campushustle.com/blog/${post.id}`}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.article
          className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Featured Image */}
          <div className="relative h-64 md:h-80">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          {/* Article Content */}
          <div className="p-8 md:p-12">
            {/* Title */}
            <motion.h1
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {post.title}
            </motion.h1>

            {/* Meta Information */}
            <motion.div
              className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-blue-500" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-teal-500" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-2 text-indigo-500" />
                <span>Student Entrepreneur</span>
              </div>
            </motion.div>

            {/* Article Body */}
            <motion.div
              className="prose prose-lg max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {sampleContent.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="mb-6"
                >
                  {section.type === 'heading' && (
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.content}</h2>
                  )}
                  {section.type === 'paragraph' && (
                    <p className="text-gray-700 leading-relaxed mb-4">{section.content}</p>
                  )}
                  {section.type === 'list' && Array.isArray(section.content) && (
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Call to Action */}
            <motion.div
              className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Start Your Entrepreneurial Journey?</h3>
              <p className="text-gray-600 mb-4">Join thousands of successful student entrepreneurs at Mary Stuart Hall and start building your business today!</p>
              <Link
                to="/signup"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                Join Our Community
              </Link>
            </motion.div>
          </div>
        </motion.article>

        {/* Related Posts */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.filter(p => p.id !== post.id).slice(0, 2).map((relatedPost) => (
              <Link
                key={relatedPost.id}
                to={`/blog/${relatedPost.id}`}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-white/20 hover:shadow-xl transition-all duration-300"
              >
                <div className="h-32 overflow-hidden">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">{relatedPost.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;
