import React from 'react';

interface AnimatedUnderlineButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export function AnimatedUnderlineButton({
  onClick,
  children,
  className = '',
}: AnimatedUnderlineButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative font-medium text-gray-900 hover:text-black ${className}`}
    >
      <span className="relative">
        {children}
        {/* Permanent underline that disappears on hover */}
        <span className="absolute -bottom-[3px] left-0 h-0.5 w-full bg-gray-800 transition-opacity duration-50 group-hover:opacity-0"></span>

        {/* Animated underline that appears from left to right on hover */}
        <span className="absolute -bottom-[3px] left-0 h-0.5 w-0 bg-gray-800 transition-all duration-500 group-hover:w-full"></span>
      </span>
    </button>
  );
}
