import React from 'react';
interface IProps {
  title: string;
}

const SectionHeading = ({ title }: IProps) => {
  return (
    <div className="w-full border-b border-gray-100 text-lg font-semibold text-gray-700 mb-3 pb-1">
      {title}
    </div>
  );
};

export default SectionHeading;
