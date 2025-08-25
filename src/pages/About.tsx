import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Target, Heart, Zap, Award, TrendingUp, MapPin, GraduationCap } from 'lucide-react';
import SEO from '../components/SEO';

const About: React.FC = () => {
  const stats = [
    { label: 'MSH Ladies Served', value: '50+', icon: Users },
    { label: 'Services Available', value: '15+', icon: Target },
    { label: 'Hall Entrepreneurs', value: '25+', icon: Award },
    { label: 'Community Satisfaction', value: '95%', icon: TrendingUp }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Supporting Our Sisters',
      description: 'Every lady in Mary Stuart Hall has unique talents. We believe in creating opportunities for our sisters to showcase their skills and earn from their abilities.'
    },
    {
      icon: Zap,
      title: 'Building Together',
      description: 'We foster a collaborative environment where MSH ladies support each other\'s entrepreneurial journeys while maintaining academic excellence.'
    },
    {
      icon: GraduationCap,
      title: 'Academic First',
      description: 'We understand that education comes first. Our platform helps students earn income without compromising their studies at Makerere University.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <SEO 
        title="About Campus Hustle - Mary Stuart Hall Marketplace"
        description="Learn about Campus Hustle, the authentic marketplace connecting Mary Stuart Hall students with talented entrepreneurs in their community."
        keywords="Mary Stuart Hall, Makerere University, student marketplace, campus community, MSH entrepreneurs"
        url="https://campushustle.com/about"
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">Campus Hustle</span>
            </h1>
            <div className="flex items-center justify-center gap-2 mb-6">
              <MapPin className="h-6 w-6 text-teal-300" />
              <span className="text-xl text-blue-200">Mary Stuart Hall, Makerere University</span>
            </div>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
              Born from the need to connect talented ladies in Mary Stuart Hall with students seeking quality services. 
              We're building a genuine community marketplace where academic excellence meets entrepreneurial spirit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Campus Hustle started as a simple observation: talented ladies in Mary Stuart Hall were providing 
                  amazing services - from professional hair braiding to fresh snacks and treats - but struggled 
                  to reach customers beyond their immediate friend circles.
                </p>
                <p>
                  We noticed that word-of-mouth marketing through WhatsApp groups and corridor conversations wasn't 
                  enough. Many skilled entrepreneurs in our hall were undercharging for their work or missing out 
                  on customers who needed their exact services.
                </p>
                <p>
                  That's when we decided to build something authentic - a platform specifically for our Mary Stuart Hall 
                  community, where quality entrepreneurs could shine and students could easily find the services they need, 
                  all while supporting our sisters' entrepreneurial dreams.
                </p>
                <p>
                  Today, Campus Hustle is the trusted marketplace for Mary Stuart Hall, connecting talented entrepreneurs 
                  with students who value quality, convenience, and community support.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 shadow-lg">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Mary Stuart Hall</h3>
                  <p className="text-gray-600 mb-6">Home to talented, ambitious women at Makerere University</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/70 rounded-lg p-4">
                      <div className="font-semibold text-blue-600">Founded</div>
                      <div className="text-gray-700">1961</div>
                    </div>
                    <div className="bg-white/70 rounded-lg p-4">
                      <div className="font-semibold text-purple-600">Capacity</div>
                      <div className="text-gray-700">400+ Students</div>
                    </div>
                    <div className="bg-white/70 rounded-lg p-4">
                      <div className="font-semibold text-teal-600">Programs</div>
                      <div className="text-gray-700">All Faculties</div>
                    </div>
                    <div className="bg-white/70 rounded-lg p-4">
                      <div className="font-semibold text-indigo-600">Community</div>
                      <div className="text-gray-700">Strong & United</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Stand For</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These values guide our mission to build a thriving entrepreneurial community at Mary Stuart Hall
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-shadow duration-300 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-blue-100 leading-relaxed">
                To create a genuine, trusted marketplace specifically for Mary Stuart Hall students, where talented 
                entrepreneurs can showcase their skills, connect with customers, and build sustainable income streams 
                that support their education - all within our close-knit hall community.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg text-blue-100 leading-relaxed">
                To see Mary Stuart Hall become the model for student entrepreneurship at Makerere University, 
                where every talented lady has the opportunity to turn her skills into a thriving business while 
                contributing to a supportive, empowering community.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Be Part of Our Community</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Whether you're a talented MSH lady looking to showcase your skills or a student seeking quality 
              services from your hall sisters, Campus Hustle is here to connect our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold"
              >
                Join as Entrepreneur
              </Link>
              <Link 
                to="/hustlers"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold"
              >
                Browse Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;