import React, { useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import SectionHeading from './SectionHeading';
import { ERRORS } from '../../../constants/errors';
import { VALIDATORS } from '../../../constants/regexs';
import CheckBox from '../../../components/shared/CheckBox';

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

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const CommonTextInput = ({
  id,
  name,
  field,
  title,
  extraStyles,
  // extraInputStyles,
  readonly,
  heading,
  removeLabel,
}: IProps) => {
  const [loader, setLoader] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState('');
  const isNameField = id === 'name';

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validPattern =
      id === 'number' ? VALIDATORS.COMPANY_NUMBER : VALIDATORS.NAME;
    const errorMsg =
      id === 'number' ? ERRORS.INVALID_NUMBER_VALUE : ERRORS.INVALID_NAME_VALUE;

    if (done) {
      setDone(false);
    }

    if (validPattern.test(e.target.value) || e.target.value === '') {
      setError('');
      return field.onChange(e.target.value);
    } else {
      setError(errorMsg);
      return;
    }
  };

  const saveHandler = () => {
    if (field.value && !done && !error) {
      setLoader(true);
    }

    if (field.value && !error) {
      const timeout = setTimeout(() => {
        setLoader(false);
        setDone(true);

        clearTimeout(timeout);
      }, 500);
    } else {
      setDone(false);
    }
  };

  const handleEnterKey = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      saveHandler();
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
      <div
        className={classNames(
          `w-full max-lg:ml-0 max-lg:mr-0`,
          extraStyles || ''
        )}
      >
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
            className={classNames(
              'outline-0 block w-full text-md rounded-md font-bold border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mainBlue max-sm:text-sm sm:leading-6',
              isNameField ? 'text-xl py-3 px-5' : ''
            )}
            placeholder={title}
            data-1p-ignore={true}
            onKeyDown={handleEnterKey}
            onBlur={saveHandler}
            readOnly={readonly}
            disabled={readonly}
          />

          {done && field.value && !loader ? (
            <div
              className={classNames(
                'absolute right-1.5 top-1.5 bottom-1.5 rounded-full w-7 flex items-center justify-center',
                isNameField ? 'right-3' : 'right-1.5'
              )}
            >
              <CheckBox
                wrapperSize={isNameField ? 'w-7 h-7' : 'w-5 h-5'}
                iconSize={isNameField ? 'w-3.5 h-3.5' : 'w-2.5 h-2.5'}
                isItemHovered={false}
                isItemSelected={true}
              />
            </div>
          ) : (
            <button
              type={'button'}
              onClick={saveHandler}
              disabled={!field.value || !!error}
              className="w-16 flex items-center justify-center text-sm font-semibold absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-mainBlue rounded-md text-white disabled:bg-gray-500"
            >
              {loader ? (
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                'Save'
              )}
            </button>
          )}
          {error && (
            <div className="absolute text-sm font-bold text-red-700 -bottom-7">
              {error}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CommonTextInput;
