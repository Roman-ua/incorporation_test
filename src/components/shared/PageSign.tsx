import React from 'react';

interface IProps {
  title: string;
  icon: React.ReactElement;
}
const PageSign = ({ title, icon }: IProps) => {
  return (
    <div className="mb-4 flex items-center justify-start">
      {icon}
      <span className="text-sm text-gray-400">{title}</span>
    </div>
  );
};

export default PageSign;
