'use client';

import React from 'react';
import { useNotification } from '@/context/NotificationContext';
import { NotificationItem } from './NotificationItem';

export const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
      {notifications.map((notification) => (
        <div key={notification.id} className="pointer-events-auto">
          <NotificationItem 
            notification={notification} 
            onClose={removeNotification} 
          />
        </div>
      ))}
    </div>
  );
};
