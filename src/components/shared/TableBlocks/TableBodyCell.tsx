import React from 'react';
import { classNames } from '../../../utils/helpers';

interface TableBodyCellProps {
  children: React.ReactNode;
  additionalClasses?: string;
}
const TableBodyCell = ({ children, additionalClasses }: TableBodyCellProps) => {
  return (
    <div
      className={classNames(
        'w-[20%] px-2 flex items-center justify-start text-gray-900',
        additionalClasses || ''
      )}
    >
      {children}
    </div>
  );
};

export default TableBodyCell;
