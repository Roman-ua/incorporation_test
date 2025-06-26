import React from 'react';
import { classNames } from '../../../utils/helpers';

interface TableStatusItemProps {
  status: string;
}

const statusBadge = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-50 text-green-700 ring-green-600/20';
    case 'Pending':
      return 'bg-orange-50 text-orange-700 ring-orange-600/20';
    case 'Inactive':
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    default:
      return 'bg-red-50 text-red-700 ring-red-600/20';
  }
};
const TableStatusItem = ({ status }: TableStatusItemProps) => {
  return (
    <span
      className={classNames(
        'w-fit inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
        statusBadge(status)
      )}
    >
      {status}
    </span>
  );
};

export default TableStatusItem;
