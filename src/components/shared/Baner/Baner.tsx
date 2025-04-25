import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '../../../utils/helpers';
import { IconX } from '@tabler/icons-react';
import { IoWarning } from 'react-icons/io5';
import { IoMdInformationCircle } from 'react-icons/io';

type BanerType = 'warning' | 'error';

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

interface BannerProps {
  type?: BanerType;
  title: string;
  message: string;
  onClose?: () => void;
  actionClickHandler: () => void;
  actionTitle: string;
}

export function Banner({
  type = 'warning',
  title,
  message,
  onClose,
  actionClickHandler,
  actionTitle,
}: BannerProps) {
  return (
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
      <motion.div variants={contentVariants} className="flex items-start gap-2">
        {type === 'warning' ? (
          <IoWarning className="h-5 w-5 text-amber-600" />
        ) : (
          <IoMdInformationCircle className="h-5 w-5 text-red-600" />
        )}
        <div className="w-full">
          <p className="text-sm font-bold text-gray-900 mb-2">{title}</p>
          <p className="text-sm font-medium text-gray-700">{message}</p>
          <div
            onClick={actionClickHandler}
            className="bg-white w-fit mt-3 px-2.5 py-1 border rounded-md  text-sm font-medium text-gray-900 transition-all ease-in-out duration-150 hover:cursor-pointer"
          >
            {actionTitle}
          </div>
        </div>
      </motion.div>
      <motion.button
        variants={contentVariants}
        onClick={onClose}
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
  );
}
