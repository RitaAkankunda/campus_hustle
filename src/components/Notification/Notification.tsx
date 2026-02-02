import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle, AlertCircle, X, Info, AlertTriangle } from 'lucide-react';


export interface NotificationProps {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
  large?: boolean; // If true, make notification bigger
  className?: string; // For custom styling
}

const Notification: React.FC<NotificationProps> = ({ 
  id, 
  type, 
  title, 
  message, 
  duration = 5000, 
  onClose, 
  large = false, 
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, handleClose]);

  const handleClose = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose(id);
    }, 300);
  }, [onClose, id]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      case 'info':
      default:
        return <Info className="h-6 w-6 text-blue-500" />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-green-200';
      case 'error':
        return 'border-red-200';
      case 'warning':
        return 'border-yellow-200';
      case 'info':
      default:
        return 'border-blue-200';
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50';
      case 'error':
        return 'bg-red-50';
      case 'warning':
        return 'bg-yellow-50';
      case 'info':
      default:
        return 'bg-blue-50';
    }
  };

  return (
    <div
      className={`
        ${large ? 'max-w-lg min-w-[350px] p-6 text-lg' : 'max-w-xs min-w-64 p-4 text-base'}
        w-auto bg-white shadow-lg rounded-lg border-l-4
        ${getBorderColor()} ${getBackgroundColor()}
        transform transition-all duration-300 ease-in-out
        ${isLeaving ? 'translate-y-[-100px] opacity-0' : 'translate-y-0 opacity-100'}
        ${className}
      `}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3 w-0 flex-1">
          <p className={`font-semibold text-gray-900 mb-1 ${large ? 'text-lg' : 'text-sm'}`}>{title}</p>
          <p className={`text-gray-600 ${large ? 'text-base' : 'text-sm'}`}>{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            onClick={handleClose}
            className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      {/* Progress bar for auto-dismiss */}
      {duration > 0 && (
        <div className="h-1 bg-gray-200 rounded-b-lg overflow-hidden mt-2">
          <div
            className={`h-full bg-gradient-to-r transition-all ease-linear animate-progress-shrink ${
              type === 'success' ? 'from-green-400 to-green-600' :
              type === 'error' ? 'from-red-400 to-red-600' :
              type === 'warning' ? 'from-yellow-400 to-yellow-600' : 'from-blue-400 to-blue-600'
            }`}
            style={{
              animation: `progress-shrink ${duration}ms linear forwards`
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Notification;
