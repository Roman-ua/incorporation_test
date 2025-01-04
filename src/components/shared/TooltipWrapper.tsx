import React, { useState, ReactNode } from 'react';

type TooltipWrapperProps = {
  children: ReactNode;
  tooltipText: string;
};

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  children,
  tooltipText,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block overflow-visible"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <div
        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
                     px-2.5 py-1.5 text-sm text-gray-700 bg-gray-100 rounded-lg shadow-lg
                     opacity-0 translate-y-2 transition-all duration-300 ease-out z-40 font-medium"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
        }}
      >
        {tooltipText}
      </div>
    </div>
  );
};

export default TooltipWrapper;
