import React from 'react';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineCopyAll } from 'react-icons/md';
import { classNames } from '../../../utils/helpers';

interface CopyButtonProps {
  copied: boolean;
  wrapperClass: string;
  iconClass: string;
}

const CopyButton = ({ copied, wrapperClass, iconClass }: CopyButtonProps) => {
  return (
    <div className="group text-gray-700 text-sm flex items-center gap-1 cursor-pointer">
      <div className={classNames('relative', wrapperClass)}>
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.div
              key="check"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0"
            >
              <Check className={classNames('text-green-600', iconClass)} />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
            >
              <MdOutlineCopyAll
                className={classNames('text-gray-700', iconClass)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default CopyButton;
