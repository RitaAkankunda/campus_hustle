import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import FeaturedHustlers from '../components/Home/FeaturedHustlers';
import CategoriesSection from '../components/Home/CategoriesSection';
import TestimonialsSection from '../components/Home/TestimonialsSection';

const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedHustlers />
      <CategoriesSection />
      <TestimonialsSection />
    </div>
  );
};

export default Home;