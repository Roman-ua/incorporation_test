import React from 'react';
interface IProps {
  title: string;
  removeMargin?: boolean;
  textSettings?: string;
  clickHandler?: () => void;
  btnTitle?: string;
}

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const SectionHeading = ({
  title,
  removeMargin,
  btnTitle,
  textSettings,
  clickHandler,
}: IProps) => {
  return (
    <div
      className={classNames(
        'w-full border-b font-semibold text-gray-700 pb-1 flex items-center justify-between',
        removeMargin ? 'mb-0' : 'mb-3',
        textSettings ? textSettings : 'text-lg'
      )}
    >
      {title}

      {clickHandler && (
        <button
          type="button"
          onClick={clickHandler}
          className="rounded-md bg-mainBackground px-2.5 py-1.5 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-all ease-in-out duration-150"
        >
          {btnTitle}
        </button>
      )}
    </div>
  );
};

export default SectionHeading;
