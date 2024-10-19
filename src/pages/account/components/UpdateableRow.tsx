import React, { useEffect, useRef, useState } from 'react';

interface IProps {
  title: string;
  value: string;
  error?: string;
  changeHandler: (value: string) => void;
}
const UpdatableRow = ({ title, value, changeHandler, error }: IProps) => {
  const inputRef = useRef<HTMLDivElement | null>(null);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent, err: string | undefined) {
      if (
        inputRef.current &&
        !err &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setUpdate(false);
      }
    }

    document.addEventListener('mousedown', (e) => handleClickOutside(e, error));

    return () => {
      document.removeEventListener('mousedown', (e) =>
        handleClickOutside(e, error)
      );
    };
  }, [error]);

  useEffect(() => {
    if (update) {
      inputRef.current?.querySelector('input')?.focus();
    }
  }, [update]);

  return (
    <div className="pt-6 sm:flex">
      <dt className="font-medium text-gary-700 sm:w-64 sm:flex-none sm:pr-6 py-1.5">
        {title}
      </dt>
      <dd
        className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto"
        ref={inputRef}
      >
        {update ? (
          <div className="relative w-1/2">
            <input
              value={value}
              type={'text'}
              data-1p-ignore={true}
              onChange={(e) => changeHandler(e.target.value)}
              className="outline-0 peer block w-full border-0 bg-gray-50 p-1.5 text-gary-700 sm:text-sm sm:leading-6"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-sideBarBlue"
            />
            {error && (
              <p
                className="absolute text-sm mt-1 text-red-600"
                id="email-error"
              >
                {error}
              </p>
            )}
          </div>
        ) : (
          <div className="text-gary-700 p-1.5">{value}</div>
        )}
        <button
          type="button"
          onClick={() =>
            setUpdate((prev) => {
              if (prev && error) {
                return true;
              }
              return !prev;
            })
          }
          className="font-semibold text-sideBarBlue hover:text-mainBlue"
        >
          {update ? 'Save' : 'Update'}
        </button>
      </dd>
    </div>
  );
};
export default UpdatableRow;
