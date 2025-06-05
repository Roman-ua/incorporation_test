import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipWrapperProps {
  children: React.ReactNode;
  text: string;
}

export default function TooltipWrapper({
  children,
  text,
}: TooltipWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block hover:cursor-pointer"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 z-50"
          >
            <div className="bg-gray-50 text-gray-700 text-sm px-2 py-1 rounded-md whitespace-nowrap shadow-sm">
              {text}
            </div>
            {/* Arrow */}
            <div className="absolute top-full right-0  w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-50" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
