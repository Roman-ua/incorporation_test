import React from 'react';
import { FieldValues } from 'react-hook-form';
import SectionHeading from './SectionHeading';

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
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (id !== 'number') {
      field.onChange(e.target.value);
      return;
    }

    const validPattern = /^[a-zA-Z0-9-]+$/;

    if (validPattern.test(e.target.value) || e.target.value === '') {
      return field.onChange(e.target.value);
    } else {
      return;
    }
  };

  return (
    <>
      <SectionHeading text={heading || ''} status={field.value} />
      <div className={`w-full ${extraStyles} max-lg:ml-0 max-lg:mr-0`}>
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {removeLabel ? '' : title}
        </label>
        <div className="mt-1 relative">
          <input
            {...field}
            onChange={changeHandler}
            type="text"
            name={name}
            id={id}
            className={`outline-0 block w-full ${extraInputStyles ? 'text-2xl' : 'text-xl'} rounded-md font-bold border-0 py-3.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mainBlue max-sm:text-sm sm:leading-6`}
            placeholder={title}
            data-1p-ignore={true}
            readOnly={readonly}
            disabled={readonly}
          />
          <button
            type={'button'}
            className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-mainBlue hover:bg-sideBarBlue transition rounded-md text-white"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default CommonTextInput;
