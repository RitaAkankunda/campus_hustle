// Security utility functions
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<script[^>]*>.*?<\/script>/gi, '') // Remove script tags
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .trim();
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.endsWith('@students.mak.ac.ug');
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+256[0-9]{9}$/;
  return phoneRegex.test(phone);
};

export const generateSecureId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

export const maskSensitiveData = (data: string, type: 'email' | 'phone'): string => {
  if (type === 'email') {
    const [local, domain] = data.split('@');
    return `${local.slice(0, 2)}***@${domain}`;
  }
  
  if (type === 'phone') {
    return `${data.slice(0, 4)}***${data.slice(-3)}`;
  }
  
  return data;
};

// Rate limiting for client-side (basic implementation)
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  isAllowed(key: string, limit: number, windowMs: number): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < windowMs);
    
    if (validRequests.length >= limit) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(key, validRequests);
    return true;
  }
}

export const rateLimiter = new RateLimiter();
