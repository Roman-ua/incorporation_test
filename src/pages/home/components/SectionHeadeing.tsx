import React from 'react';

interface IProps {
  title: string;
}

const SectionHeading = ({ title }: IProps) => {
  return (
    <div className="text-xl font-bold text-gray-700 border-b py-1.5 mb-3">
      {title}
    </div>
  );
};

export default SectionHeading;
