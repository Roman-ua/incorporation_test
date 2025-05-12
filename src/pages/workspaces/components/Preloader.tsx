import React from 'react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  isLoading: boolean;
  onLoadingComplete?: () => void;
  duration?: number;
  text?: string;
  logo?: React.ReactNode;
}

export const Preloader: React.FC<PreloaderProps> = ({
  isLoading,
  onLoadingComplete,
  duration = 1500,
  text = 'Loading workspace',
  logo,
}) => {
  const [isVisible, setIsVisible] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onLoadingComplete) onLoadingComplete();
        clearTimeout(timer);
      }, duration);
    }
  }, [isLoading, duration, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/65 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="mb-6">
              {logo || (
                <div className="relative w-16 h-16">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-0 rounded-full border-4 border-gray-200 border-t-gray-800"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col items-center">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: duration / 1000, ease: 'linear' }}
                className="h-1 bg-gray-800 rounded-full mb-3 w-48"
              />

              <div className="text-gray-800 font-medium">
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  {text}
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 0.25,
                    }}
                  >
                    .
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 0.5,
                    }}
                  >
                    .
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 0.75,
                    }}
                  >
                    .
                  </motion.span>
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
