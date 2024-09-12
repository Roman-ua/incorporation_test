import React, { useEffect } from 'react';
import './Button.scss';
import { CursorArrowRaysIcon } from '@heroicons/react/24/solid';

// eslint-disable-next-line react/prop-types
const CustomButton = ({ discard, clickHandler, disabled, uniqId }) => {
  useEffect(() => {
    const button = document.getElementById(uniqId);
    let timeout;
    const duration = 500;

    const success = (button) => {
      button.classList.add('success');
    };

    if (button) {
      button.style.setProperty('--duration', duration + 'ms');

      ['click'].forEach((e) => {
        button.addEventListener(e, () => {
          if (e == 'click' && !button.classList.contains('process')) {
            button.classList.add('process');
            timeout = setTimeout(success, duration, button);
          }
        });
      });
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [clickHandler]);

  useEffect(() => {
    const button = document.getElementById(uniqId);

    if (button && !discard) {
      button.classList.remove('process');
      button.classList.remove('success');
      button.style.setProperty('--duration', 0 + 'ms');
    }
  }, [discard]);

  return (
    <button
      id={uniqId}
      onClick={clickHandler}
      disabled={disabled}
      className="buttonHold flex items-center justify-center w-[90px] h-[40px] text-base font-bold bg-mainBlue text-white rounded-md mt-2 disabled:bg-gray-500"
    >
      <div>
        <CursorArrowRaysIcon className="icon w-5 h-5" />
        <svg className="progress" viewBox="0 0 32 32">
          <circle r="8" cx="16" cy="16" />
        </svg>
        <svg className="tick" viewBox="0 0 24 24">
          <polyline points="18,7 11,16 6,12" />
        </svg>
      </div>
      <span>Save</span>
    </button>
  );
};

export default CustomButton;
