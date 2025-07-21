export interface Hustler {
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