import { Hustler, Category, BlogPost, Testimonial } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Beauty & Hair',
    icon: '💇‍♀️',
    color: 'from-purple-500 to-indigo-500',
    count: 2,
    images: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&h=400&fit=crop'
    ]
  },
  {
    id: '2',
    name: 'Tech & Design',
    icon: '💻',
    color: 'from-blue-500 to-cyan-500',
    count: 0,
    images: [
      'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop'
    ]
  },
  {
    id: '3',
    name: 'Snacks & Treats',
    icon: '�',
    color: 'from-teal-500 to-blue-500',
    count: 1,
    images: [
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=500&h=400&fit=crop'
    ]
  },
  {
    id: '4',
    name: 'Events & Photography',
    icon: '📸',
    color: 'from-indigo-500 to-purple-500',
    count: 0,
    images: [
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=500&h=400&fit=crop'
    ]
  },
  {
    id: '5',
    name: 'Academics',
    icon: '📚',
    color: 'from-blue-600 to-purple-600',
    count: 0,
    images: [
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=400&fit=crop'
    ]
  },
  {
    id: '6',
    name: 'Totebag & Accessories',
    icon: '👜',
    color: 'from-purple-600 to-blue-600',
    count: 0,
    images: [
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=500&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=400&fit=crop'
    ]
  }
];

// Empty array - hustlers should come from the API (http://localhost:4000/api/hustlers)
// Mock data removed - use the backend API to manage hustlers
export const hustlers: Hustler[] = [];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Price Your Services as a Student Entrepreneur',
    excerpt: 'Learn the art of competitive pricing without undervaluing your work. Essential tips for Makerere University entrepreneurs.',
    author: 'Campus Hustle Team',
    date: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Building Your Brand as a Student Entrepreneur',
    excerpt: 'How to create a professional image and build trust with your fellow students across Makerere University.',
    author: 'Campus Hustle Team',
    date: '2024-01-10',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop',
    readTime: '8 min read'
  },
  {
    id: '3',
    title: 'Balancing Books and Business at University',
    excerpt: 'Time management strategies for student entrepreneurs juggling academics and business success.',
    author: 'Campus Hustle Team',
    date: '2024-01-05',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop',
    readTime: '6 min read'
  }
];

// Start with sample testimonials - these will be replaced with real reviews
export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Makerere Student',
    university: 'Makerere University',
    rating: 5,
    comment: 'Campus Hustle made it so easy to find quality services across the entire campus. Much better than WhatsApp groups!',
    hustler: 'Platform Review',
    date: '2024-01-12'
  },
  {
    id: '2',
    name: 'Campus Entrepreneur',
    university: 'Makerere University',
    rating: 5,
    comment: 'This platform helped me showcase my business professionally. I now serve students from all halls!',
    hustler: 'Platform Review',
    date: '2024-01-08'
  },
  {
    id: '3',
    name: 'Happy Customer',
    university: 'Makerere University',
    rating: 5,
    comment: 'Clean, professional, and easy to use. Finally, a proper way to connect with entrepreneurs across the entire campus!',
    hustler: 'Platform Review',
    date: '2024-01-05'
  }
];
