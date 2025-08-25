import { useState, useEffect } from 'react';

// Commission and earnings management
export interface CommissionTransaction {
  id: string;
  orderId: string;
  entrepreneurId: number;
  entrepreneurName: string;
  productName: string;
  saleAmount: number;
  commissionRate: number;
  commissionAmount: number;
  date: string;
  customerName?: string;
}

export interface SubscriptionPayment {
  id: string;
  entrepreneurId: number;
  entrepreneurName: string;
  planType: 'premium' | 'featured' | 'verification';
  amount: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'cancelled';
}

export interface PlatformEarnings {
  totalCommissions: number;
  totalSubscriptions: number;
  totalAdvertising: number;
  monthlyCommissions: number;
  monthlySubscriptions: number;
  monthlyAdvertising: number;
  transactionCount: number;
  activeSubscribers: number;
  lastUpdated: string;
}

// Hook for managing platform earnings (ADMIN ONLY)
export const usePlatformEarnings = () => {
  const [earnings, setEarnings] = useState<PlatformEarnings>({
    totalCommissions: 0,
    totalSubscriptions: 0,
    totalAdvertising: 0,
    monthlyCommissions: 0,
    monthlySubscriptions: 0,
    monthlyAdvertising: 0,
    transactionCount: 0,
    activeSubscribers: 0,
    lastUpdated: new Date().toISOString()
  });

  const [commissionHistory, setCommissionHistory] = useState<CommissionTransaction[]>([]);
  const [subscriptionHistory, setSubscriptionHistory] = useState<SubscriptionPayment[]>([]);

  // Load earnings data from localStorage
  useEffect(() => {
    const savedEarnings = localStorage.getItem('platformEarnings');
    const savedCommissions = localStorage.getItem('commissionHistory');
    const savedSubscriptions = localStorage.getItem('subscriptionHistory');

    if (savedEarnings) {
      setEarnings(JSON.parse(savedEarnings));
    }
    if (savedCommissions) {
      setCommissionHistory(JSON.parse(savedCommissions));
    }
    if (savedSubscriptions) {
      setSubscriptionHistory(JSON.parse(savedSubscriptions));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('platformEarnings', JSON.stringify(earnings));
  }, [earnings]);

  useEffect(() => {
    localStorage.setItem('commissionHistory', JSON.stringify(commissionHistory));
  }, [commissionHistory]);

  useEffect(() => {
    localStorage.setItem('subscriptionHistory', JSON.stringify(subscriptionHistory));
  }, [subscriptionHistory]);

  // Add commission from a sale
  const addCommission = (transaction: Omit<CommissionTransaction, 'id' | 'commissionAmount' | 'date'>) => {
    const commissionAmount = transaction.saleAmount * (transaction.commissionRate / 100);
    const newTransaction: CommissionTransaction = {
      ...transaction,
      id: `comm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      commissionAmount,
      date: new Date().toISOString()
    };

    setCommissionHistory(prev => [newTransaction, ...prev]);

    // Update earnings
    setEarnings(prev => {
      const currentMonth = new Date().getMonth();
      const transactionMonth = new Date(newTransaction.date).getMonth();
      const isCurrentMonth = currentMonth === transactionMonth;

      return {
        ...prev,
        totalCommissions: prev.totalCommissions + commissionAmount,
        monthlyCommissions: isCurrentMonth 
          ? prev.monthlyCommissions + commissionAmount 
          : prev.monthlyCommissions,
        transactionCount: prev.transactionCount + 1,
        lastUpdated: new Date().toISOString()
      };
    });

    return newTransaction;
  };

  // Add subscription payment
  const addSubscription = (subscription: Omit<SubscriptionPayment, 'id'>) => {
    const newSubscription: SubscriptionPayment = {
      ...subscription,
      id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    setSubscriptionHistory(prev => [newSubscription, ...prev]);

    // Update earnings
    setEarnings(prev => {
      const currentMonth = new Date().getMonth();
      const subscriptionMonth = new Date(newSubscription.startDate).getMonth();
      const isCurrentMonth = currentMonth === subscriptionMonth;

      return {
        ...prev,
        totalSubscriptions: prev.totalSubscriptions + subscription.amount,
        monthlySubscriptions: isCurrentMonth 
          ? prev.monthlySubscriptions + subscription.amount 
          : prev.monthlySubscriptions,
        activeSubscribers: subscription.status === 'active' 
          ? prev.activeSubscribers + 1 
          : prev.activeSubscribers,
        lastUpdated: new Date().toISOString()
      };
    });

    return newSubscription;
  };

  // Calculate commission for a sale
  const calculateCommission = (saleAmount: number, commissionRate: number = 1) => {
    return saleAmount * (commissionRate / 100);
  };

  // Get monthly earnings breakdown
  const getMonthlyBreakdown = (year: number, month: number) => {
    const monthCommissions = commissionHistory.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getFullYear() === year && transactionDate.getMonth() === month;
    });

    const monthSubscriptions = subscriptionHistory.filter(subscription => {
      const subscriptionDate = new Date(subscription.startDate);
      return subscriptionDate.getFullYear() === year && subscriptionDate.getMonth() === month;
    });

    return {
      commissions: monthCommissions.reduce((total, t) => total + t.commissionAmount, 0),
      subscriptions: monthSubscriptions.reduce((total, s) => total + s.amount, 0),
      transactionCount: monthCommissions.length,
      newSubscriptions: monthSubscriptions.length
    };
  };

  // Get top performing entrepreneurs (by commission generated)
  const getTopEntrepreneurs = (limit: number = 10) => {
    const entrepreneurStats = commissionHistory.reduce((acc, transaction) => {
      if (!acc[transaction.entrepreneurId]) {
        acc[transaction.entrepreneurId] = {
          id: transaction.entrepreneurId,
          name: transaction.entrepreneurName,
          totalCommissions: 0,
          transactionCount: 0,
          averageOrderValue: 0
        };
      }
      
      acc[transaction.entrepreneurId].totalCommissions += transaction.commissionAmount;
      acc[transaction.entrepreneurId].transactionCount += 1;
      
      return acc;
    }, {} as Record<number, any>);

    return Object.values(entrepreneurStats)
      .map((stat: any) => ({
        ...stat,
        averageOrderValue: stat.totalCommissions / stat.transactionCount || 0
      }))
      .sort((a, b) => b.totalCommissions - a.totalCommissions)
      .slice(0, limit);
  };

  return {
    earnings,
    commissionHistory,
    subscriptionHistory,
    addCommission,
    addSubscription,
    calculateCommission,
    getMonthlyBreakdown,
    getTopEntrepreneurs
  };
};

// Subscription plans configuration
export const SUBSCRIPTION_PLANS = {
  premium: {
    name: 'Premium',
    price: 10000,
    duration: 30, // days
    features: [
      'Priority support',
      'Advanced analytics',
      'Verified badge',
      'Featured in search results',
      'Multiple product images',
      'Custom product descriptions'
    ]
  },
  featured: {
    name: 'Featured Business',
    price: 15000,
    duration: 30, // days
    features: [
      'Top placement in categories',
      'Homepage featuring',
      'Premium support',
      'Advanced analytics',
      'Promotional badges',
      'Social media promotion'
    ]
  },
  verification: {
    name: 'Verification Badge',
    price: 5000,
    duration: 365, // days (yearly)
    features: [
      'Verified entrepreneur badge',
      'Increased trust',
      'Priority in search',
      'Customer confidence boost'
    ]
  }
};

// Commission rates configuration
export const COMMISSION_RATES = {
  default: 1, // 1% commission
  premium: 0.5, // Reduced commission for premium subscribers
  featured: 0.5, // Reduced commission for featured subscribers
  newEntrepreneur: 0, // No commission for first month (incentive)
  highVolume: 0.75 // Reduced commission for high-volume sellers
};

// Helper function to determine commission rate for an entrepreneur
export const getCommissionRate = (
  entrepreneurId: number,
  subscriptionHistory: SubscriptionPayment[],
  commissionHistory: CommissionTransaction[]
): number => {
  // Check if entrepreneur has active premium subscription
  const hasActivePremium = subscriptionHistory.some(sub => 
    sub.entrepreneurId === entrepreneurId && 
    sub.status === 'active' && 
    (sub.planType === 'premium' || sub.planType === 'featured')
  );

  // Check if entrepreneur is new (first month)
  const entrepreneurTransactions = commissionHistory.filter(t => t.entrepreneurId === entrepreneurId);
  const isNewEntrepreneur = entrepreneurTransactions.length === 0;

  // Check if entrepreneur is high volume (more than 50 transactions)
  const isHighVolume = entrepreneurTransactions.length > 50;

  if (isNewEntrepreneur) return COMMISSION_RATES.newEntrepreneur;
  if (hasActivePremium) return COMMISSION_RATES.premium;
  if (isHighVolume) return COMMISSION_RATES.highVolume;
  
  return COMMISSION_RATES.default;
};

export default usePlatformEarnings;
