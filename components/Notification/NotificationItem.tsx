'use client';

import React from 'react';
import { Notification, NotificationType } from '@/context/NotificationContext';
import { 
  CheckCircleIcon, 
  ExclamationCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon, 
  XMarkIcon 
} from '@heroicons/react/24/outline';

interface NotificationItemProps {
  notification: Notification;
  onClose: (id: string) => void;
}

const icons: Record<NotificationType, React.ElementType> = {
  success: CheckCircleIcon,
  error: ExclamationCircleIcon,
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon,
};

const styles: Record<NotificationType, string> = {
  success: 'bg-green-500/10 border-green-500/20 text-green-400',
  error: 'bg-red-500/10 border-red-500/20 text-red-400',
  warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
  info: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
};

const iconColors: Record<NotificationType, string> = {
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500',
};

export const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onClose }) => {
  const Icon = icons[notification.type];

  return (
    <div className={`
      relative overflow-hidden flex items-start gap-4 p-4 rounded-xl border backdrop-blur-md 
      transition-all duration-300 animate-in fade-in slide-in-from-right-4
      ${styles[notification.type]}
    `}>
      <div className={`p-1 rounded-lg ${iconColors[notification.type]} bg-white/5`}>
        <Icon className="w-5 h-5" />
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-5">
          {notification.message}
        </p>
        
        {notification.action && (
          <button 
            onClick={() => {
              notification.action?.onClick();
              onClose(notification.id);
            }}
            className="mt-2 text-xs font-bold uppercase tracking-wider hover:opacity-80 transition-opacity"
          >
            {notification.action.label} →
          </button>
        )}
      </div>

      <button 
        onClick={() => onClose(notification.id)}
        className="shrink-0 text-white/40 hover:text-white transition-colors"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>

      {/* Progress Bar for duration */}
      {notification.duration !== 0 && (
        <div className="absolute bottom-0 left-0 h-0.5 bg-current opacity-20 w-full animate-progress" 
             style={{ animationDuration: `${notification.duration || 5000}ms` }} />
      )}
    </div>
  );
};
