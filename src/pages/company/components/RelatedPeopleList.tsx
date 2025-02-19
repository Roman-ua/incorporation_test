import SectionHeading from './SectionHeading';
import { LuArrowUpRight } from 'react-icons/lu';
import React from 'react';
import { classNames } from '../../../utils/helpers';

const people = [
  {
    name: 'Lindsay Walton',
    title: 'Accountant',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    status: 'Active',
  },
  {
    name: 'Clark Kent',
    title: 'Manager, Director, Secretary, CTO',
    email: 'clark.kent@example.com',
    role: 'Owner',
    status: 'Inactive',
  },
  // More people...
];

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
}

const RelatedPeopleList = ({ addPersonHandler }: IProps) => {
  return (
    <>
      <SectionHeading
        title="People"
        removeMargin={true}
        clickHandler={addPersonHandler}
        btnTitle="New Person"
      />
      <div className="w-full overflow-hidden mb-12 hover:cursor-pointer">
        <div>
          {people.map((person, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex py-3 group transition-all ease-in-out duration-150`}
            >
              <div className="whitespace-nowrap overflow-hidden w-[20%] pr-2 flex items-center justify-start font-bold text-gray-900">
                <span className="mr-2 w-8 h-8 text-lg font-bold text-white bg-gray-300 rounded-full flex items-center justify-center">
                  {person.name[0]}
                </span>
                {person.name}
              </div>
              <div className="whitespace-nowrap overflow-hidden w-[24%] px-2 flex items-center justify-start text-gray-900">
                {person.email}
              </div>
              <div className="whitespace-nowrap overflow-hidden w-[24%] px-2 flex items-center justify-start">
                {person.title}
              </div>
              <div className="whitespace-nowrap overflow-hidden w-[24%] px-2 flex items-center justify-end text-gray-900">
                <span
                  className={classNames(
                    'w-fit inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset',
                    statusBadge(person?.status)
                  )}
                >
                  {person?.status}
                </span>
              </div>
              <div className="pl-2 flex items-center justify-end ml-auto">
                <div className="p-1 rounded w-fit bg-gray-700 text-white hover:bg-gray-900 transition-all duration-150 ease-in-out hover:cursor-pointer opacity-0 group-hover:opacity-100">
                  <LuArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/*<div className="flow-root mb-12">*/}
      {/*  <div className="overflow-x-auto">*/}
      {/*    <div className="inline-block min-w-full align-middle">*/}
      {/*      <table className="min-w-full divide-y">*/}
      {/*        <tbody className="divide-y divide-gray-200 bg-white">*/}
      {/*          {people.map((person) => (*/}
      {/*            <tr*/}
      {/*              key={person.email}*/}
      {/*              className="transition-all ease-in-out duration-150 group"*/}
      {/*            >*/}
      {/*              <td className="whitespace-nowrap max-w-80 w-80 py-[18px] pl-4 pr-3 text-sm sm:pl-0">*/}
      {/*                <div className="flex items-center">*/}
      {/*                  <div className="size-11 shrink-0">*/}
      {/*                    <span className="w-10 h-10 text-xl font-bold text-white bg-gray-300 rounded-full flex items-center justify-center">*/}
      {/*                      {person.name[0]}*/}
      {/*                    </span>*/}
      {/*                  </div>*/}
      {/*                  <div className="ml-4">*/}
      {/*                    <div className="font-medium text-gray-900">*/}
      {/*                      {person.name}*/}
      {/*                    </div>*/}
      {/*                    <div className="mt-1 text-gray-500">*/}
      {/*                      {person.email}*/}
      {/*                    </div>*/}
      {/*                  </div>*/}
      {/*                </div>*/}
      {/*              </td>*/}
      {/*              <td className="whitespace-nowrap max-w-80 w-80 px-3 py-[18px] text-sm text-gray-500">*/}
      {/*                <div className="text-gray-900">{person.title}</div>*/}
      {/*              </td>*/}
      {/*              <td className="whitespace-nowrap max-w-80 w-80 px-3 py-[18px] text-sm text-gray-500">*/}
      {/*                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">*/}
      {/*                  Active*/}
      {/*                </span>*/}
      {/*              </td>*/}
      {/*              <td className="whitespace-nowrap max-w-80 w-80 px-3 py-[18px] text-sm text-gray-500">*/}
      {/*                /!*{person.role}*!/*/}
      {/*              </td>*/}
      {/*              <td className="relative whitespace-nowrap py-[18px] pl-3 pr-4 text-right text-sm font-medium sm:pr-0">*/}
      {/*                <div className="p-1 rounded w-fit ml-auto bg-gray-700 text-white hover:bg-gray-900 transition-all duration-150 ease-in-out hover:cursor-pointer opacity-0 group-hover:opacity-100">*/}
      {/*                  <LuArrowUpRight className="h-4 w-4" />*/}
      {/*                </div>*/}
      {/*              </td>*/}
      {/*            </tr>*/}
      {/*          ))}*/}
      {/*        </tbody>*/}
      {/*      </table>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
};

export default RelatedPeopleList;
