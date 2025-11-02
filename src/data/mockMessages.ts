import { Message, Conversation } from '../types';

// In-memory mock data for demo
export const conversations: Conversation[] = [
  {
    id: 'c2',
    participantIds: ['2', '3'],
    updatedAt: '2025-08-23T15:30:00Z',
    lastMessage: {
      id: 'm2',
      conversationId: 'c2',
      senderId: '2',
      receiverId: '3',
      content: 'Thanks for the snacks delivery! Everything was fresh.',
      timestamp: '2025-08-23T15:29:00Z',
      read: false,
    },
  },
];

export const messages: Message[] = [
  {
    id: 'm2',
    conversationId: 'c2',
    senderId: '2',
    receiverId: '3',
    content: 'Thanks for the snacks delivery! Everything was fresh.',
    timestamp: '2025-08-23T15:29:00Z',
    read: false,
  },
];
