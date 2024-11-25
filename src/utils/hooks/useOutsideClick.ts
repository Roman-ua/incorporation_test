import React, { useEffect } from 'react';

const useOutsideClick = (
  ref1: React.RefObject<HTMLElement>,
  ref2: React.RefObject<HTMLElement>,
  callback: () => void
): void => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        ref1?.current &&
        ref2?.current &&
        !ref1?.current?.contains(event.target as Node) &&
        !ref2?.current?.contains(event.target as Node)
      ) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref1, ref2, callback]);
};

export default useOutsideClick;
