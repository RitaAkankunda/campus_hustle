import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Heart, Zap, Award, TrendingUp } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { label: 'Active Hustlers', value: '200+', icon: Users },
    { label: 'Successful Connections', value: '1,500+', icon: Target },
    { label: 'Universities Covered', value: '15+', icon: Award },
    { label: 'Customer Satisfaction', value: '98%', icon: TrendingUp }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Supporting Students',
      description: 'We believe every student deserves a chance to showcase their talents and earn from their skills while studying.'
    },
    {
      icon: Zap,
      title: 'Empowering Innovation',
      description: 'We provide a platform that encourages creativity and entrepreneurship among Uganda\'s brightest minds.'
    },
    {
      icon: Users,
      title: 'Building Community',
      description: 'We create connections between students, fostering a supportive ecosystem of peer-to-peer commerce.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">CampusHustle</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to empower Ugandan university students to turn their skills into thriving businesses, 
              creating opportunities for economic growth and peer-to-peer support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
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
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
      <section className="py-16 bg-gray-50">
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
                  CampusHustle was born from a simple observation: talented university students across Uganda 
                  were struggling to balance their academic commitments with the need to earn income. Many had 
                  incredible skills in areas like hair braiding, web design, tutoring, and food preparation, 
                  but lacked a professional platform to showcase and monetize these talents.
                </p>
                <p>
                  We saw students promoting their services through WhatsApp statuses and Instagram posts, 
                  often undervaluing their work due to lack of proper branding and visibility. This is where 
                  CampusHustle comes in – to bridge the gap between talented student entrepreneurs and 
                  customers who need their services.
                </p>
                <p>
                  Today, we're proud to support hundreds of student hustlers across Uganda's top universities, 
                  helping them build sustainable income streams while pursuing their education.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="https://via.placeholder.com/800x600/8B5CF6/FFFFFF?text=Students+Working+Together"
                alt="Students working together"
                className="rounded-2xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do at CampusHustle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-purple-100 leading-relaxed">
                To empower Ugandan university students by providing a professional platform where they can 
                showcase their skills, connect with customers, and build sustainable income streams that 
                support their education and future entrepreneurial endeavors.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg text-purple-100 leading-relaxed">
                To become the leading platform for student entrepreneurship in Africa, creating a generation 
                of young business leaders who can drive economic growth and innovation across the continent.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Join the Movement</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Whether you're a talented student looking to monetize your skills or someone who wants to 
              support student entrepreneurs, CampusHustle is your platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-semibold">
                Join as a Hustler
              </button>
              <button className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300 font-semibold">
                Browse Services
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;