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
        <AccountInfo />
      </main>
    </div>
  );
};

export default Account;
