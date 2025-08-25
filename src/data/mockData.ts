import { Hustler, Category, BlogPost, Testimonial } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Beauty & Hair',
    icon: '💇‍♀️',
    color: 'from-pink-400 to-purple-500',
    count: 0
  },
  {
    id: '2',
    name: 'Tech & Design',
    icon: '💻',
    color: 'from-blue-400 to-cyan-500',
    count: 0
  },
  {
    id: '3',
    name: 'Food & Catering',
    icon: '🍰',
    color: 'from-yellow-400 to-orange-500',
    count: 0
  },
  {
    id: '4',
    name: 'Events & Photography',
    icon: '📸',
    color: 'from-green-400 to-teal-500',
    count: 0
  },
  {
    id: '5',
    name: 'Academics',
    icon: '📚',
    color: 'from-indigo-400 to-purple-500',
    count: 0
  },
  {
    id: '6',
    name: 'Totebag & Accessories',
    icon: '👜',
    color: 'from-pink-400 to-rose-500',
    count: 0
  }
];

// Start with empty hustlers array - ready for real Makerere University entrepreneurs!
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