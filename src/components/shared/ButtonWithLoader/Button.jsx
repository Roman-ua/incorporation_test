import React, { useEffect, useState } from 'react';
import './Button.scss';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// eslint-disable-next-line react/prop-types
const CustomButton = ({ discard, clickHandler, disabled, uniqId }) => {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const button = document.getElementById(uniqId);
    let timeout;
    const duration = 100;

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
      setIsClicked(false);
    }
  }, [discard]);

  return (
    <button
      type={'button'}
      id={uniqId}
      onClick={() => {
        clickHandler();
        setIsClicked(true);
      }}
      disabled={disabled}
      className={classNames(
        'buttonHold flex items-center justify-between h-[35px] bg-mainBlue text-sm font-semibold text-white rounded-md mt-2 disabled:bg-gray-500',
        isClicked ? 'pl-3 pr-2' : 'px-3'
      )}
    >
      <span>{isClicked ? 'Saved' : 'Save'}</span>
      {isClicked && (
        <div style={{ marginLeft: 5 }}>
          <svg className="progress" viewBox="0 0 32 32">
            <circle r="8" cx="16" cy="16" />
          </svg>
          <svg className="tick" viewBox="0 0 24 24">
            <polyline points="18,7 11,16 6,12" />
          </svg>
        </div>
      )}
    </button>
  );
};

export default CustomButton;
