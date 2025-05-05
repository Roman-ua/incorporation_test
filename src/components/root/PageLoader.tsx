import React from 'react';
import { motion } from 'framer-motion';

export default function PageLoader() {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <div className="w-full flex flex-col items-center max-w-md px-4">
        <div className="relative mb-16">
          {/* Animated document stack */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="absolute -top-10 -left-6 w-32 h-40 bg-gray-200 rounded-md shadow-lg transform -rotate-6"
          />
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="absolute -top-8 -left-2 w-32 h-40 bg-gray-100 rounded-md shadow-lg transform -rotate-3"
          />
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="relative w-32 h-40 bg-white rounded-md shadow-lg border border-gray-200"
          >
            {/* Document lines */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '70%' }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute top-6 left-4 h-1 bg-gray-300 rounded"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '50%' }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="absolute top-10 left-4 h-1 bg-gray-300 rounded"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '60%' }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="absolute top-14 left-4 h-1 bg-gray-300 rounded"
            />
          </motion.div>
        </div>

        {/* Company name with typewriter effect */}
        <div className="text-center mb-8">
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
            >
              Incorporate
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.1 }}
            >
              Now
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.4 }}
            >
              Inc.
            </motion.span>
          </motion.h1>
        </div>
      </div>

      {/* Animated particles in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 md:w-1.5 md:h-1.5 bg-blue-400 rounded-full opacity-70"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * -500 - 100],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          />
        ))}
      </div>
    </div>
  );
}
