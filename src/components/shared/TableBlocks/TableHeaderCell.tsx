import React from 'react';
import { ArrowDownUp } from 'lucide-react';
import { classNames } from '../../../utils/helpers';

interface TableHeaderCellProps {
  column: {
    key: string;
    label: string;
    sortable: boolean;
  };
  additionalClasses?: string;
}
const TableHeaderCell = ({
  column,
  additionalClasses,
}: TableHeaderCellProps) => {
  return (
    <div
      className={classNames(
        'w-[20%] gap-2 px-2 flex items-center justify-start font-semibold text-xs text-gray-500 ',
        additionalClasses || ''
      )}
    >
      {column.label}
      {column.sortable && (
        <ArrowDownUp className="w-3.5 h-3.5 hover:cursor-pointer" />
      )}
    </div>
  );
};

export default TableHeaderCell;
