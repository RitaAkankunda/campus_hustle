import { GamificationReward } from '../types';

export const rewards: GamificationReward[] = [
  {
    id: 'r1',
    type: 'badge',
    name: 'Early Adopter',
    description: 'Joined MSH Connect in the first month!',
    icon: '🚀',
    awardedAt: '2025-08-01',
  },
  {
    id: 'r2',
    type: 'points',
    name: '100 Points',
    description: 'Earned 100 engagement points.',
    value: 100,
    icon: '💎',
    awardedAt: '2025-08-10',
  },
  {
    id: 'r3',
    type: 'coupon',
    name: '5% Off',
    description: '5% discount coupon for any service.',
    icon: '🎟️',
    awardedAt: '2025-08-15',
  },
  {
    id: 'r4',
    type: 'event',
    name: 'Event Star',
    description: 'Attended 3+ campus events.',
    icon: '🎉',
    awardedAt: '2025-08-20',
    eventId: 'e1',
  },
  {
    id: 'r5',
    type: 'booking',
    name: 'Booking Champ',
    description: 'Completed 5 bookings in a month.',
    icon: '📅',
    awardedAt: '2025-08-22',
    bookingId: 'b1',
  },
];
