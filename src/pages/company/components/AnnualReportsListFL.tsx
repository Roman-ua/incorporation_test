import React from 'react';
import SectionHeading from './SectionHeading';
import { LuArrowUpRight } from 'react-icons/lu';
import { classNames } from '../../../utils/helpers';
import { IconFileTypePdf } from '@tabler/icons-react';

const mock = [
  {
    id: 1,
    year: 2021,
    status: 'Filed',
    filingDate: 'February 12, 2021',
    relatedOrder: 'ord_12312344',
    attachedFiles: true,
  },
  {
    id: 2,
    year: 2020,
    status: 'Need to File',
    filingDate: '-',
    relatedOrder: 'ord_1234421',
    attachedFiles: false,
  },
  {
    id: 3,
    year: 2019,
    status: 'Declined',
    filingDate: 'February 12, 2019',
    relatedOrder: '-',
    attachedFiles: true,
  },
  {
    id: 4,
    year: 2018,
    status: 'Pending Confirmation',
    filingDate: 'February 12, 2018',
    relatedOrder: 'ord_1234',
    attachedFiles: false,
  },
];
const statusBadge = (status: string) => {
  switch (status) {
    case 'Filed':
      return 'bg-green-50 text-green-700 ring-green-600/20';
    case 'Need to File':
      return 'bg-red-50 text-red-700 ring-red-600/20';
    case 'Declined':
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    case 'Pending Confirmation':
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    default:
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
  }
};

const AnnualReportsListFL = () => {
  return (
    <>
      <SectionHeading title="Annual Reports" removeMargin={true} />
      <div className="w-full overflow-hidden mb-12">
        {/*<div className="flex bg-gray-200 text-gray-800 font-semibold">*/}
        {/*  {Array.from({ length: mock.length }).map((_, index) => (*/}
        {/*    <div*/}
        {/*      key={index}*/}
        {/*      className="w-[23%] p-2 border-r border-gray-300 text-center"*/}
        {/*    >*/}
        {/*      Column {index + 1}*/}
        {/*    </div>*/}
        {/*  ))}*/}
        {/*  <div className="w-[8%] p-2 text-center">Action</div>*/}
        {/*</div>*/}

        <div>
          {mock.map((report, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex py-3 group hover:cursor-pointer transition-all ease-in-out duration-150 border-b border-gray-100`}
            >
              <div className="w-[24%] pr-2 flex items-center justify-start font-bold text-gray-900">
                {report.year}
                {report?.attachedFiles && (
                  <IconFileTypePdf className="w-3 h-3 text-gray-500 ml-2" />
                )}
              </div>
              <div className="w-[24%] px-2 flex items-center justify-start">
                <span
                  className={classNames(
                    'w-fit inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset',
                    statusBadge(report?.status)
                  )}
                >
                  {report?.status}
                </span>
              </div>
              <div className="w-[24%] px-2 flex items-center justify-start text-gray-900">
                {report.filingDate}
              </div>
              <div className="w-[24%] px-2 flex items-center justify-start text-gray-900">
                {report.relatedOrder}
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
    </>
  );
};

export default AnnualReportsListFL;
