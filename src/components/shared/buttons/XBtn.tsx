import { IconX } from '@tabler/icons-react';
import React from 'react';

interface IProps {
  clickHandler: () => void;
}
const XBtn = ({ clickHandler }: IProps) => {
  return (
    <div
      onClick={clickHandler}
      className="flex items-center justify-between absolute top-5 right-5 p-1.5 hover:cursor-pointer hover:bg-gray-50 transition-all ease-in-out duration-150 rounded-md"
    >
      <IconX className="w-4 h-4 text-gray-700" />
    </div>
  );
};

export default XBtn;
