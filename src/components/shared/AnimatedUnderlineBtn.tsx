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
      className={`group relative font-medium text-gray-600 hover:text-gray-800 ${className}`}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
      </span>
    </button>
  );
}
