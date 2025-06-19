import React from 'react';

import { ROUTES } from '../../constants/navigation/routes';
import { useNavigate } from 'react-router-dom';
import SearchHeading from './components/SearchHeader';
import { classNames } from '../../utils/helpers';
import SectionHeading from '../home/components/SectionHeading';
import { useRecoilValue } from 'recoil';
import PeopleState from '../../state/atoms/People';

const statusBadge = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-50 text-green-700 ring-green-600/20';
    case 'Inactive':
      return 'bg-red-50 text-red-700 ring-red-600/20';
    case 'Dissolved':
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    case 'Withdrawn':
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    default:
      return 'bg-red-50 text-red-700 ring-red-600/20';
  }
};

function People() {
  const navigate = useNavigate();

  const peopleData = useRecoilValue(PeopleState);

  const handleButtonClick = (id: number) => {
    navigate(`${ROUTES.PERSON}/${id}`);
  };

  return (
    <div className="relative pl-10 pr-10 py-4 max-sm:pl-4 max-sm:pr-4 container max-w-7xl mx-auto">
      <SearchHeading setOpenModal={() => navigate(ROUTES.ADD_PERSON)} />
      <>
        <SectionHeading title="People" />
        <div className="w-full overflow-auto text-sm">
          <div className="w-full divide-y divide-gray-300">
            <div className="flex py-3 pl-3 pr-3">
              <div className="w-[25%] text-sm font-medium   text-gray-500">
                Name
              </div>
              <div className="w-[25%] text-sm font-medium   text-gray-500">
                Email
              </div>
              <div className="w-[50%] text-sm font-medium   text-gray-500 text-right">
                Status
              </div>
            </div>
            <div className="divide-y divide-gray-200 bg-white">
              {peopleData.map((person) => {
                return (
                  <div
                    key={person.id}
                    onClick={() => handleButtonClick(+person.id)}
                    className="flex py-4 hover:bg-gray-100 transition-all duration-150 ease-in-out hover:cursor-pointer group"
                  >
                    <div className="w-[25%] pl-3 pr-3 text-sm font-semibold text-gray-700 flex items-center gap-2">
                      {person.picture ? (
                        <img
                          src={person.picture}
                          alt={person.fullName}
                          className="w-6 h-6 rounded-full"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                          {person.fullName.charAt(0)}
                        </div>
                      )}
                      {person.fullName}
                    </div>
                    <div className="w-[25%] px-1.5 text-sm text-gray-700">
                      {person.email}
                    </div>
                    <div className="w-[50%] px-3 text-sm text-gray-500 text-right">
                      <span
                        className={classNames(
                          'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
                          statusBadge(person.status || '')
                        )}
                      >
                        {person.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default People;
