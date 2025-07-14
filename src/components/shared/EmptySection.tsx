import React from 'react';
import { FiPlusCircle } from 'react-icons/fi';

interface EmptySectionProps {
  title?: string;
  ctaText?: string;
  onAction?: () => void;
}

export function EmptySection({
  title = 'No items found',
  ctaText,
  onAction = () => {},
}: EmptySectionProps) {
  return (
    <div className="relative overflow-hidden w-full rounded-md border border-dashed bg-gradient-to-b from-background to-muted/30 p-10 flex flex-col items-center justify-center text-center min-h-[200px]">
      <div className="relative max-w-md mx-auto">
        <div className="mb-4 relative flex items-center justify-center">
          <FiPlusCircle className="h-8 w-8 text-gray-900" />
        </div>
        <h3 className="font-bold   mb-4">{title}</h3>
        {ctaText && (
          <div
            className="px-2.5 py-1 border rounded-md  text-sm font-medium text-gray-900 transition-all ease-in-out duration-150 hover:cursor-pointer"
            onClick={onAction}
          >
            {ctaText}
          </div>
        )}
      </div>
    </div>
  );
}
