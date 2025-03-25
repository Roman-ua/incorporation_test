import React from 'react';
import { BsFillPlusCircleFill } from 'react-icons/bs';

interface EmptySectionProps {
  title?: string;
  description?: string;
  ctaText?: string;
  onAction?: () => void;
}

export function EmptySection({
  title = 'No items found',
  description = 'Get started by creating your first item.',
  ctaText = 'Create new',
  onAction = () => {},
}: EmptySectionProps) {
  return (
    <div className="mb-12 relative overflow-hidden w-full rounded-xl border border-dashed bg-gradient-to-b from-background to-muted/30 p-10 flex flex-col items-center justify-center text-center min-h-[200px]">
      {/* Main content */}
      <div className="relative max-w-md mx-auto">
        <div className="mb-4 relative flex items-center justify-center">
          <BsFillPlusCircleFill className="h-8 w-8 text-gray-900" />
        </div>
        <h3 className="font-bold tracking-tight mb-1">{title}</h3>
        <p className="mb-4 mx-auto max-w-xs text-sm">{description}</p>

        <div
          className="px-2.5 py-1 border rounded-md  text-sm font-medium text-gray-900 transition-all ease-in-out duration-150 hover:cursor-pointer"
          onClick={onAction}
        >
          {ctaText}
        </div>
      </div>
    </div>
  );
}
