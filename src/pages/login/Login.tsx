import React, { ChangeEvent, useState } from 'react';
import logo from '../../images/shared/bluelogo.svg';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { validateEmail, validatePassword } from '../../utils/validators';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/navigation/routes';

const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');

  const handleBlurEmail = () => {
    if (validateEmail(email)) {
      setError('');
    } else {
      setError('Email не валиден');
    }
  };

  const handleBlurPassword = () => {
    const validationError = validatePassword(password);
    setErrorPassword(validationError);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setPassword(value);

    if (errorPassword) {
      setErrorPassword('');
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
            <form
              className="space-y-5"
              action="/home"
              onSubmit={() => localStorage.setItem('token', 'token')}
            >
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
                <label
                  htmlFor="password"
                  className="block text-base font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-1 relative mb-8">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={handleChangePassword}
                    onBlur={handleBlurPassword}
                    data-1p-ignore={true}
                    className={`outline-0 text-base block w-full rounded-lg py-3.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-mainBlue placeholder:text-gray-400 sm:text-sm sm:leading-6 ${errorPassword ? 'ring-red-500 focus:ring-red-500' : ''}`}
                  />
                  {errorPassword && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ExclamationCircleIcon
                        className="h-6 w-6 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                  {errorPassword && (
                    <p
                      className="absolute text-base text-red-600"
                      id="email-error"
                    >
                      {errorPassword}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm leading-6 text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm leading-6">
                  <Link
                    to={ROUTES.RECOVERY_PASS}
                    className="font-semibold text-mainBlue hover:text-sky-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={!!error || !!errorPassword}
                  className="flex w-full justify-center items-center rounded-md bg-mainBlue px-6 h-12 text-base font-bold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:opacity-50"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
