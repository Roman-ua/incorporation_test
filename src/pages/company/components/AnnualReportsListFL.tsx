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
    relatedOrder: '#12312344',
    attachedFiles: true,
  },
  {
    id: 2,
    year: 2020,
    status: 'Need to File',
    filingDate: '-',
    relatedOrder: '#1234421',
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
    relatedOrder: '#1234',
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
      <SectionHeading title="Annual reports" removeMargin={true} />
      <div className="flow-root mb-12">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y">
              <tbody className="divide-y divide-gray-200 bg-white">
                {mock.map((report) => (
                  <tr
                    key={report.id}
                    className="transition-all ease-in-out duration-150 group"
                  >
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="font-bold text-gray-900">
                          {report?.year}
                        </div>
                        {report?.attachedFiles && (
                          <IconFileTypePdf className="w-3 h-3 text-gray-500 ml-2" />
                        )}
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                      <span
                        className={classNames(
                          'w-fit inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset',
                          statusBadge(report?.status)
                        )}
                      >
                        {report?.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                      <div className="text-gray-900">{report?.filingDate}</div>
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-900">
                      {report?.relatedOrder}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <div className="p-1 rounded w-fit ml-auto bg-gray-700 text-white hover:bg-gray-900 transition-all duration-150 ease-in-out hover:cursor-pointer opacity-0 group-hover:opacity-100">
                        <LuArrowUpRight className="h-4 w-4" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnualReportsListFL;
