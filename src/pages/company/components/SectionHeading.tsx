import React from 'react';
interface IProps {
  title: string;
  removeMargin?: boolean;
  textSettings?: string;
}

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const SectionHeading = ({ title, removeMargin, textSettings }: IProps) => {
  return (
    <div
      className={classNames(
        'w-full border-b font-semibold text-gray-700 pb-1',
        removeMargin ? 'mb-0' : 'mb-3',
        textSettings ? textSettings : 'text-lg'
      )}
    >
      {title}
    </div>
  );
};

export default SectionHeading;
