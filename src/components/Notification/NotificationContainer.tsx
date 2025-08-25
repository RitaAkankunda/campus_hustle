import React, { useState, useCallback } from 'react';
import Notification, { NotificationProps } from './Notification';

export interface NotificationData {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  duration?: number;
}

interface NotificationContainerProps {
  notifications: NotificationProps[];
  onRemove: (id: string) => void;
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({ 
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

// Hook for managing notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);


  const addNotification = useCallback((notificationData: NotificationData & Partial<NotificationProps>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const notification: NotificationProps = {
      id,
      ...notificationData,
      onClose: () => {}, // Will be set by the container
      large: notificationData.large || false,
      className: notificationData.className || '',
    };
    setNotifications(prev => [...prev, notification]);
    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);


  const showSuccess = useCallback((title: string, message: string, duration?: number, options?: Partial<NotificationProps>) => {
    return addNotification({ type: 'success', title, message, duration, ...options });
  }, [addNotification]);

  const showError = useCallback((title: string, message: string, duration?: number, options?: Partial<NotificationProps>) => {
    return addNotification({ type: 'error', title, message, duration, ...options });
  }, [addNotification]);

  const showInfo = useCallback((title: string, message: string, duration?: number, options?: Partial<NotificationProps>) => {
    return addNotification({ type: 'info', title, message, duration, ...options });
  }, [addNotification]);

  const showWarning = useCallback((title: string, message: string, duration?: number, options?: Partial<NotificationProps>) => {
    return addNotification({ type: 'warning', title, message, duration, ...options });
  }, [addNotification]);

  return {
    notifications,
    addNotification,
    removeNotification,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    NotificationContainer: () => (
      <NotificationContainer 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
    )
  };
};

export default NotificationContainer;
