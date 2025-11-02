import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  type Slide = { src: string; title: string; subtitle?: string };

  const slides: Slide[] = [
    { src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=1000&fit=crop', title: 'Beauty & Hair' },
    { src: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=1000&fit=crop', title: 'Tech & Design' },
    { src: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=1000&fit=crop&q=80', title: 'Snacks & Treats' },
    { src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=1000&fit=crop', title: 'Events & Photography' },
    { src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=1000&fit=crop', title: 'Academics' },
    { src: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&h=1000&fit=crop&q=80', title: 'Totebag & Accessories' }
  ];

  const [current, setCurrent] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 3000);
    return () => clearInterval(t);
  }, [isPaused, slides.length]);

  return (
    <section className="relative bg-gradient-to-b from-black via-indigo-900 to-purple-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-900/40 via-purple-800/30 to-transparent pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* LEFT: Big headline and CTAs */}
          <div className="text-left">
            <p className="uppercase text-sm tracking-wider text-gray-300 mb-4">Welcome to the party</p>
            <h1 className="font-extrabold text-6xl leading-tight mb-6">Join the
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-300">Club</span>
            </h1>

            <p className="text-gray-300 max-w-xl mb-8">Connect with talented ladies at Mary Stuart Hall for all your campus needs — from hair & beauty to academic support. Discover trusted sellers in your hall and book confidently.</p>

            <div className="flex flex-wrap gap-4">
              <Link to="/signup" className="inline-flex items-center gap-3 bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-lg font-semibold shadow-lg">
                <Heart className="h-5 w-5" />
                Get in Touch
              </Link>
              <Link to="/hustlers" className="inline-flex items-center gap-3 border border-gray-700 px-5 py-3 rounded-lg text-gray-200 hover:border-gray-500">
                Browse Entrepreneurs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* RIGHT: Portrait / Feature card */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="w-[320px] md:w-[380px] bg-gradient-to-tr from-white/8 to-white/4 backdrop-blur rounded-3xl ring-1 ring-white/10 p-4 shadow-2xl"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Image carousel */}
              <div className="relative w-full h-[420px] rounded-2xl overflow-hidden">
                {slides.map((s, i) => (
                  <img
                    key={`${i}-${s.src}`}
                    src={s.src}
                    alt={s.title}
                    loading="lazy"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      // if remote image fails, fall back to another snacks image
                      const img = e.currentTarget as HTMLImageElement;
                      img.onerror = null;
                      // Try alternative snacks image
                      if (s.title === 'Snacks & Treats') {
                        img.src = 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800&h=1000&fit=crop&q=80';
                      } else {
                        img.src = 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=800&h=1000&fit=crop&q=80';
                      }
                    }}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionTimingFunction: 'ease-in-out' }}
                  />
                ))}
              </div>

              <div className="mt-4 text-gray-100">
                <div className="text-lg font-bold">{slides[current].title}</div>
                <div className="text-sm text-gray-300">{slides[current].subtitle ?? ''}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
