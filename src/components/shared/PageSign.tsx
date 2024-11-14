import React from 'react';

interface IProps {
  title: string;
  icon: React.ReactElement;
}
const PageSign = ({ title, icon }: IProps) => {
  return (
    <div className="mb-4 flex items-center justify-start">
      {icon}
      <span className="text-[13px] text-gray-500">{title}</span>
    </div>
  );
};

export default PageSign;
