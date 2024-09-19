import React from 'react';
// import styles from './ButtonWithArrow.module.scss';
// function classNames(...classes: (string | boolean)[]) {
//   return classes.filter(Boolean).join(' ');
// }
const ButtonWithArrow = () => {
  return (
    // <button
    //   type="submit"
    //   className={classNames(
    //     'min-w-28 flex items-center rounded-md bg-mainBlue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500 disabled:cursor-not-allowed',
    //     `${styles.arrowButton}`
    //   )}
    // >
    //   Next Step
    //   <span className={styles.arrow} />
    // </button>

    <button className="relative inline-flex rounded-md bg-mainBlue items-center justify-start py-2.5 pl-4 pr-12 overflow-hidden font-semibold transition-all duration-150 ease-in-out hover:pl-10 hover:pr-6 group hover:bg-sideBarBlue">
      <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
        <svg
          className="w-4 h-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M14.9385 6L20.9999 12.0613M20.9999 12.0613L14.9385 18.1227M20.9999 12.0613L3 12.0613"
            stroke="currentcolor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
        <svg
          className="w-4 h-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M14.9385 6L20.9999 12.0613M20.9999 12.0613L14.9385 18.1227M20.9999 12.0613L3 12.0613"
            stroke="currentcolor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-sm font-semibold text-white relative w-full text-left transition-colors duration-200 ease-in-out">
        Next Step
      </span>
    </button>
  );
};

export default ButtonWithArrow;
