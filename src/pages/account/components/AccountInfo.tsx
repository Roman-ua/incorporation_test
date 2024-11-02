import React from 'react';
// import UpdatableRow from './UpdateableRow';
// import { validateEmail } from '../../../utils/validators';
import UserGeneralInfo from './UserGeneralInfo';
import ContactsBlock from './ContactsBlock';

// interface IErrors {
//   email?: string;
//   name?: string;
// }

// const tabs = ['General', 'Security', 'Notifications', 'Settings'];

const AccountInfo = () => {
  // const [email, setEmail] = useState('tom.cook@example.com');
  // const [fullName, setFullName] = useState('Tom Cook');
  // const [error, setError] = useState<IErrors>({});

  // const emailHandler = (value: string) => {
  //   const email = value;
  //   setEmail(email);
  //
  //   if (validateEmail(email)) {
  //     setError({});
  //   } else {
  //     setError({ email: 'Not a valid email address.' });
  //   }
  // };

  return (
    <div className="container max-w-7xl mx-auto pl-10 pr-10 pb-8 pt-24">
      <UserGeneralInfo />

      {/*<div className="flex items-center justify-start mb-8">*/}
      {/*  {tabs.map((tab) => (*/}
      {/*    <div*/}
      {/*      key={tab}*/}
      {/*      onClick={() => setActiveTab(tab)}*/}
      {/*      className={classNames(*/}
      {/*        'py-1.5 px-2 mr-2 font-semibold text-sm text-gray-400 rounded hover:cursor-pointer transition-all ease-in-out duration-150',*/}
      {/*        tab === activeTab*/}
      {/*          ? 'bg-gray-200 text-gray-700 hover:text-gray-700'*/}
      {/*          : 'hover:text-gray-600'*/}
      {/*      )}*/}
      {/*    >*/}
      {/*      {tab}*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</div>*/}

      <div>
        <ContactsBlock />
      </div>

      {/*<div>{activeTab}</div>*/}
      {/*<div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">*/}
      {/*  <div>*/}
      {/*    <h2 className="text-base font-semibold leading-7 text-gary-700">*/}
      {/*      Profile*/}
      {/*    </h2>*/}

      {/*    <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6 mb-20">*/}
      {/*      <UpdatableRow*/}
      {/*        title={'Full name'}*/}
      {/*        value={fullName}*/}
      {/*        changeHandler={setFullName}*/}
      {/*        error={error?.name}*/}
      {/*      />*/}
      {/*      <UpdatableRow*/}
      {/*        title={'Email address'}*/}
      {/*        value={email}*/}
      {/*        changeHandler={emailHandler}*/}
      {/*        error={error?.email}*/}
      {/*      />*/}
      {/*    </dl>*/}

      {/*    <h2 className="text-base font-semibold leading-7 text-gary-700">*/}
      {/*      Security Information*/}
      {/*    </h2>*/}
      {/*    <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">*/}
      {/*      <div className="pt-6 sm:flex">*/}
      {/*        <dt className="font-medium text-gary-700 sm:w-64 sm:flex-none sm:pr-6 py-1.5">*/}
      {/*          Password*/}
      {/*        </dt>*/}
      {/*        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">*/}
      {/*          <div className="text-gary-700">***************</div>*/}
      {/*          <button*/}
      {/*            type="button"*/}
      {/*            className="font-semibold text-sideBarBlue hover:text-mainBlue"*/}
      {/*          >*/}
      {/*            Request update*/}
      {/*          </button>*/}
      {/*        </dd>*/}
      {/*      </div>*/}
      {/*    </dl>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};

export default AccountInfo;
