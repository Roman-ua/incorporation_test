import React from 'react';
import { FieldValues } from 'react-hook-form';

interface IProps {
  id: string;
  name: string;
  field: FieldValues;
  title: string;
  extraStyles?: string;
  readonly?: boolean;
}

const CommonTextInput = ({
  id,
  name,
  field,
  title,
  extraStyles,
  readonly,
}: IProps) => {
  return (
    <div
      className={`w-full ${extraStyles} max-lg:ml-0 max-lg:mr-0 max-lg:mb-2`}
    >
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {title}
      </label>
      <div className="mt-2">
        <input
          {...field}
          type="text"
          name={name}
          id={id}
          className="outline-0 block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mainBlue sm:text-sm sm:leading-6"
          placeholder={title}
          data-1p-ignore={true}
          readOnly={readonly}
        />
      </div>
    </div>
  );
};

export default CommonTextInput;
