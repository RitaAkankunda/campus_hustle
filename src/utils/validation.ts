import * as z from 'zod';

// User validation schemas
export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name too long'),
  email: z.string().email('Invalid email address').endsWith('@students.mak.ac.ug', 'Must use Makerere student email'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
           'Password must contain uppercase, lowercase, number and special character'),
  confirmPassword: z.string(),
  hall: z.enum(['Mary Stuart Hall'], { required_error: 'Please select your hall' }),
  year: z.enum(['1', '2', '3', '4', '5'], { required_error: 'Please select your year' }),
  course: z.string().min(2, 'Course name required').max(100, 'Course name too long'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password required'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address').endsWith('@students.mak.ac.ug', 'Must use Makerere student email'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
           'Password must contain uppercase, lowercase, number and special character'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Entrepreneur profile validation
export const entrepreneurProfileSchema = z.object({
  name: z.string().min(2, 'Name required').max(50, 'Name too long'),
  bio: z.string().min(10, 'Bio must be at least 10 characters').max(500, 'Bio too long'),
  category: z.string().min(1, 'Category required'),
  services: z.array(z.string()).min(1, 'At least one service required').max(10, 'Too many services'),
  whatsapp: z.string().regex(/^\+256[0-9]{9}$/, 'Invalid Ugandan phone number format (+256XXXXXXXXX)'),
  location: z.enum(['Mary Stuart Hall', 'Lumumba Hall', 'Mitchell Hall', 'University Hall', 'Complex'], { 
    required_error: 'Location required' 
  }),
  pricing: z.string().min(1, 'Pricing information required').max(100, 'Pricing info too long'),
});

// Product validation
export const productSchema = z.object({
  name: z.string().min(2, 'Product name required').max(100, 'Name too long'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000, 'Description too long'),
  price: z.string().regex(/^[0-9,]+\s*(UGX|ugx)$/i, 'Price must be in format "10,000 UGX"'),
  category: z.string().min(1, 'Category required'),
  inStock: z.boolean(),
});

// Contact/Booking validation
export const contactSchema = z.object({
  name: z.string().min(2, 'Name required').max(50, 'Name too long'),
  phone: z.string().regex(/^\+256[0-9]{9}$/, 'Invalid Ugandan phone number format (+256XXXXXXXXX)'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message too long'),
});

// Review validation
export const reviewSchema = z.object({
  rating: z.number().min(1, 'Rating required').max(5, 'Rating must be 1-5'),
  comment: z.string().min(10, 'Comment must be at least 10 characters').max(500, 'Comment too long'),
  entrepreneurId: z.string().min(1, 'Entrepreneur ID required'),
});

// Search validation
export const searchSchema = z.object({
  query: z.string().max(100, 'Search query too long').optional(),
  category: z.string().optional(),
  location: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
}).refine((data) => {
  if (data.minPrice && data.maxPrice) {
    return data.minPrice <= data.maxPrice;
  }
  return true;
}, {
  message: "Minimum price must be less than maximum price",
  path: ["minPrice"],
});

// Type exports
export type SignupFormData = z.infer<typeof signupSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type EntrepreneurProfileData = z.infer<typeof entrepreneurProfileSchema>;
export type ProductData = z.infer<typeof productSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type ReviewData = z.infer<typeof reviewSchema>;
export type SearchFormData = z.infer<typeof searchSchema>;
