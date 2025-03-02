import SectionHeading from '../../company/components/SectionHeading';
import React from 'react';
import {
  AddressFields,
  Agent,
  Person,
  ReportData,
} from '../../../interfaces/interfaces';
import { USStates } from '../../../constants/form/form';
import { classNames, dockFieldHandler } from '../../../utils/helpers';
import StateSolidIconHandler from '../../../components/shared/StateSolidIconHandler';
import TooltipWrapper from '../../../components/shared/TooltipWrapper';
import { IconInfoCircle } from '@tabler/icons-react';
import { FaSignature } from 'react-icons/fa6';

interface IProps {
  reportData: ReportData;
  agentReportData: Agent;
  peopleData: Person[];
  clickHandlerPeople?: () => void;
  clickHandlerAddress?: () => void;
  status: string;
}

const statusBadge = (status: string) => {
  switch (status) {
    case 'Filed':
      return 'bg-green-50 text-green-700 ring-green-600/20';
    case 'In Progress':
      return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
    case 'Cancelled':
      return 'bg-red-50 text-red-700 ring-red-600/20';
    case 'Confirmation Needed':
      return 'bg-red-50 text-red-700 ring-red-600/20';
    case 'Declined':
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    case 'Confirmed':
      return 'bg-blue-50 text-blue-700 ring-blue-600/20';
    case 'Waiting for Confirmation':
      return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
    default:
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
  }
};

const RenderAddress = (removed: boolean, address: AddressFields) => {
  return (
    <>
      <div
        className={classNames(
          removed ? 'line-through text-gray-400' : 'text-gray-800'
        )}
      >
        <span>{address.address0}, </span>
        {address.address1 && <span>{address.address1}</span>}
      </div>
      <div
        className={classNames(
          removed ? 'line-through text-gray-400' : 'text-gray-800'
        )}
      >
        {address.address2 && <span>{address.address2}</span>}
        {address.address3 && (
          <span>
            {address.address2 ? ',' : ''} {address.address3}
          </span>
        )}
      </div>
      <div
        className={classNames(
          removed ? 'line-through text-gray-400' : 'text-gray-800'
        )}
      >
        <span>{address.city}, </span>
        <span>
          {USStates.find((item) => item.title === address.state)?.value || ''}{' '}
        </span>
        <span>{address.zip}</span>
      </div>
      <div
        className={classNames(
          removed ? 'line-through text-gray-400' : 'text-gray-800'
        )}
      >
        {address.country}
      </div>
      <div className="my-4" />
    </>
  );
};

