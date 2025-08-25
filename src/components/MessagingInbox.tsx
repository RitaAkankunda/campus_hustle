import React, { useState } from 'react';
import { conversations, messages } from '../data/mockMessages';
import { Hustler, Conversation, Message } from '../types';

// For demo, assume current user is hustler with id '1'
const CURRENT_USER_ID = '1';

interface MessagingInboxProps {
  hustlers: Hustler[];
}

const MessagingInbox: React.FC<MessagingInboxProps> = ({ hustlers }) => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [input, setInput] = useState('');
  const [allMessages, setAllMessages] = useState<Message[]>(messages);

  const userConversations = conversations.filter(c => c.participantIds.includes(CURRENT_USER_ID));

  const getOtherParticipant = (c: Conversation) => {
    const otherId = c.participantIds.find(id => id !== CURRENT_USER_ID);
    return hustlers.find(h => h.id === otherId);
  };

  const handleSend = () => {
    if (!selectedConversation || !input.trim()) return;
    const newMsg: Message = {
      id: `m${allMessages.length + 1}`,
      conversationId: selectedConversation.id,
      senderId: CURRENT_USER_ID,
      receiverId: selectedConversation.participantIds.find(id => id !== CURRENT_USER_ID) || '',
      content: input,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setAllMessages([...allMessages, newMsg]);
    setInput('');
  };

  return (
    <div className="flex h-[500px] bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Conversation List */}
      <div className="w-1/3 border-r p-4 overflow-y-auto">
        <h2 className="font-bold text-lg mb-4">Inbox</h2>
        {userConversations.map(conv => {
          const other = getOtherParticipant(conv);
          return (
            <div
              key={conv.id}
              className={`p-3 rounded cursor-pointer mb-2 hover:bg-purple-50 ${selectedConversation?.id === conv.id ? 'bg-purple-100' : ''}`}
              onClick={() => setSelectedConversation(conv)}
            >
              <div className="font-semibold">{other?.name || 'Unknown User'}</div>
              <div className="text-xs text-gray-500 truncate">
                {conv.lastMessage?.content}
              </div>
            </div>
          );
        })}
      </div>
      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="flex items-center border-b p-4">
              <span className="font-bold text-purple-700">
                {getOtherParticipant(selectedConversation)?.name || 'Unknown User'}
              </span>
            </div>
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2">
              {allMessages
                .filter(m => m.conversationId === selectedConversation.id)
                .map(m => (
                  <div
                    key={m.id}
                    className={`max-w-xs px-4 py-2 rounded-lg ${m.senderId === CURRENT_USER_ID ? 'bg-purple-200 self-end' : 'bg-gray-200 self-start'}`}
                  >
                    <div className="text-sm">{m.content}</div>
                    <div className="text-xs text-gray-500 text-right">{new Date(m.timestamp).toLocaleString()}</div>
                  </div>
                ))}
            </div>
            <div className="p-4 border-t flex gap-2">
              <input
                className="flex-1 border rounded px-3 py-2"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type a message..."
                onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
              />
              <button
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                onClick={handleSend}
              >Send</button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingInbox;
