import React, { useState } from 'react';
import {
  NotificationBanner,
  NotificationType,
} from '../../../components/shared/NotificationBaner/NotificationBaner';
import SectionHeading from '../../createCompany/components/SectionHeading';

const NotificationsElements = () => {
  const [notifications, setNotifications] = useState<
    {
      id: string;
      type: NotificationType;
      title: string;
      message: string;
      isVisible: boolean;
    }[]
  >([]);

  const showNotification = (type: NotificationType) => {
    const id = Math.random().toString(36).substring(2, 9);

    const notificationContent = {
      simple: {
        title: 'Information',
        message: 'This is a simple notification with some information.',
      },
      warning: {
        title: 'Warning',
        message: 'Please be careful! This is a warning notification.',
      },
      critical: {
        title: 'Critical Error',
        message: 'Something went wrong. Please try again later.',
      },
      done: {
        title: 'Success',
        message: 'Your action has been completed successfully!',
      },
    };

    const { title, message } = notificationContent[type];

    setNotifications([
      ...notifications,
      { id, type, title, message, isVisible: true },
    ]);
  };

  const dismissNotification = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, isVisible: false }
          : notification
      )
    );

    // Clean up dismissed notifications after animation completes
    setTimeout(() => {
      setNotifications(
        notifications.filter((notification) => notification.id !== id)
      );
    }, 300);
  };

  return (
    <main className="flex flex-col items-start justify-start mb-20">
      <div className="w-full max-w-md space-y-8">
        <div>
          <SectionHeading
            text={'Notification Banners'}
            status={false}
            hideStatus={true}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div
            onClick={() => showNotification('simple')}
            className="border hover:cursor-pointer rounded-md h-20 flex flex-col items-center justify-center"
          >
            <span className="font-medium">Simple</span>
            <span className="text-xs text-gray-500">
              White background, black text
            </span>
          </div>

          <div
            onClick={() => showNotification('warning')}
            className="border hover:cursor-pointer rounded-md h-20 flex flex-col items-center justify-center bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
          >
            <span className="font-medium">Warning</span>
            <span className="text-xs text-amber-700">
              Yellow background, black text
            </span>
          </div>

          <div
            onClick={() => showNotification('critical')}
            className="border hover:cursor-pointer rounded-md h-20 flex flex-col items-center justify-center bg-red-600 text-white border-red-700 hover:bg-red-700"
          >
            <span className="font-medium">Critical</span>
            <span className="text-xs text-white/90">
              Red background, white text
            </span>
          </div>

          <div
            onClick={() => showNotification('done')}
            className="border hover:cursor-pointer rounded-md h-20 flex flex-col items-center justify-center bg-green-600 text-white border-green-700 hover:bg-green-700"
          >
            <span className="font-medium">Done</span>
            <span className="text-xs text-white/90">
              Green background, white text
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          Click the buttons below to show different types of notifications
        </p>
      </div>

      {notifications.map((notification) => (
        <NotificationBanner
          key={notification.id}
          type={notification.type}
          title={notification.title}
          message={notification.message}
          isVisible={notification.isVisible}
          onDismiss={() => dismissNotification(notification.id)}
        />
      ))}
    </main>
  );
};

export default NotificationsElements;
