import React from 'react';
import { ArrowDownUp } from 'lucide-react';

interface TableHeaderCellProps {
  column: {
    key: string;
    label: string;
    sortable: boolean;
  };
}
const TableHeaderCell = ({ column }: TableHeaderCellProps) => {
  return (
    <div className="w-[20%] gap-2 px-2 flex items-center justify-start font-semibold text-xs text-gray-500">
      {column.label}
      {column.sortable && (
        <ArrowDownUp className="w-3.5 h-3.5 hover:cursor-pointer" />
      )}
    </div>
  );
};

export default TableHeaderCell;
