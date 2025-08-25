import { Event, Booking } from '../types';

export const events: Event[] = [
  {
    id: 'e1',
    title: 'MSH Business Expo',
    description: 'Showcase your business and connect with fellow entrepreneurs.',
    date: '2025-09-10',
    location: 'Mary Stuart Hall Courtyard',
    organizerId: '1',
    image: '/event-expo.jpg',
  },
  {
    id: 'e2',
    title: 'Photography Workshop',
    description: 'Learn photography skills from campus pros.',
    date: '2025-09-15',
    location: 'MSH Seminar Room',
    organizerId: '3',
    image: '/event-photo.jpg',
  },
];

export const bookings: Booking[] = [
  {
    id: 'b1',
    eventId: 'e1',
    userId: '2',
    status: 'confirmed',
    bookedAt: '2025-08-20',
  },
  {
    id: 'b2',
    eventId: 'e2',
    userId: '1',
    status: 'pending',
    bookedAt: '2025-08-22',
  },
];
