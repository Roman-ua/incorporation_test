import SectionHeading from './SectionHeading';
import React from 'react';
import { classNames } from '../../../utils/helpers';
import { Person } from '../modals/AddPersonToCompanyModal';
import { USStates } from '../../../constants/form/form';

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

interface IProps {
  addPersonHandler: () => void;
  peopleState: Person[];
}

const RelatedPeopleList = ({ addPersonHandler, peopleState }: IProps) => {
  console.log(peopleState, 'peopleState');
  return (
    <>
      <SectionHeading
        title="People"
        removeMargin={true}
        clickHandler={addPersonHandler}
        btnTitle="Add Person"
      />
      <div className="w-full overflow-hidden mb-12 hover:cursor-pointer">
        <div>
          {peopleState.map((person, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex pt-4 group transition-all ease-in-out duration-150 items-start justify-start`}
            >
              <div
                className={classNames(
                  'whitespace-nowrap max-lg:w-[24%] max-sm:w-1/2 pr-2 flex items-center justify-start  text-gray-900 w-[20%]'
                )}
              >
                <span className="mr-4 min-w-7 capitalize min-h-7 text-lg font-bold text-white bg-gray-300 rounded-full flex items-center justify-center">
                  {person.fullName[0]}
                </span>
                <div className="text-sm flex flex-col items-start justify-start">
                  <span className="font-bold flex items-center justify-start">
                    {person.fullName}{' '}
                  </span>
                  <span className="text-gray-400">{person.email}</span>
                </div>
              </div>
              <div className="whitespace-nowrap w-[18%] max-lg:hidden px-2 mr-16 flex items-center justify-start flex-wrap">
                {person.titles.map((title, index) => (
                  <span key={title} className="pr-1">
                    {title}
                    {index < person.titles.length - 1 ? ',' : ''}
                  </span>
                ))}
              </div>
              <div className="whitespace-nowrap w-[30%] max-lg:w-[30%] max-sm:w-1/2 px-2 flex items-center justify-start">
                {person.address.address0 && (
                  <div className="w-full pr-2 text-gray-700 text-sm">
                    <div>
                      <span>{person.address.address0}, </span>
                      {person.address.address1 && (
                        <span>{person.address.address1}</span>
                      )}
                    </div>
                    <div>
                      {person.address.address2 && (
                        <span>{person.address.address2}</span>
                      )}
                      {person.address.address3 && (
                        <span>
                          {person.address.address2 ? ',' : ''}{' '}
                          {person.address.address3}
                        </span>
                      )}
                    </div>
                    <div>
                      <span>{person.address.city}, </span>
                      <span>
                        {USStates.find(
                          (item) => item.title === person.address.state
                        )?.value || ''}{' '}
                      </span>
                      <span>{person.address.zip}</span>
                    </div>
                    <div>{person.address.country}</div>
                  </div>
                )}
              </div>
              <div className="pl-2 flex items-center justify-end ml-auto">
                <span
                  className={classNames(
                    'w-fit inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset',
                    statusBadge(person?.status)
                  )}
                >
                  {person?.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RelatedPeopleList;
