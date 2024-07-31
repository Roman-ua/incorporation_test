import React, { useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import SectionHeading from './SectionHeading';
import { ERRORS } from '../../../constants/errors';
import { VALIDATORS } from '../../../constants/regexs';

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
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState('');

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validPattern =
      id === 'number' ? VALIDATORS.COMPANY_NUMBER : VALIDATORS.NAME;
    const errorMsg =
      id === 'number' ? ERRORS.INVALID_NUMBER_VALUE : ERRORS.INVALID_NAME_VALUE;

    if (id === 'number' || id === 'name') {
      if (validPattern.test(e.target.value) || e.target.value === '') {
        setError('');
        return field.onChange(e.target.value);
      } else {
        setError(errorMsg);
        return;
      }
    }

    field.onChange(e.target.value);
  };

  const saveHandler = () => {
    if (field.value && !error) {
      setDone(true);
    } else {
      setDone(false);
    }
  };

  useEffect(() => {
    if (field.value && !done) {
      setDone(true);
    }
  }, []);

  return (
    <>
      <SectionHeading text={heading || ''} status={done} />
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
            onBlur={saveHandler}
          />
          <button
            type={'button'}
            onClick={saveHandler}
            className="absolute right-3 top-3 bottom-3 px-4 bg-mainBlue hover:bg-sideBarBlue transition rounded-md text-white"
          >
            Save
          </button>
          {error && (
            <div className="absolute text-xs text-red-500 -bottom-5">
              {error}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CommonTextInput;
