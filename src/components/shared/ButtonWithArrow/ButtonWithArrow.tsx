import React from 'react';
import styles from './ButtonWithArrow.module.scss';
function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}
const ButtonWithArrow = () => {
  return (
    <button
      type="submit"
      className={classNames(
        'min-w-28 flex items-center rounded-md bg-mainBlue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500 disabled:cursor-not-allowed',
        `${styles.arrowButton}`
      )}
    >
      Next Step
      <span className={styles.arrow} />
    </button>
  );
};

export default ButtonWithArrow;
