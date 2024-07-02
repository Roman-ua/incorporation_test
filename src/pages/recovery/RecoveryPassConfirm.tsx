import logo from '../../images/shared/bluelogo.svg';
import React from 'react';
import { EnvelopeIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/navigation/routes';

const RecoveryPassConfirm = () => {
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
            <div className="w-full flex items-center justify-center mb-5">
              <EnvelopeIcon className="h-8 w-8 text-mainBlue" />
            </div>
            <p className="mb-5 w-full text-center text-lg">
              {`${'We just sent an email to'}`}
              <br />
              {`${'roma@incorporatenow.com'}`}
            </p>
            <p className="mb-8 w-full text-center text-sm">
              {`${"Click the secure link we sent you to reset your password. If you didn't receive an email, check your Spam folder."}`}
            </p>
            <div>
              <Link to={ROUTES.LOGIN}>
                <button className="flex w-full justify-center items-center rounded-md bg-mainBlue px-6 h-12 text-base font-bold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:opacity-50">
                  Sign in
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RecoveryPassConfirm;
