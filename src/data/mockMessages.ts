import { Message, Conversation } from '../types';

// In-memory mock data for demo
export const conversations: Conversation[] = [
  {
    id: 'c1',
    participantIds: ['1', '2'],
    updatedAt: '2025-08-24T10:00:00Z',
    lastMessage: {
      id: 'm1',
      conversationId: 'c1',
      senderId: '1',
      receiverId: '2',
      content: 'Hi Grace! Are you available for a makeup session this weekend?',
      timestamp: '2025-08-24T09:59:00Z',
      read: true,
    },
  },
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
    id: 'm1',
    conversationId: 'c1',
    senderId: '1',
    receiverId: '2',
    content: 'Hi Grace! Are you available for a makeup session this weekend?',
    timestamp: '2025-08-24T09:59:00Z',
    read: true,
  },
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
