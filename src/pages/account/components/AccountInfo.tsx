import React, { useState } from 'react';
import UpdatableRow from './UpdateableRow';
const AccountInfo = () => {
  const [email, setEmail] = useState('tom.cook@example.com');
  const [fullName, setFullName] = useState('Tom Cook');

  return (
    <div className="p-8 max-sm:p-6 lg:flex-auto">
      <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
            <UpdatableRow
              title={'Full name'}
              value={fullName}
              changeHandler={setFullName}
            />
            <UpdatableRow
              title={'Email address'}
              value={email}
              changeHandler={setEmail}
            />
          </dl>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
