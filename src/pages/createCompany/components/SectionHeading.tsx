import React from 'react';

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const SectionHeading = ({
  text,
  status,
}: {
  text: string;
  status: boolean;
}) => {
  return (
    <div className="flex items-center justify-between  mb-8">
      <h2 className="text-xl text-gray-600 font-semibold">{text}</h2>
      <span
        className={classNames(
          'inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset',
          status
            ? 'bg-green-50 text-green-700 ring-green-600/20'
            : 'bg-red-50 text-red-700 ring-red-600/20'
        )}
      >
        {status ? 'Saved' : 'Required'}
      </span>
    </div>
  );
};

export default SectionHeading;
