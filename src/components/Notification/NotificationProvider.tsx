import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import Notification, { NotificationProps } from './Notification';

export interface NotificationData {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  duration?: number;
}

interface NotificationContextType {
  notifications: NotificationProps[];
  addNotification: (notificationData: NotificationData & Partial<NotificationProps>) => string;
  showSuccess: (title: string, message: string, duration?: number, options?: Partial<NotificationProps>) => string;
  showError: (title: string, message: string, duration?: number, options?: Partial<NotificationProps>) => string;
  showInfo: (title: string, message: string, duration?: number, options?: Partial<NotificationProps>) => string;
  showWarning: (title: string, message: string, duration?: number, options?: Partial<NotificationProps>) => string;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    // Fallback for when context is not available (shouldn't happen, but prevents crashes)
    return {
      notifications: [],
      addNotification: () => '',
      showSuccess: () => '',
      showError: () => '',
      showInfo: () => '',
      showWarning: () => '',
      removeNotification: () => {},
    };
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const addNotification = useCallback((notificationData: NotificationData & Partial<NotificationProps>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const notification: NotificationProps = {
      id,
      ...notificationData,
      onClose: () => removeNotification(id),
      large: notificationData.large || false,
      className: notificationData.className || '',
    };
    setNotifications(prev => [...prev, notification]);
    
    // Auto-remove after duration
    if (notificationData.duration && notificationData.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, notificationData.duration);
    }
    
    return id;
  }, [removeNotification]);

  const showSuccess = useCallback((title: string, message: string, duration?: number, options?: Partial<NotificationProps>) => {
    return addNotification({ type: 'success', title, message, duration: duration || 5000, ...options });
  }, [addNotification]);

  const showError = useCallback((title: string, message: string, duration?: number, options?: Partial<NotificationProps>) => {
    return addNotification({ type: 'error', title, message, duration: duration || 6000, ...options });
  }, [addNotification]);

  const showInfo = useCallback((title: string, message: string, duration?: number, options?: Partial<NotificationProps>) => {
    return addNotification({ type: 'info', title, message, duration: duration || 4000, ...options });
  }, [addNotification]);

  const showWarning = useCallback((title: string, message: string, duration?: number, options?: Partial<NotificationProps>) => {
    return addNotification({ type: 'warning', title, message, duration: duration || 5000, ...options });
  }, [addNotification]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        showSuccess,
        showError,
        showInfo,
        showWarning,
        removeNotification,
      }}
    >
      {children}
      <NotificationContainer notifications={notifications} onRemove={removeNotification} />
    </NotificationContext.Provider>
  );
};

const NotificationContainer: React.FC<{ notifications: NotificationProps[]; onRemove: (id: string) => void }> = ({
  notifications,
  onRemove,
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

