import logo from '../../images/shared/bluelogo.svg';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import React, { ChangeEvent, useState } from 'react';
import { validateEmail } from '../../utils/validators';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/navigation/routes';

const RecoveryPass = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleBlurEmail = () => {
    if (validateEmail(email)) {
      setError('');
    } else {
      setError('Email не валиден');
    }
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (error) {
      setError('');
    }
  };

  return (
    <main className="isolate">
      <div className="relative h-screen flex items-center justify-center">
        <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" opacity="0.7" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
          />
        </svg>
        <div className="m-auto sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="sm:mx-auto sm:w-full sm:max-w-md mb-10">
            <img className="mx-auto h-12 w-auto" src={logo} alt="logo" />
          </div>
          <div className="bg-white px-6 py-12 shadow-[0px_0px_10px_0px_#e2e8f0] sm:rounded-lg sm:px-12">
            <h1 className="mb-5 text-2xl font-semibold w-full text-center">
              Forgot your password?
            </h1>
            <p className="mb-5 w-full text-center">
              {`${"Submit your email address and we'll send you a link to reset your password."}`}
            </p>
            <form className="space-y-5" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-base font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-1 relative mb-8">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={handleChangeEmail}
                    onBlur={handleBlurEmail}
                    data-1p-ignore={true}
                    className={`outline-0 text-base block w-full rounded-lg py-3.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-mainBlue placeholder:text-gray-400 sm:text-sm sm:leading-6 ${error ? 'ring-red-500 focus:ring-red-500' : ''}`}
                  />
                  {error && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ExclamationCircleIcon
                        className="h-6 w-6 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                  {error && (
                    <p
                      className="absolute text-base text-red-600"
                      id="email-error"
                    >
                      Not a valid email address.
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Link to={ROUTES.RECOVERY_PASS_CONFIRM}>
                  <button
                    disabled={!!error}
                    className="flex w-full justify-center items-center rounded-md bg-mainBlue px-6 h-12 text-base font-bold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:opacity-50"
                  >
                    Reset Password
                  </button>
                </Link>
              </div>
              <div className="flex items-center justify-center text-sm">
                <p>Think you remember your password?</p>
                <p className="ml-2">
                  <Link
                    className="font-bold underline text-mainBlue opacity-70"
                    to={ROUTES.LOGIN}
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RecoveryPass;
