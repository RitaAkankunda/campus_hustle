import { Hustler, Category, BlogPost, Testimonial } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Beauty & Hair',
    icon: '💇‍♀️',
    color: 'from-pink-400 to-purple-500',
    count: 45
  },
  {
    id: '2',
    name: 'Tech & Design',
    icon: '💻',
    color: 'from-blue-400 to-cyan-500',
    count: 32
  },
  {
    id: '3',
    name: 'Food & Catering',
    icon: '🍰',
    color: 'from-yellow-400 to-orange-500',
    count: 38
  },
  {
    id: '4',
    name: 'Events & Photography',
    icon: '📸',
    color: 'from-green-400 to-teal-500',
    count: 28
  },
  {
    id: '5',
    name: 'Academics',
    icon: '📚',
    color: 'from-indigo-400 to-purple-500',
    count: 41
  },
  {
    id: '6',
    name: 'Totebag & Accessories',
    icon: '👜',
    color: 'from-pink-400 to-rose-500',
    count: 23
  }
];

export const hustlers: Hustler[] = [
  {
    id: '1',
    name: 'Sarah Namukasa',
    university: 'Makerere University',
    category: 'Beauty & Hair',
    location: 'Kikoni',
    bio: 'Professional braider specializing in protective styles. Available weekends and evenings.',
    profileImage: 'https://via.placeholder.com/400x400/8B5CF6/FFFFFF?text=Sarah+N',
    whatsapp: '+256701234567',
    rating: 4.9,
    reviewCount: 27,
    portfolio: [
      'https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=Hair+Work+1',
      'https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=Hair+Work+2'
    ],
    featured: true,
    joinedDate: '2023-09-15',
    services: ['Box Braids', 'Cornrows', 'Twists'],
    pricing: '15K - 80K UGX'
  },
  {
    id: '2',
    name: 'David Okello',
    university: 'Kyambogo University',
    category: 'Tech & Design',
    location: 'Banda',
    bio: 'Full-stack developer and UI/UX designer. Building websites and mobile apps for local businesses.',
    profileImage: 'https://via.placeholder.com/400x400/3B82F6/FFFFFF?text=David+O',
    whatsapp: '+256702345678',
    rating: 4.8,
    reviewCount: 19,
    portfolio: [
      'https://via.placeholder.com/600x400/3B82F6/FFFFFF?text=Website+Design',
      'https://via.placeholder.com/600x400/3B82F6/FFFFFF?text=Mobile+App'
    ],
    featured: true,
    joinedDate: '2023-08-20',
    services: ['Website Design', 'Mobile Apps', 'Logo Design'],
    pricing: '50K - 500K UGX'
  },
  {
    id: '3',
    name: 'Grace Atim',
    university: 'MUBS',
    category: 'Food & Catering',
    location: 'Nakawa',
    bio: 'Custom cakes and pastries for all occasions. Specializing in birthday and wedding cakes.',
    profileImage: 'https://via.placeholder.com/400x400/F97316/FFFFFF?text=Grace+A',
    whatsapp: '+256703456789',
    rating: 5.0,
    reviewCount: 34,
    portfolio: [
      'https://via.placeholder.com/600x400/F97316/FFFFFF?text=Wedding+Cake',
      'https://via.placeholder.com/600x400/F97316/FFFFFF?text=Birthday+Cake'
    ],
    featured: true,
    joinedDate: '2023-07-10',
    services: ['Wedding Cakes', 'Birthday Cakes', 'Cupcakes'],
    pricing: '25K - 300K UGX'
  },
  {
    id: '4',
    name: 'Jennifer Nakato',
    university: 'UCU',
    category: 'Academics',
    location: 'Mukono',
    bio: 'Mathematics and Physics tutor with 3+ years experience. Available for one-on-one and group sessions.',
    profileImage: 'https://via.placeholder.com/400x400/8B5CF6/FFFFFF?text=Jennifer+N',
    whatsapp: '+256705678901',
    rating: 4.9,
    reviewCount: 42,
    portfolio: [],
    featured: false,
    joinedDate: '2023-06-15',
    services: ['Math Tutoring', 'Physics Tutoring', 'Exam Prep'],
    pricing: '10K - 30K UGX/hour'
  },
  {
    id: '5',
    name: 'Mercy Akello',
    university: 'Makerere University',
    category: 'Totebag & Accessories',
    location: 'Wandegeya',
    bio: 'Custom totebags, jewelry, and fashion accessories. Specializing in personalized designs for students.',
    profileImage: 'https://via.placeholder.com/400x400/EC4899/FFFFFF?text=Mercy+A',
    whatsapp: '+256706789012',
    rating: 4.7,
    reviewCount: 18,
    portfolio: [
      'https://via.placeholder.com/600x400/EC4899/FFFFFF?text=Custom+Totebags',
      'https://via.placeholder.com/600x400/EC4899/FFFFFF?text=Fashion+Accessories'
    ],
    featured: false,
    joinedDate: '2023-10-05',
    services: ['Custom Totebags', 'Jewelry', 'Hair Accessories', 'Phone Cases'],
    pricing: '5K - 50K UGX'
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Price Your Services as a Student',
    excerpt: 'Learn the art of competitive pricing without undervaluing your work. Tips from successful campus hustlers.',
    author: 'Sarah Namukasa',
    date: '2024-01-15',
    image: 'https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=Pricing+Tips',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'From Hostel to 500K Monthly: My Hair Business Journey',
    excerpt: 'How I built a thriving hair braiding business from my university hostel room.',
    author: 'Grace Atim',
    date: '2024-01-10',
    image: 'https://via.placeholder.com/600x400/F97316/FFFFFF?text=Hair+Business',
    readTime: '8 min read'
  },
  {
    id: '3',
    title: 'Balancing Books and Business at MUK',
    excerpt: 'Time management strategies for student entrepreneurs juggling academics and business.',
    author: 'David Okello',
    date: '2024-01-05',
    image: 'https://via.placeholder.com/600x400/3B82F6/FFFFFF?text=Time+Management',
    readTime: '6 min read'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Patricia Nalwanga',
    university: 'Makerere University',
    rating: 5,
    comment: 'Sarah did an amazing job on my box braids! Very professional and affordable. Highly recommend!',
    hustler: 'Sarah Namukasa',
    date: '2024-01-12'
  },
  {
    id: '2',
    name: 'John Ssemakula',
    university: 'MUBS',
    rating: 5,
    comment: 'David built our student association website. Great quality work and very responsive to feedback.',
    hustler: 'David Okello',
    date: '2024-01-08'
  },
  {
    id: '3',
    name: 'Mary Asiimwe',
    university: 'Kyambogo University',
    rating: 5,
    comment: 'Grace made the most beautiful birthday cake for my sister. Tasted as good as it looked!',
    hustler: 'Grace Atim',
    date: '2024-01-05'
  },
  {
    id: '4',
    name: 'Rebecca Nambi',
    university: 'Kyambogo University',
    rating: 5,
    comment: 'Mercy made me a beautiful custom totebag with my name on it. Great quality and fast delivery!',
    hustler: 'Mercy Akello',
    date: '2024-01-03'
  }
];