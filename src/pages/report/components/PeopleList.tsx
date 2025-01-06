import SectionHeading from '../../company/components/SectionHeading';
import { USStates } from '../../../constants/form/form';
import React from 'react';
import { LuArrowUpRight } from 'react-icons/lu';
import { FaSignature } from 'react-icons/fa6';
import TooltipWrapper from '../../../components/shared/TooltipWrapper';
import { IconPlus, IconSettings, IconTrashX } from '@tabler/icons-react';
import { Person } from '../../../interfaces/interfaces';
import { classNames } from '../../../utils/helpers';

interface IProps {
  editableList?: boolean;
  disabledRedirect?: boolean;
  hideHeading?: boolean;
  data: Person[];
  editAction?: (personId: number) => void;
  removeAction?: (personId: number) => void;
}
const PeopleList = ({
  editableList,
  disabledRedirect,
  hideHeading,
  editAction,
  removeAction,
  data,
}: IProps) => {
  return (
    <div className="mb-8">
      {!hideHeading && <SectionHeading title="People" />}
      {data.map((person, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex py-3 group transition-all ease-in-out duration-150 items-start justify-start`}
        >
          <div
            className={classNames(
              'whitespace-nowrap max-lg:w-[34%] max-sm:w-1/2 pr-2 flex items-start justify-start  text-gray-900',
              editableList ? 'w-[28%]' : 'w-[24%]'
            )}
          >
            <span className="mr-4 min-w-7 min-h-7 text-lg font-bold text-white bg-gray-300 rounded-full flex items-center justify-center">
              {person.name[0]}
            </span>
            <div className="text-sm flex flex-col items-start justify-start">
              <span className="font-bold flex items-center justify-start">
                {person.name}{' '}
                {person.signer && (
                  <TooltipWrapper tooltipText="Signer of the Annual Report">
                    <FaSignature className="w-4 h-4 text-gray-700 ml-2 hover:cursor-pointer" />
                  </TooltipWrapper>
                )}
              </span>
              <span className="text-gray-500 font-semibold">
                {person.title}
              </span>
              <span className="text-gray-400">{person.email}</span>
            </div>
          </div>
          <div className="whitespace-nowrap w-[24%] max-lg:w-[34%] max-sm:w-1/2 px-2 flex items-center justify-start">
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
          <div className="whitespace-nowrap w-[24%] max-lg:hidden px-2 flex items-center justify-start"></div>
          <div className="pl-2 flex items-center justify-end ml-auto">
            {!disabledRedirect && (
              <div className="p-1 rounded w-fit bg-gray-700 text-white hover:bg-gray-900 transition-all duration-150 ease-in-out hover:cursor-pointer opacity-0 group-hover:opacity-100">
                <LuArrowUpRight className="h-4 w-4" />
              </div>
            )}
            {editAction && (
              <IconSettings className="w-5 h-5 text-gray-700 ml-2 hover:text-gray-900 transition-all duration-150 ease-in-out hover:cursor-pointer hover:rotate-180" />
            )}
            {removeAction && (
              <IconTrashX className="w-5 h-5 text-red-400 ml-2 hover:text-red-700 transition-all duration-150 ease-in-out hover:cursor-pointer hover:rotate-12" />
            )}
          </div>
        </div>
      ))}
      {editableList && (
        <button
          type="button"
          className="ml-auto mt-10 flex items-center justify-center rounded-md group bg-mainBlue px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out"
        >
          Add Person
          <IconPlus className="w-5 h-5 text-white ml-2 group-hover:rotate-180 transition-all duration-150 ease-in-out" />
        </button>
      )}
    </div>
  );
};

export default PeopleList;
