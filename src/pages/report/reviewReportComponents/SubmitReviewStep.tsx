import SectionHeading from '../../company/components/SectionHeading';
// import RegisteredAgent from '../components/RegisteredAgent';
import React from 'react';
import { Agent, Person, ReportData } from '../../../interfaces/interfaces';
import { USStates } from '../../../constants/form/form';
import { classNames, dockFieldHandler } from '../../../utils/helpers';

interface IProps {
  reportData: ReportData;
  agentReportData: Agent;
  peopleData: Person[];
}
const SubmitReviewStep = ({
  reportData,
  agentReportData,
  peopleData,
}: IProps) => {
  return (
    <>
      <div className="w-full flex items-start justify-center max-lg:flex-col">
        <div className="w-1/2 mr-2 max-lg:w-full">
          <SectionHeading title="Details" />
          <div className="flex items-start justify-start mb-12">
            <div className="w-full max-lg:w-full max-lg:mb-3">
              <div className="w-full flex items-start justify-between pb-2">
                <div className="w-1/2 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                  Year
                </div>
                <div className="w-full pr-2 text-gray-700 text-sm">
                  {reportData.year}
                </div>
              </div>
              <div className="w-full flex items-start justify-between pb-2">
                <div className="w-1/2 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                  Company Name
                </div>
                <div className="w-full pr-2 text-gray-700 text-sm">
                  {reportData.companyName}
                </div>
              </div>
              <div className="w-full flex items-start justify-between pb-2">
                <div className="w-1/2 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                  State
                </div>
                <div className="w-full pr-2 text-gray-700 text-sm">
                  {reportData.state}
                </div>
              </div>
              <div className="w-full flex items-start justify-between pb-2">
                <div className="w-1/2 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                  {dockFieldHandler(reportData.state)}
                </div>
                <div className="w-full pr-2 text-gray-700 group flex items-center justify-start hover:cursor-pointer text-sm">
                  {reportData.registrationNumber}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 ml-2 max-lg:w-full">
          <SectionHeading title="Addresses" />
          <div className="flex items-start gap-16 justify-start mb-12">
            <div className="flex items-start justify-start pb-2">
              <div className="w-full pr-2 text-gray-700 text-sm">
                <div className="text-sm text-gray-500 mb-1">Main Address</div>
                <div>
                  <span>{reportData.address.address0}, </span>
                  {reportData.address.address1 && (
                    <span>{reportData.address.address1}</span>
                  )}
                </div>
                <div>
                  {reportData.address.address2 && (
                    <span>{reportData.address.address2}</span>
                  )}
                  {reportData.address.address3 && (
                    <span>
                      {reportData.address.address2 ? ',' : ''}{' '}
                      {reportData.address.address3}
                    </span>
                  )}
                </div>
                <div>
                  <span>{reportData.address.city}, </span>
                  <span>
                    {USStates.find(
                      (item) => item.title === reportData.address.state
                    )?.value || ''}{' '}
                  </span>
                  <span>{reportData.address.zip}</span>
                </div>
                <div>{reportData.address.country}</div>
              </div>
            </div>
            <div className="flex items-start justify-between pb-2 ">
              <div className="w-full pr-2 text-gray-700 text-sm">
                <div className="text-sm text-gray-500 mb-1">
                  Mailing Address
                </div>
                <div>
                  <span>{reportData.address.address0}, </span>
                  {reportData.address.address1 && (
                    <span>{reportData.address.address1}</span>
                  )}
                </div>
                <div>
                  {reportData.address.address2 && (
                    <span>{reportData.address.address2}</span>
                  )}
                  {reportData.address.address3 && (
                    <span>
                      {reportData.address.address2 ? ',' : ''}{' '}
                      {reportData.address.address3}
                    </span>
                  )}
                </div>
                <div>
                  <span>{reportData.address.city}, </span>
                  <span>
                    {USStates.find(
                      (item) => item.title === reportData.address.state
                    )?.value || ''}{' '}
                  </span>
                  <span>{reportData.address.zip}</span>
                </div>
                <div>{reportData.address.country}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-12">
        <SectionHeading title="Registered Agent" />
        <div className="flex items-start justify-start mb-12 max-lg:flex-col">
          <div className="w-1/2 max-lg:w-full max-lg:mb-3">
            <div className="w-full flex items-start justify-between pb-2">
              <div className="w-1/2 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                Name
              </div>
              <div className="w-full pr-2 text-gray-700 text-sm">
                {agentReportData.name}
              </div>
            </div>
            <div className="w-full flex items-start justify-between pb-2">
              <div className="w-1/2 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                Address
              </div>
              <div className="w-full pr-2">
                <div className="text-gray-700 text-sm">
                  <span>{agentReportData.address.address0}, </span>
                  {agentReportData.address.address1 && (
                    <span>{agentReportData.address.address1}</span>
                  )}
                </div>
                <div className="text-gray-700 text-sm">
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
              </div>
            </div>
          </div>
          <div className="w-1/2 max-lg:w-full">
            <div className="w-full flex items-start justify-between pb-2">
              <div className="w-1/2 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                City
              </div>
              <div className="w-full pr-2 text-gray-700 text-sm">
                {agentReportData.address.city}
              </div>
            </div>
            <div className="w-full flex items-start justify-between pb-2">
              <div className="w-1/2 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                State
              </div>
              <div className="w-full pr-2 text-gray-700 text-sm">
                {agentReportData.address.state}
              </div>
            </div>
            <div className="w-full flex items-start justify-between pb-2">
              <div className="w-1/2 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                Postal Code
              </div>
              <div className="w-full pr-2 text-gray-700 text-sm">
                {agentReportData.address.zip}
              </div>
            </div>
            <div className="w-full flex items-start justify-between pb-2">
              <div className="w-1/2 text-sm max-xl:w-1/2 pr-2 text-nowrap text-gray-500">
                Country
              </div>
              <div className="w-full pr-2 text-gray-700 text-sm">
                {agentReportData.address.country}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-12">
        <SectionHeading title="People" />
        {peopleData.map((person, rowIndex) => (
          <div
            key={rowIndex}
            className={classNames(
              'flex py-3 group transition-all ease-in-out duration-150 items-start justify-start',
              person?.removed ? 'bg-red-50' : '',
              person?.added ? 'bg-green-50' : ''
            )}
          >
            <div className="whitespace-nowrap overflow-hidden w-[25%] pr-2 flex items-center justify-start  text-gray-900">
              <div className="text-sm flex flex-col items-start justify-start">
                <span>{person.name}</span>
              </div>
            </div>
            <div className="whitespace-nowrap overflow-hidden w-[30%] px-2 flex items-center justify-start">
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
            </div>
            <div className="text-sm whitespace-nowrap overflow-hidden w-[24%] px-2 flex items-center justify-start">
              {person.title}
            </div>
            <div className="whitespace-nowrap overflow-hidden w-[10%] px-2 flex items-center justify-start"></div>
            <div className="pl-2 flex items-center justify-end ml-auto w-[20%]">
              {person.added && (
                <span className="text-sm text-green-500 pr-2">Added</span>
              )}
              {person.removed && (
                <span className="text-sm text-red-500 pr-2">Removed</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mb-12">
        <SectionHeading title="Addresses Changes" />
        <div className="flex items-start gap-24 justify-start mb-12">
          <div className="flex items-start justify-start pb-2">
            <div className="w-full pr-2 text-gray-700 text-sm">
              <div className="text-sm text-gray-500 mb-1">Main Address New</div>
              <div>
                <span>{reportData.address.address0}, </span>
                {reportData.address.address1 && (
                  <span>{reportData.address.address1}</span>
                )}
              </div>
              <div>
                {reportData.address.address2 && (
                  <span>{reportData.address.address2}</span>
                )}
                {reportData.address.address3 && (
                  <span>
                    {reportData.address.address2 ? ',' : ''}{' '}
                    {reportData.address.address3}
                  </span>
                )}
              </div>
              <div>
                <span>{reportData.address.city}, </span>
                <span>
                  {USStates.find(
                    (item) => item.title === reportData.address.state
                  )?.value || ''}{' '}
                </span>
                <span>{reportData.address.zip}</span>
              </div>
              <div>{reportData.address.country}</div>
            </div>
          </div>
          <div className="flex items-start justify-start pb-2">
            <div className="w-full pr-2 text-gray-500 text-sm">
              <div className="text-sm text-gray-500 mb-1">Main Address Old</div>
              <div className="line-through">
                <span>{reportData.address.address0}, </span>
                {reportData.address.address1 && (
                  <span>{reportData.address.address1}</span>
                )}
              </div>
              <div className="line-through">
                {reportData.address.address2 && (
                  <span>{reportData.address.address2}</span>
                )}
                {reportData.address.address3 && (
                  <span>
                    {reportData.address.address2 ? ',' : ''}{' '}
                    {reportData.address.address3}
                  </span>
                )}
              </div>
              <div className="line-through">
                <span>{reportData.address.city}, </span>
                <span>
                  {USStates.find(
                    (item) => item.title === reportData.address.state
                  )?.value || ''}{' '}
                </span>
                <span>{reportData.address.zip}</span>
              </div>
              <div className="line-through">{reportData.address.country}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SubmitReviewStep;
