import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { classNames } from '../../../utils/helpers';
import { IconX } from '@tabler/icons-react';
import { IoWarning } from 'react-icons/io5';
import { IoMdInformationCircle } from 'react-icons/io';

type AlertType = 'warning' | 'error';

interface AlertProps {
  type?: AlertType;
  title: string;
  message: string;
  visible?: boolean;
  onClose?: () => void;
  // duration?: number; // Auto-dismiss duration in ms (0 means no auto-dismiss)
}

export function Alert({
  type = 'warning',
  title,
  message,
  visible = true,
  onClose,
  // duration = 0,
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  // useEffect(() => {
  //   if (duration > 0 && isVisible) {
  //     const timer = setTimeout(() => {
  //       setIsVisible(false);
  //       onClose?.();
  //     }, duration);
  //     return () => clearTimeout(timer);
  //   }
  // }, [duration, isVisible, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  // Animation variants with emphasized opacity
  const containerVariants = {
    hidden: {
      opacity: 0,
      scaleY: 0,
      marginTop: 0,
      marginBottom: 0,
      originY: 0,
    },
    visible: {
      opacity: 1,
      scaleY: 1,
      marginTop: '0.5rem',
      marginBottom: '0.5rem',
      transition: {
        opacity: {
          duration: 0.4, // Slightly longer opacity transition
          ease: 'easeOut',
        },
        scaleY: {
          duration: 0.3,
          ease: 'easeOut',
        },
        marginTop: { duration: 0.3, ease: 'easeOut' },
        marginBottom: { duration: 0.3, ease: 'easeOut' },
      },
    },
    exit: {
      opacity: 0,
      scaleY: 0,
      marginTop: 0,
      marginBottom: 0,
      transition: {
        opacity: {
          duration: 0.2, // Quicker fade out
          ease: 'easeIn',
        },
        scaleY: {
          duration: 0.3,
          ease: 'easeIn',
          delay: 0.05, // Slight delay so opacity starts first
        },
        marginTop: { duration: 0.3, ease: 'easeIn' },
        marginBottom: { duration: 0.3, ease: 'easeIn' },
      },
    },
  };

  // Content animation for additional emphasis
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.1, // Slight delay after container starts appearing
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={classNames(
            'w-full rounded-lg border p-4 flex items-start justify-between',
            type === 'warning'
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-red-50 text-red-700 border-red-200'
          )}
        >
          <motion.div
            variants={contentVariants}
            className="flex items-start gap-2"
          >
            {type === 'warning' ? (
              <IoWarning className="h-5 w-5 text-amber-600" />
            ) : (
              <IoMdInformationCircle className="h-5 w-5 text-red-600" />
            )}
            <div>
              <p className="text-sm font-bold text-gray-900 mb-2">{title}</p>
              <p className="text-sm font-medium text-gray-700">{message}</p>
            </div>
          </motion.div>
          <motion.button
            variants={contentVariants}
            onClick={handleClose}
            className={classNames(
              'flex items-center justify-between p-1.5 hover:cursor-pointer  transition-all ease-in-out duration-150 rounded-md',
              type === 'warning' ? 'hover:bg-amber-100' : 'hover:bg-red-100'
            )}
            aria-label="Close"
          >
            <IconX
              className={classNames(
                'w-4 h-4 ',
                type === 'warning' ? 'text-amber-600' : 'text-red-600'
              )}
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
