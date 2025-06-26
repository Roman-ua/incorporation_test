import React from 'react';

interface TableBodyRowProps {
  children: React.ReactNode;
}
const TableBodyRow = ({ children }: TableBodyRowProps) => {
  return (
    <div className="flex py-3 group hover:cursor-pointer transition-all ease-in-out duration-150 border-b border-gray-100">
      {children}
    </div>
  );
};

export default TableBodyRow;
