import React from 'react';
import { BsThreeDots } from 'react-icons/bs';

interface TableThreeDotsMenuProps {
  setShowActionMenu: (showActionMenu: string | null) => void;
  showActionMenu: string | null;
  row: {
    id: string;
  };
  dropMenuItems: { title: string; onClick: () => void }[];
}
const TableThreeDotsMenu = ({
  setShowActionMenu,
  showActionMenu,
  dropMenuItems,
  row,
}: TableThreeDotsMenuProps) => {
  return (
    <div className="relative">
      <button
        onClick={() =>
          setShowActionMenu(showActionMenu === row.id ? null : row.id)
        }
        className="p-1 hover:bg-gray-100 rounded-md w-8 h-8 flex items-center justify-center transition-all duration-200"
      >
        <BsThreeDots className="w-4 h-4" />
      </button>

      {showActionMenu === row.id && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-md z-10">
          <div className="py-1">
            {dropMenuItems.map((item) => (
              <button
                key={item.title}
                onClick={item.onClick}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-400 cursor-not-allowed"
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TableThreeDotsMenu;
