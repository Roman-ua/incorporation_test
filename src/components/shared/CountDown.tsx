import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  text: string;
  startFrom?: number;
  onComplete?: () => void;
}

export function CountdownTimer({
  text,
  startFrom = 10,
  onComplete,
}: CountdownTimerProps) {
  const [count, setCount] = useState(startFrom);

  useEffect(() => {
    if (count < 0) return;

    const timer = setTimeout(() => {
      if (count === 0 && onComplete) {
        onComplete();
      } else {
        setCount(count - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  // Replace the last number in the text with the current count
  const displayText =
    count >= 0 ? text.replace(/\d+(?=[^\d]*$)/, count.toString()) : text;

  return (
    <div className="p-4 rounded-md bg-muted text-center">
      <p className="text-sm font-medium text-gray-500">{displayText}</p>
    </div>
  );
}
