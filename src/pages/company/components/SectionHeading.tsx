import React from 'react';
interface IProps {
  title: string;
  extraClass?: string;
}

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const SectionHeading = ({ title, extraClass }: IProps) => {
  return (
    <div
      className={classNames(
        extraClass ? extraClass : '',
        'w-full border-b text-lg font-semibold text-gray-700 mb-3 pb-1'
      )}
    >
      {title}
    </div>
  );
};

export default SectionHeading;
