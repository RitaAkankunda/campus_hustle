import { Hustler, Category, BlogPost, Testimonial } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Beauty & Hair',
    icon: '💇‍♀️',
    color: 'from-purple-500 to-indigo-500',
    count: 2
  },
  {
    id: '2',
    name: 'Tech & Design',
    icon: '💻',
    color: 'from-blue-500 to-cyan-500',
    count: 0
  },
  {
    id: '3',
    name: 'Snacks & Treats',
    icon: '�',
    color: 'from-teal-500 to-blue-500',
    count: 1
  },
  {
    id: '4',
    name: 'Events & Photography',
    icon: '📸',
    color: 'from-indigo-500 to-purple-500',
    count: 0
  },
  {
    id: '5',
    name: 'Academics',
    icon: '📚',
    color: 'from-blue-600 to-purple-600',
    count: 0
  },
  {
    id: '6',
    name: 'Totebag & Accessories',
    icon: '👜',
    color: 'from-purple-600 to-blue-600',
    count: 0
  }
];

// Sample MSH Entrepreneurs - ready for real Mary Stuart Hall entrepreneurs!
export const hustlers: Hustler[] = [
  {
    id: '1',
    name: 'Aisha Nakimuli',
    bio: 'Professional hair braiding specialist with 3+ years experience. Expert in box braids, cornrows, and protective styles.',
    profileImage: 'https://images.unsplash.com/photo-1560472355-a9a6ea34c729?w=400&h=300&fit=crop&crop=center',
    services: ['Box Braids', 'Cornrows', 'Protective Styles', 'Hair Extensions'],
    pricing: 'From 15,000 UGX',
    whatsapp: '0701234567',
    rating: 4.9,
    reviewCount: 150,
    category: 'Beauty & Hair',
    location: 'Mary Stuart Hall - Block A',
    university: 'Makerere University',
    featured: true,
    joinedDate: '2024-01-15',
    portfolio: [],
    badges: [
      { id: 'top-rated', label: 'Top Rated', icon: '⭐', description: 'Consistently rated 4.8+ by customers' },
      { id: 'early-bird', label: 'Early Bird', icon: '🐦', description: 'Joined in the first month' }
    ],
    achievements: [
      { id: '100-sales', title: '100+ Sales', description: 'Completed over 100 sales', date: '2024-06-01' }
    ],
    products: [
      {
        id: 'p1',
        name: 'Box Braids - Medium Size',
        description: 'Beautiful medium-sized box braids that last 6-8 weeks. Perfect protective style for busy students.',
        price: '25,000 UGX',
        images: ['https://images.unsplash.com/photo-1560472355-a9a6ea34c729?w=500&h=400&fit=crop'],
        category: 'Hair Braiding',
        inStock: true,
        createdDate: '2024-02-01',
        updatedDate: '2024-02-01'
      },
      {
        id: 'p2',
        name: 'Cornrows with Extensions',
        description: 'Stylish cornrows with quality extensions. Various patterns available.',
        price: '20,000 UGX',
        images: ['https://images.unsplash.com/photo-1594736797933-d0ca2e3a7ad7?w=500&h=400&fit=crop'],
        category: 'Hair Braiding',
        inStock: true,
        createdDate: '2024-02-01',
        updatedDate: '2024-02-01'
      },
      {
        id: 'p3',
        name: 'Hair Extensions - Premium Quality',
        description: 'High-quality hair extensions in various colors and lengths.',
        price: '15,000 UGX',
        images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=400&fit=crop'],
        category: 'Hair Extensions',
        inStock: true,
        createdDate: '2024-02-01',
        updatedDate: '2024-02-01'
      }
    ]
  },
  {
    id: '2',
    name: 'Grace Namugga',
    bio: 'Professional makeup artist specializing in bridal, event, and photoshoot makeup. Creating stunning looks for every occasion.',
    profileImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop&crop=center',
    services: ['Bridal Makeup', 'Event Makeup', 'Photoshoot Makeup', 'Makeup Lessons'],
    pricing: 'From 20,000 UGX',
    whatsapp: '0789876543',
    rating: 4.8,
    reviewCount: 89,
    category: 'Beauty & Hair',
    location: 'Mary Stuart Hall - Block C',
    university: 'Makerere University',
    featured: true,
    joinedDate: '2024-02-01',
    portfolio: [],
    badges: [
      { id: 'featured', label: 'Featured', icon: '🌟', description: 'Handpicked by the admin' }
    ],
    achievements: [
      { id: '50-reviews', title: '50+ Reviews', description: 'Received over 50 customer reviews', date: '2024-07-01' }
    ],
    products: [
      {
        id: 'p4',
        name: 'Bridal Makeup Package',
        description: 'Complete bridal makeup including trial session. Perfect for your special day!',
        price: '80,000 UGX',
        images: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=400&fit=crop'],
        category: 'Makeup Services',
        inStock: true,
        createdDate: '2024-02-01',
        updatedDate: '2024-02-01'
      },
      {
        id: 'p5',
        name: 'Event Makeup',
        description: 'Professional makeup for parties, graduations, and special events.',
        price: '35,000 UGX',
        images: ['https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&h=400&fit=crop'],
        category: 'Makeup Services',
        inStock: true,
        createdDate: '2024-02-01',
        updatedDate: '2024-02-01'
      },
      {
        id: 'p6',
        name: 'Makeup Lesson (1-on-1)',
        description: 'Learn professional makeup techniques in a private session.',
        price: '25,000 UGX',
        images: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=400&fit=crop'],
        category: 'Makeup Education',
        inStock: true,
        createdDate: '2024-02-01',
        updatedDate: '2024-02-01'
      }
    ]
  },
  {
    id: '3',
    name: 'Joy Mbabazi',
    bio: 'Snacks and treats supplier for MSH. I bring you fresh packaged snacks, drinks, and treats from trusted suppliers around campus.',
    profileImage: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop&crop=center',
    services: ['Fresh Snacks', 'Drinks & Beverages', 'Packaged Treats', 'Party Supplies'],
    pricing: 'From 2,000 UGX',
    whatsapp: '0756543210',
    rating: 5.0,
    reviewCount: 200,
    category: 'Snacks & Treats',
    location: 'Mary Stuart Hall - Ground Floor',
    university: 'Makerere University',
    featured: true,
    joinedDate: '2023-12-10',
    portfolio: [],
    badges: [
      { id: 'super-seller', label: 'Super Seller', icon: '🔥', description: 'Top sales in snacks & treats' }
    ],
    achievements: [
      { id: '200-reviews', title: '200+ Reviews', description: 'Received over 200 customer reviews', date: '2024-08-01' }
    ],
    products: [
      {
        id: 'p7',
        name: 'Snack Pack (Assorted)',
        description: 'Mixed snack pack with biscuits, chips, and sweets. Perfect for study sessions!',
        price: '8,000 UGX',
        images: ['https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500&h=400&fit=crop'],
        category: 'Snacks',
        inStock: true,
        createdDate: '2024-02-01',
        updatedDate: '2024-02-01'
      },
      {
        id: 'p8',
        name: 'Fresh Juice (500ml)',
        description: 'Fresh fruit juices - passion, mango, or mixed fruits. Delivered fresh daily.',
        price: '3,500 UGX',
        images: ['https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=500&h=400&fit=crop'],
        category: 'Beverages',
        inStock: true,
        createdDate: '2024-02-01',
        updatedDate: '2024-02-01'
      },
      {
        id: 'p9',
        name: 'Packaged Cookies',
        description: 'Quality packaged chocolate chip cookies, perfect for snacking.',
        price: '8,000 UGX',
        images: ['https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&h=400&fit=crop'],
        category: 'Packaged Snacks',
        inStock: true,
        createdDate: '2024-02-01',
        updatedDate: '2024-02-01'
      },
      {
        id: 'p10',
        name: 'Pre-made Sandwiches (3 pieces)',
        description: 'Fresh pre-made sandwiches with various fillings. Perfect grab-and-go lunch option!',
        price: '12,000 UGX',
        images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=400&fit=crop'],
        category: 'Ready-to-Eat',
        inStock: true,
        createdDate: '2024-02-01',
        updatedDate: '2024-02-01'
      }
    ]
  }
];

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
