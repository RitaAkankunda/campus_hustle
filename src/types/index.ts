// Events & Bookings
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  organizerId: string;
  image?: string;
}

export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  bookedAt: string;
}
// Gamification & Rewards
export interface GamificationReward {
  id: string;
  type: 'badge' | 'points' | 'level' | 'coupon' | 'event' | 'booking';
  name: string;
  description: string;
  icon?: string;
  value?: number;
  awardedAt: string;
  eventId?: string;
  bookingId?: string;
}
// Messaging types
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantIds: string[]; // [userId1, userId2]
  lastMessage?: Message;
  updatedAt: string;
}
export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
  category: string;
  inStock: boolean;
  createdDate: string;
  updatedDate: string;
}

export interface Hustler {
  featured?: boolean; // If true, hustler is featured/promoted
  id: string;
  name: string;
  university: string;
  category: string;
  location: string;
  bio: string;
  profileImage: string;
  whatsapp: string;
  rating: number;
  reviewCount: number;
  portfolio: string[];
  featured: boolean;
  joinedDate: string;
  services: string[];
  pricing: string;
  products: Product[];
  badges?: Badge[];
  achievements?: Achievement[];
}

export interface Badge {
  id: string;
  label: string;
  icon: string; // emoji or icon name
  description?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description?: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  readTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  university: string;
  rating: number;
  comment: string;
  hustler: string;
  date: string;
}