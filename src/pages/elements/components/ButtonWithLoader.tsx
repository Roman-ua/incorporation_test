import React from 'react';
import SectionHeading from '../../createCompany/components/SectionHeading';

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const ButtonWithLoader = () => {
  const [checked, setChecked] = React.useState(false);

  const setCheckedWithDelay = () => {
    setTimeout(() => {
      setChecked(!checked);
    }, 1000);
  };

  return (
    <div className="w-2/3 mb-20">
      <SectionHeading text={'Button with loader'} status={false} />
      <div onClick={setCheckedWithDelay}>
        <label
          htmlFor="checkboxScaleUp"
          className="flex cursor-pointer items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 [&:has(input:checked)]:text-neutral-900 dark:[&:has(input:checked)]:text-white [&:has(input:disabled)]:cursor-not-allowed [&:has(input:disabled)]:opacity-75"
        >
          <div className="relative flex items-center">
            <input
              id="checkboxScaleUp"
              type="checkbox"
              className={classNames(
                "before:content[''] peer relative size-6 cursor-pointer appearance-none overflow-hidden rounded-full border border-neutral-300 bg-neutral-50 before:absolute before:inset-0 before:scale-0 before:rounded-full before:transition before:duration-200 checked:border-green-300",
                'checked:before:scale-125 checked:before:bg-green-300 focus:outline-none active:outline-offset-0 disabled:cursor-not-allowed'
              )}
              checked={checked}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
              stroke="currentColor"
              fill="none"
              strokeWidth="4"
              className="pointer-events-none invisible absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 scale-0 transition duration-200 delay-200 peer-checked:scale-100 text-black peer-checked:visible"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
        </label>
        <span>Submit</span>
      </div>
    </div>
  );
};
export default ButtonWithLoader;
