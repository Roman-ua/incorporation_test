import React from 'react';
interface IProps {
  title: string;
  removeMargin?: boolean;
}

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const SectionHeading = ({ title, removeMargin }: IProps) => {
  return (
    <div
      className={classNames(
        'w-full border-b text-lg font-semibold text-gray-700 pb-1',
        removeMargin ? 'mb-0' : 'mb-3'
      )}
    >
      {title}
    </div>
  );
};

export default SectionHeading;
