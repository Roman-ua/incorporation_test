import React from 'react';
import AccountInfo from './components/AccountInfo';
// import SecurityInfo from './components/SecurityInfo';
// const secondaryNavigation = [
//   { name: 'Account', href: '#', current: true },
//   { name: 'Security', href: '#', current: false },
//   { name: 'Notifications', href: '#', current: false },
//   { name: 'Billing', href: '#', current: false },
// ];

// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(' ');
// }

const Account = () => {
  // const [currentMenuItem, setCurrentMenuItem] = useState('Account');
  return (
    <div>
      <main>
        <h1 className="sr-only">Account Settings</h1>

        {/*<header className="border-b">*/}
        {/*  /!* Secondary navigation *!/*/}
        {/*  <nav className="flex overflow-x-auto py-4 container max-w-7xl mx-auto ">*/}
        {/*    <ul*/}
        {/*      role="list"*/}
        {/*      className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-700 sm:px-6 lg:px-8"*/}
        {/*    >*/}
        {/*      {secondaryNavigation.map((item) => (*/}
        {/*        <li*/}
        {/*          key={item.name}*/}
        {/*          onClick={() => setCurrentMenuItem(item.name)}*/}
        {/*          className={classNames(*/}
        {/*            item.name === currentMenuItem ? 'text-mainBlue' : '',*/}
        {/*            'cursor-pointer'*/}
        {/*          )}*/}
        {/*        >*/}
        {/*          {item.name}*/}
        {/*        </li>*/}
        {/*      ))}*/}
        {/*    </ul>*/}
        {/*  </nav>*/}
        {/*</header>*/}

        {/*{currentMenuItem === 'Account' && <AccountInfo />}*/}
        {/*{currentMenuItem === 'Security' && <SecurityInfo />}*/}

        <AccountInfo />
      </main>
    </div>
  );
};

export default Account;
