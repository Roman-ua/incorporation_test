import React from 'react';
import { classNames } from '../../utils/helpers';

interface IProps {
  title: string;
  icon: React.ReactElement;
  titleSize?: string;
}
const PageSign = ({ title, icon, titleSize }: IProps) => {
  return (
    <div className="mb-4 flex items-center justify-start">
      {icon}
      <span
        className={classNames(
          'text-gray-500',
          titleSize ? titleSize : 'text-[13px]'
        )}
      >
        {title}
      </span>
    </div>
  );
};

export default PageSign;
