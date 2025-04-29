import React, { useState } from 'react';
import SectionHeading from './SectionHeading';
import { LuArrowUpRight } from 'react-icons/lu';
import { classNames } from '../../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/navigation/routes';
import { EmptySection } from '../../../components/shared/EmptySection';
import { IInvoices } from '../../../state/atoms/Invoices';
import { format, parseISO } from 'date-fns';

const statusBadge = (status: string) => {
  switch (status) {
    case 'Paid':
      return 'bg-green-50 text-green-700 ring-green-600/20';
    case 'Not Paid':
      return 'bg-red-50 text-red-700 ring-red-600/20';
    default:
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
  }
};

interface IProps {
  linkToHandler: () => void;
  refreshHandler: () => void;
  data: IInvoices[];
}

const InvoicesList = ({ linkToHandler, refreshHandler, data }: IProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Handle refresh with loading state
  const handleRefresh = () => {
    setIsLoading(true);

    // Call the original refresh handler
    refreshHandler();

    // Set a timeout to hide the loading state after 3 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <>
      <SectionHeading
        title="Invoices"
        removeMargin={!!data.length}
        clickHandler={data.length ? handleRefresh : linkToHandler}
        btnTitle={data.length ? 'Refresh' : 'Link to Xero'}
      />
      <div
        className={`w-full overflow-hidden mb-12 relative transition-all duration-300 ${
          isLoading
            ? 'ring-1 ring-gray-500/70 shadow-[0_0_0_4px_rgba(79,70,229,0.3)] animate-pulse rounded-md'
            : ''
        }`}
      >
        {/* Semi-transparent overlay during loading */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 pointer-events-none z-10">
            <div className="absolute top-2 right-2 flex items-center space-x-2 bg-white/90 px-3 py-1.5 rounded-full shadow-sm">
              <div className="h-3 w-3 rounded-full bg-gray-700 animate-pulse"></div>
              <span className="text-xs font-medium text-gray-700">
                Refreshing...
              </span>
            </div>
          </div>
        )}

        {data.length === 0 ? (
          <EmptySection
            title="No Linked Invoices Found"
            ctaText="Link to Xero"
            onAction={linkToHandler}
          />
        ) : (
          <div
            className={`transition-opacity duration-300 ${isLoading ? 'opacity-70' : 'opacity-100'}`}
          >
            {data?.map((report, rowIndex) => (
              <div
                onClick={() => navigate(`${ROUTES.REPORT}/${report.id}`)}
                key={rowIndex}
                className={`flex py-3 group hover:cursor-pointer transition-all ease-in-out duration-150 border-b border-gray-100`}
              >
                <div className="w-[20%] pr-2 flex items-center justify-start font-bold text-gray-900">
                  {report.id}
                </div>
                <div className="w-[20%] px-2 flex items-center justify-start text-gray-900">
                  {report.amount}
                </div>
                <div className="w-[20%] px-2 flex items-center justify-start text-gray-900">
                  {format(parseISO(report.date), 'MMMM d, yyyy')}
                </div>
                <div className="w-[15%] px-2 flex items-center justify-start text-gray-900">
                  {report.relatedTo}
                </div>
                <div className="w-[17%] px-2 flex items-center justify-start justify-end">
                  <span
                    className={classNames(
                      'w-fit inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
                      statusBadge(report?.status)
                    )}
                  >
                    {report?.status}
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
        )}
      </div>
    </>
  );
};

export default InvoicesList;