const SubmitReviewStep = ({
  reportData,
  agentReportData,
  peopleData,
  clickHandlerPeople,
  clickHandlerAddress,
  status,
}: IProps) => {
  return (
    <>
      <div className="w-full flex items-start justify-center max-lg:flex-col">
        <dl className="w-full mt-4 mb-12 flex items-start justify-start overflow-x-scroll">
          <div className="flex flex-col gap-y-1 pr-5">
            <dt className="text-sm text-gray-500">Year</dt>
            <dd className="text-sm font-semibold tracking-tight text-gray-800">
              {reportData?.year}
            </dd>
          </div>
          <div className="flex flex-col gap-y-1 border-l px-5">
            <dt className="text-nowrap text-sm text-gray-500">Status</dt>
            <span
              className={classNames(
                'w-fit inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset whitespace-nowrap',
                statusBadge(status)
              )}
            >
              {status}
            </span>
          </div>
          <div className="flex flex-col gap-y-1 border-l px-5">
            <dt className="text-nowrap text-sm text-gray-500">Company Name</dt>
            <dd className="text-nowrap text-sm font-semibold tracking-tight text-gray-800 relative pr-6">
              {reportData.companyName}
            </dd>
          </div>
          <div className="flex flex-col gap-y-1 border-l px-5">
            <dt className="text-nowrap text-sm text-gray-500">Due Date</dt>
            <dd className="text-nowrap text-sm font-semibold tracking-tight text-gray-800 relative pr-6">
              May 1, {+reportData.year + 1}
            </dd>
          </div>
          <div className="flex flex-col gap-y-1 border-l px-5">
            <dt className="text-nowrap text-sm text-gray-500">State</dt>
            <dd className="text-nowrap text-sm font-semibold tracking-tight text-gray-800 relative pr-6 flex items-center justify-start">
              <StateSolidIconHandler
                simpleIcon={true}
                selectedState={reportData.state || 'Florida'}
                state={reportData.state || 'Florida'}
              />
              {reportData.state}
            </dd>
          </div>
          <div className="flex flex-col gap-y-1 border-l px-5">
            <dt className="text-nowrap text-sm text-gray-500">
              {dockFieldHandler(reportData.state)}
            </dt>
            <dd className="text-nowrap text-sm font-semibold tracking-tight text-gray-800 relative pr-6">
              {reportData.registrationNumber}
            </dd>
          </div>
        </dl>
      </div>
      <div className="mb-12">
        <div className="w-full border-b text-base font-semibold text-gray-700 pb-1 mb-3 flex items-center justify-between">
          Address
          {clickHandlerAddress && (
            <button
              type="button"
              onClick={clickHandlerAddress}
              className="min-w-28 rounded-md bg-mainBackground px-2.5 py-1.5 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-all ease-in-out duration-150"
            >
              Make Changes
            </button>
          )}
        </div>
        <div className="w-full flex items-start justify-start max-lg:flex-col">
          <div className="w-1/2 flex items-start justify-start pb-2 max-lg:w-full">
            <div className="pr-2 text-gray-700 text-sm">
              <div className="text-sm text-gray-500 mb-1">Main Address</div>
              {reportData.updatedAddress &&
                RenderAddress(
                  false,
                  reportData.updatedAddress as AddressFields
                )}
              {RenderAddress(!!reportData.updatedAddress, reportData.address)}
            </div>
          </div>
          <div className="w-1/2 flex items-start justify-between pb-2 ">
            <div className="pr-2 text-gray-700 text-sm">
              <div className="text-sm text-gray-500 mb-1">Mailing Address</div>
              {reportData.updatedMailingAddress &&
                RenderAddress(
                  false,
                  reportData.updatedMailingAddress as AddressFields
                )}
              {RenderAddress(
                !!reportData.updatedMailingAddress,
                reportData.mailingAddress
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-12">
        <div className="w-full border-b text-base font-semibold text-gray-700 pb-1 mb-3 flex items-center justify-between">
          People
          {clickHandlerPeople && (
            <button
              type="button"
              onClick={clickHandlerPeople}
              className="min-w-28 rounded-md bg-mainBackground px-2.5 py-1.5 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-all ease-in-out duration-150"
            >
              Make Changes
            </button>
          )}
        </div>
        {peopleData.map((person, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex py-3 group transition-all ease-in-out duration-150 items-start justify-start w-full`}
          >
            <div
              className={classNames(
                'whitespace-nowrap w-1/2 pr-2 flex items-start justify-start  text-gray-900'
              )}
            >
              <span className="mr-4 min-w-7 min-h-7 text-lg font-bold text-white bg-gray-300 rounded-full flex items-center justify-center">
                {person.name[0]}
              </span>
              <div
                className={classNames(
                  'text-sm flex flex-col items-start justify-start',
                  person.removed ? 'line-through text-gray-400' : ''
                )}
              >
                <span
                  className={classNames(
                    'font-semibold flex items-center justify-start',
                    person.removed ? 'text-gray-400' : 'text-gray-900'
                  )}
                >
                  {person.name}{' '}
                  {person.signer && (
                    <TooltipWrapper tooltipText="Signer of the Annual Report">
                      <FaSignature
                        className={classNames(
                          'w-4 h-4 ml-2 hover:cursor-pointer',
                          person.removed ? 'text-gray-400' : 'text-gray-700'
                        )}
                      />
                    </TooltipWrapper>
                  )}
                </span>
                <span
                  className={classNames(
                    ' font-semibold text-xs',
                    person.removed ? 'text-gray-400' : 'text-gray-500'
                  )}
                >
                  {person.title}
                </span>
                <span className="text-gray-400">{person.email}</span>
              </div>
            </div>
            <div
              className={classNames(
                'whitespace-nowrap w-1/2 flex items-center justify-start',
                person.removed ? 'line-through text-gray-400' : ''
              )}
            >
              <div
                className={classNames(
                  'w-full pr-2 text-sm ',
                  person.removed ? 'text-gray-400' : 'text-gray-800'
                )}
              >
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
        ))}
      </div>
      <div className="mb-12">
        <SectionHeading title="Registered Agent" textSettings={'text-base'} />
        <div className="w-full flex items-start justify-start mb-12 max-lg:flex-col">
          <div className="w-1/2 flex items-start justify-between pb-2 max-lg:w-full">
            <div className="pr-1 text-gray-700 text-sm">
              <div className="text-sm text-gray-500 mb-1">Name</div>
              <div className="font-semibold text-gray-800">
                {agentReportData.name}
              </div>
            </div>
          </div>
          <div className="w-1/2 flex items-start justify-start pb-2">
            <div className="w-full pr-2 text-gray-800 text-sm">
              <div className="text-sm text-gray-500 mb-1">Address</div>
              <div>
                <span>{agentReportData.address.address0}, </span>
                {agentReportData.address.address1 && (
                  <span>{agentReportData.address.address1}</span>
                )}
              </div>
              <div>
                {agentReportData.address.address2 && (
                  <span>{agentReportData.address.address2}</span>
                )}
                {agentReportData.address.address3 && (
                  <span>
                    {agentReportData.address.address2 ? ',' : ''}{' '}
                    {agentReportData.address.address3}
                  </span>
                )}
              </div>
              <div>
                <span>{agentReportData.address.city}, </span>
                <span>
                  {USStates.find(
                    (item) => item.title === agentReportData.address.state
                  )?.value || ''}{' '}
                </span>
                <span>{agentReportData.address.zip}</span>
                {agentReportData.address?.county && (
                  <span>
                    , {agentReportData.address?.county}
                    <TooltipWrapper tooltipText="County">
                      <IconInfoCircle className="w-3.5 h-3.5 relative -right-1 top-0.5 text-gray-400 hover:cursor-pointer hover:text-gray-500" />
                    </TooltipWrapper>
                  </span>
                )}
              </div>
              <div>{agentReportData.address.country}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SubmitReviewStep;
