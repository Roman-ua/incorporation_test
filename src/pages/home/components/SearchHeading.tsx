import React from 'react';
import { ROUTES } from '../../../constants/navigation/routes';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchHeading = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(ROUTES.CREATE_COMPANY);
  };
  return (
    <div className="flex items-center pb-3 mb-3 text-sm">
      <form action="#" method="GET" className="relative flex flex-1">
        <label htmlFor="search-field" className="sr-only">
          Search
        </label>
        <MagnifyingGlassIcon
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
        />
        <input
          id="search-field"
          name="search"
          type="search"
          placeholder="Search..."
          className="outline-0 block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-700 placeholder:text-gray-400 focus:ring-0 sm:text-base"
        />
      </form>
      <div className="mt-0 ml-16">
        <button
          type="button"
          onClick={handleButtonClick}
          className="block rounded-md bg-mainBlue px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          + New Company
        </button>
      </div>
    </div>
  );
};

export default SearchHeading;
