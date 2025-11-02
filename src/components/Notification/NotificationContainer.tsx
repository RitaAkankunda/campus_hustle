import React from 'react';
import Notification, { NotificationProps } from './Notification';

interface NotificationContainerProps {
  notifications: NotificationProps[];
  onRemove: (id: string) => void;
}

// This is now just the UI component - state management is in NotificationProvider
const NotificationContainerUI: React.FC<NotificationContainerProps> = ({ 
  notifications, 
  onRemove 
}) => {
  return (
    <div className="fixed top-4 left-4 right-4 z-50 flex flex-wrap gap-3 justify-center max-h-32 overflow-y-auto">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          {...notification}
          onClose={onRemove}
        />
      ))}
    </div>
  );
};

export default NotificationContainerUI;
