import SectionHeading from '../../company/components/SectionHeading';
import { USStates } from '../../../constants/form/form';
import React from 'react';

const mock = [
  {
    id: 1,
    name: 'John Doe',
    title: 'CEO',
    address: {
      country: 'United States',
      address0: '1234 Elm St',
      address1: 'Apt 5B',
      address2: '',
      address3: '',
      city: 'Birmingham',
      zip: '35203',
      state: 'Alabama',
    },
  },
  {
    id: 2,
    name: 'Philip Moris',
    title: 'Accountant',
    address: {
      country: 'United States',
      address0: '1234 Elm St',
      address1: 'Apt 5B',
      address2: '',
      address3: '',
      city: 'Birmingham',
      zip: '35203',
      state: 'Alabama',
    },
  },
  {
    id: 3,
    name: 'User Admin',
    title: 'Developer',
    address: {
      country: 'United States',
      address0: '1234 Elm St',
      address1: 'Apt 5B',
      address2: '',
      address3: '',
      city: 'Birmingham',
      zip: '35203',
      state: 'Alabama',
    },
  },
];

const PeopleList = () => {
  return (
    <div className="mb-8">
      <SectionHeading title="People" />
      {mock.map((person, rowIndex) => (
        <div
          key={rowIndex}
          className="flex items-start justify-start mb-4 max-lg:flex-col"
        >
          <div className="w-1/2 max-lg:w-full max-lg:mb-3">
            <div className="w-full flex items-start justify-between pb-2">
              <div className="w-1/3 max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                Name
              </div>
              <div className="w-full pr-2 text-gray-700">{person.name}</div>
            </div>
            <div className="w-full flex items-start justify-between pb-2">
              <div className="w-1/3 max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                Title
              </div>
              <div className="w-full pr-2 text-gray-700">{person.title}</div>
            </div>
          </div>
          <div className="w-1/2 max-lg:w-full">
            <div className="w-full flex items-start justify-between pb-2">
              <div className="w-1/3 max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                Address
              </div>
              <div className="w-full pr-2 text-gray-700">
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PeopleList;
