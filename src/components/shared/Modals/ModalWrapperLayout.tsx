import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { AnimatePresence } from 'framer-motion';
import React from 'react';

const ModalWrapperLayout = ({
  children,
  isOpen,
  closeModal,
}: {
  children: React.ReactNode;
  closeModal: () => void;
  isOpen: boolean;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          as={motion.div}
          static
          open={isOpen}
          onClose={closeModal}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="min-h-screen px-4 py-2 text-center">
            <Dialog.Overlay
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
            />

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="inline-block w-full max-w-xl text-left align-middle bg-white shadow-xl rounded-md relative z-40"
            >
              {children}
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ModalWrapperLayout;
