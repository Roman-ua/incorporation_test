import React from 'react';
import { ROUTES } from '../../../constants/navigation/routes';
import { useNavigate } from 'react-router-dom';

interface IProps {
  title: string;
}

const SectionHeading = ({ title }: IProps) => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(ROUTES.CREATE_COMPANY);
  };
  return (
    <div className="sm:flex sm:items-start mb-8">
      <div className="sm:flex-auto">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          {title}
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          A list of all the companies in your account.
        </p>
      </div>
      <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          type="button"
          onClick={handleButtonClick}
          className="block rounded-md bg-mainBlue px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Create new
        </button>
      </div>
    </div>
  );
};

export default SectionHeading;
