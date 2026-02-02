interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

class Analytics {
  private static instance: Analytics;

  private constructor() {
    // Initialize analytics in production only
    if (import.meta.env.PROD && import.meta.env.VITE_GA_TRACKING_ID) {
      this.initGoogleAnalytics();
    }
  }

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  private initGoogleAnalytics() {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_TRACKING_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function(...args: unknown[]) {
      window.dataLayer.push(args);
    };
    
    window.gtag('js', new Date());
    window.gtag('config', import.meta.env.VITE_GA_TRACKING_ID);
  }

  // Track page views
  trackPageView(path: string) {
    if (import.meta.env.PROD && window.gtag) {
      window.gtag('config', import.meta.env.VITE_GA_TRACKING_ID, {
        page_path: path,
      });
    }
  }

  // Track events
  trackEvent({ action, category, label, value }: AnalyticsEvent) {
    if (import.meta.env.PROD && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }

    // Also log in development for debugging
    if (import.meta.env.DEV) {
      console.log('Analytics Event:', { action, category, label, value });
    }
  }

  // Specific tracking methods
  trackEntrepreneurView(entrepreneurId: string, entrepreneurName: string) {
    this.trackEvent({
      action: 'view_entrepreneur',
      category: 'entrepreneur',
      label: `${entrepreneurId}-${entrepreneurName}`,
    });
  }

  trackServiceInquiry(serviceType: string, entrepreneurId: string) {
    this.trackEvent({
      action: 'service_inquiry',
      category: 'engagement',
      label: `${serviceType}-${entrepreneurId}`,
    });
  }

  trackWhatsAppContact(entrepreneurId: string) {
    this.trackEvent({
      action: 'whatsapp_contact',
      category: 'contact',
      label: entrepreneurId,
    });
  }

  trackCategoryView(categoryName: string) {
    this.trackEvent({
      action: 'view_category',
      category: 'navigation',
      label: categoryName,
    });
  }

  trackSearch(searchTerm: string, resultsCount: number) {
    this.trackEvent({
      action: 'search',
      category: 'search',
      label: searchTerm,
      value: resultsCount,
    });
  }

  trackSignup(method: 'email' | 'google' | 'facebook') {
    this.trackEvent({
      action: 'sign_up',
      category: 'authentication',
      label: method,
    });
  }

  trackLogin(method: 'email' | 'google' | 'facebook') {
    this.trackEvent({
      action: 'login',
      category: 'authentication',
      label: method,
    });
  }
}

// Global analytics instance
export const analytics = Analytics.getInstance();

// Type definitions for global gtag
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
