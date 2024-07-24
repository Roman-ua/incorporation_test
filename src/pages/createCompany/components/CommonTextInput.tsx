import React from 'react';
import { FieldValues } from 'react-hook-form';

interface IProps {
  id: string;
  name: string;
  field: FieldValues;
  title: string;
  extraStyles?: string;
  readonly?: boolean;
  heading?: string;
  extraInputStyles?: string;
  removeLabel?: boolean;
}

const CommonTextInput = ({
  id,
  name,
  field,
  title,
  extraStyles,
  extraInputStyles,
  readonly,
  heading,
  removeLabel,
}: IProps) => {
  return (
    <>
      <h2 className="text-3xl font-semibold mb-8">{heading}</h2>
      <div className={`w-full ${extraStyles} max-lg:ml-0 max-lg:mr-0`}>
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {removeLabel ? '' : title}
        </label>
        <div className="mt-1">
          <input
            {...field}
            type="text"
            name={name}
            id={id}
            className={
              extraInputStyles
                ? 'outline-0 block w-full text-2xl font-bold border-l-4 py-3.5 px-4 text-gray-900 placeholder:text-gray-400 max-sm:text-sm sm:leading-6'
                : `outline-0 block w-full text-xl rounded-md font-bold border-0 py-3.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mainBlue max-sm:text-sm sm:leading-6 ${extraInputStyles}`
            }
            placeholder={title}
            data-1p-ignore={true}
            readOnly={readonly}
            disabled={readonly}
          />
        </div>
      </div>
    </>
  );
};

export default CommonTextInput;
