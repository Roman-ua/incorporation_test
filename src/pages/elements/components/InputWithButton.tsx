import React, { useEffect } from 'react';
import SectionHeading from '../../createCompany/components/SectionHeading';
import { VALIDATORS } from '../../../constants/regexs';
import { ERRORS } from '../../../constants/errors';
import { CheckIcon } from '@heroicons/react/20/solid';

const InputWithButton = () => {
  const [loader, setLoader] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState('');

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validPattern = VALIDATORS.NAME;
    const errorMsg = ERRORS.INVALID_NAME_VALUE;

    if (done) {
      setDone(false);
    }

    if (validPattern.test(e.target.value) || e.target.value === '') {
      setError('');
      return setValue(e.target.value);
    } else {
      setError(errorMsg);
      return;
    }
  };

  const saveHandler = () => {
    if (value && !done) {
      setLoader(true);
    }

    if (value && !error) {
      const timeout = setTimeout(() => {
        setLoader(false);
        setDone(true);

        clearTimeout(timeout);
      }, 500);
    } else {
      setDone(false);
    }
  };

  useEffect(() => {
    if (value && !done) {
      setDone(true);
    }
  }, []);

  return (
    <div className="mb-10 w-1/2">
      <SectionHeading
        text={'Heading Input Field with Save Button'}
        status={done}
      />
      <div className={`w-full max-lg:ml-0 max-lg:mr-0`}>
        <label
          htmlFor={'input'}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Input label
        </label>
        <div className="mt-1 relative">
          <input
            onChange={changeHandler}
            value={value}
            type="text"
            id={'input'}
            className={`outline-0 block w-full text-xl rounded-md font-bold border-0 py-3.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mainBlue max-sm:text-sm sm:leading-6`}
            placeholder={'Placeholder'}
            data-1p-ignore={true}
            onBlur={saveHandler}
          />

          {done && value && !loader ? (
            <div className="bg-gray-100 absolute right-3 top-3 bottom-3 rounded-full w-7 flex items-center justify-center">
              <CheckIcon className="w-5 h-4 text-gray-900 font-bold" />
            </div>
          ) : (
            <button
              type={'button'}
              onClick={saveHandler}
              disabled={!value}
              className="min-w-20 flex items-center justify-center text-sm font-semibold absolute right-3 top-3 bottom-3 px-4 bg-mainBlue transition rounded-md text-white disabled:bg-gray-500"
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
            <div className="absolute font-bold text-red-500 -bottom-7">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputWithButton;
