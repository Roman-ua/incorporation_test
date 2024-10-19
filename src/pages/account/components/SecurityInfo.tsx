import React from 'react';

const SecurityInfo = () => {
  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-16">
      <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Security
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            Security settings.
          </p>

          <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Password
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">***************</div>
                <button
                  type="button"
                  className="font-semibold text-sideBarBlue hover:text-mainBlue"
                >
                  Request update
                </button>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default SecurityInfo;
