import SectionHeading from '../../company/components/SectionHeading';
import { USStates } from '../../../constants/form/form';
import React from 'react';
import { LuArrowUpRight } from 'react-icons/lu';
import { PiSignatureFill } from 'react-icons/pi';
import { FaSignature } from 'react-icons/fa6';

const mock = [
  {
    id: 1,
    name: 'John Doe',
    title: 'CEO',
    email: 'example@gmail.com',
    signer: false,
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
    email: 'example@gmail.com',
    signer: true,
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
    email: 'example@gmail.com',
    signer: false,
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
          className={`flex py-3 group transition-all ease-in-out duration-150 items-start justify-start`}
        >
          <div className="whitespace-nowrap overflow-hidden w-[24%] max-lg:w-[34%] max-sm:w-1/2 pr-2 flex items-start justify-start  text-gray-900">
            <span className="mr-4 w-9 h-9 text-lg font-bold text-white bg-gray-300 rounded-full flex items-center justify-center">
              {person.name[0]}
            </span>
            <div className="text-sm flex flex-col items-start justify-start">
              <span className="font-bold flex items-center justify-start">
                {person.name}{' '}
                {person.signer && (
                  <PiSignatureFill className="w-4 h-4 text-gray-500 ml-2 opacity-0 max-lg:opacity-100" />
                )}
              </span>
              <span className="text-gray-500 font-semibold">
                {person.title}
              </span>
              <span className="text-gray-400">{person.email}</span>
            </div>
          </div>
          <div className="whitespace-nowrap overflow-hidden w-[24%] max-lg:w-[34%] max-sm:w-1/2 px-2 flex items-center justify-start">
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
                  {USStates.find((item) => item.title === person.address.state)
                    ?.value || ''}{' '}
                </span>
                <span>{person.address.zip}</span>
              </div>
              <div>{person.address.country}</div>
            </div>
          </div>
          <div className="whitespace-nowrap overflow-hidden w-[24%] max-lg:hidden px-2 flex items-center justify-start"></div>
          <div className="pl-2 flex items-center justify-end max-lg:hidden ml-auto">
            {person.signer && (
              <div className="flex mr-2 items-center justify-start text-xs px-1.5 py-0.5 rounded border border-gray-400 bg-gray-100">
                Signer
                <FaSignature className="w-4 h-4 text-gray-700 ml-2" />
              </div>
            )}
            <div className="p-1 rounded w-fit bg-gray-700 text-white hover:bg-gray-900 transition-all duration-150 ease-in-out hover:cursor-pointer opacity-0 group-hover:opacity-100">
              <LuArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PeopleList;
