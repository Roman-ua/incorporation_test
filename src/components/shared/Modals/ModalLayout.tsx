import React from 'react';
import XBtn from '../buttons/XBtn';

interface IProps {
  title: string;
  actionBtnTitle: string;
  setOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  cancelHandler?: () => void;
  submitHandler?: () => void;
  deleteAction?: () => void;
}
const ModalLayout = ({
  title,
  actionBtnTitle,
  setOpen,
  children,
  cancelHandler,
  submitHandler,
  deleteAction,
}: IProps) => {
  return (
    <>
      <div className="p-5">
        <div className="flex items-center justify-between mb-5">
          <span className="text-gray-900 text-lg font-bold">{title}</span>
          <XBtn clickHandler={() => setOpen(false)} />
        </div>
        {children}
      </div>
      <div className="w-full bg-gray-100 py-3 px-5 rounded-b-lg">
        <div className="mr-auto flex items-center justify-end">
          {deleteAction ? (
            <div
              onClick={deleteAction}
              className="mr-auto block rounded-md bg-red-50 border-red-50 px-3 py-2 border text-center text-sm font-semibold shadow-sm text-gray-900 hover:bg-red-100 hover:border-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
            >
              Delete
            </div>
          ) : (
            <div className="w-1/2" />
          )}
          {cancelHandler && (
            <div
              onClick={cancelHandler}
              className="mr-2 block px-3 py-2 text-center text-sm font-semibold text-gray-800 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
            >
              Cancel
            </div>
          )}
          {submitHandler && (
            <div
              onClick={submitHandler}
              className="block rounded-md bg-mainBlue px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
            >
              {actionBtnTitle}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ModalLayout;
