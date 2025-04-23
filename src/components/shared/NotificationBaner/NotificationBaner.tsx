import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { classNames } from '../../../utils/helpers';
import {
  IoCheckmarkCircleSharp,
  IoInformationCircle,
  IoWarning,
} from 'react-icons/io5';
import { IoIosAlert } from 'react-icons/io';

export type NotificationType = 'simple' | 'warning' | 'critical' | 'done';

export interface NotificationBannerProps {
  type?: NotificationType;
  title: string;
  message?: string;
  duration?: number | null; // null means it won't auto-dismiss
  position?: 'top' | 'bottom';
  onDismiss?: () => void;
  isVisible?: boolean;
}

export function NotificationBanner({
  type = 'simple',
  title,
  message,
  duration = 5000,
  position = 'top',
  onDismiss,
  isVisible = true,
}: NotificationBannerProps) {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  useEffect(() => {
    if (duration && visible) {
      const timer = setTimeout(() => {
        setVisible(false);
        onDismiss?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, visible, onDismiss]);

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  const variants = {
    hidden: {
      opacity: 0,
      y: position === 'top' ? -20 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: position === 'top' ? -20 : 20,
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    },
  };

  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <IoWarning className="h-5 w-5" />;
      case 'critical':
        return <IoIosAlert className="h-5 w-5" />;
      case 'done':
        return <IoCheckmarkCircleSharp className="h-5 w-5" />;
      default:
        return <IoInformationCircle className="h-5 w-5" />;
    }
  };

  // const getStyles = () => {
  //   switch (type) {
  //     case 'warning':
  //       return 'bg-amber-50 text-amber-800 border-amber-200';
  //     case 'critical':
  //       return 'bg-red-600 text-white border-red-600';
  //     case 'done':
  //       return 'bg-green-600 text-white border-green-600';
  //     default:
  //       return 'bg-white text-gray-800 border-gray-200';
  //   }
  // };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          className={classNames(
            'fixed right-4 z-50 w-full max-w-md px-4',
            position === 'top' ? 'top-4' : 'bottom-4'
          )}
        >
          <div
            className={classNames(
              'flex items-start gap-2 rounded-lg border p-4 shadow-lg bg-white'
            )}
          >
            <div
              className={classNames(
                'flex-shrink-0',
                type === 'simple' ? 'text-mainBlue' : '',
                type === 'warning' ? 'text-amber-600' : '',
                type === 'critical' ? 'text-red-600' : '',
                type === 'done' ? 'text-green-600' : ''
              )}
            >
              {getIcon()}
            </div>
            <div className="flex-1">
              <h3
                className={classNames(
                  'text-sm font-bold',
                  type === 'simple' ? 'text-mainBlue' : '',
                  type === 'warning' ? 'text-amber-600' : '',
                  type === 'critical' ? 'text-red-600' : '',
                  type === 'done' ? 'text-green-600' : ''
                )}
              >
                {title}
              </h3>
              {message && (
                <p className={classNames('mt-1 text-sm text-gray-500')}>
                  {message}
                </p>
              )}
            </div>
            <button
              onClick={handleDismiss}
              className={classNames(
                'flex-shrink-0 rounded p-1 hover:bg-opacity-20 hover:bg-gray-200 text-gray-500'
              )}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
