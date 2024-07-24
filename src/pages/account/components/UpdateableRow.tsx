import React, { useState } from 'react';

interface IProps {
  title: string;
  value: string;
  changeHandler: (value: string) => void;
}
const UpdatableRow = ({ title, value, changeHandler }: IProps) => {
  const [update, setUpdate] = useState(false);
  return (
    <div className="pt-6 sm:flex">
      <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6 p-1.5">
        {title}
      </dt>
      <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
        {update ? (
          <div className="relative">
            <input
              value={value}
              type={'text'}
              data-1p-ignore={true}
              onChange={(e) => changeHandler(e.target.value)}
              className="outline-0 peer block w-full border-0 bg-gray-50 p-1.5 text-gray-900 sm:text-sm sm:leading-6"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-sideBarBlue"
            />
          </div>
        ) : (
          <div className="text-gray-900 p-1.5">{value}</div>
        )}
        <button
          type="button"
          onClick={() => setUpdate(!update)}
          className="font-semibold text-sideBarBlue hover:text-mainBlue"
        >
          {update ? 'Save' : 'Update'}
        </button>
      </dd>
    </div>
  );
};
export default UpdatableRow;
