import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Hustlers from './pages/Hustlers';
import HustlerProfile from './pages/HustlerProfile';
import Categories from './pages/Categories';
import Blog from './pages/Blog';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hustlers" element={<Hustlers />} />
            <Route path="/hustler/:id" element={<HustlerProfile />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:id" element={<Hustlers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;