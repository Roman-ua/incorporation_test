import React from 'react';

interface TableHeaderRowProps {
  children: React.ReactNode;
}
const TableHeaderRow = ({ children }: TableHeaderRowProps) => {
  return (
    <div
      className={`flex py-1 group text-xs transition-all ease-in-out duration-150 border-b border-gray-100`}
    >
      {children}
    </div>
  );
};

export default TableHeaderRow;
