import React from 'react';
import SectionHeading from './SectionHeading';
import { LuArrowUpRight } from 'react-icons/lu';
import { classNames } from '../../../utils/helpers';
import { IconFileTypePdf } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/navigation/routes';
import { EmptySection } from '../../../components/shared/EmptySection';
import { useRecoilValue } from 'recoil';
import AnnualReportsState from '../../../state/atoms/AnnualReports';

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

interface IProps {
  addReportModal: () => void;
}

const AnnualReportsListFL = ({ addReportModal }: IProps) => {
  const navigate = useNavigate();
  const reportsList = useRecoilValue(AnnualReportsState);

  return (
    <>
      <SectionHeading
        title="Annual Reports"
        removeMargin={true}
        clickHandler={addReportModal}
        btnTitle="Add Report"
      />

      <div className="w-full overflow-hidden mb-12">
        {reportsList.list.length ? (
          <div>
            {reportsList.list.map((report, rowIndex) => (
              <div
                onClick={() => navigate(`${ROUTES.REPORT}/${report.id}`)}
                key={rowIndex}
                className={`flex py-3 group hover:cursor-pointer transition-all ease-in-out duration-150 border-b border-gray-100`}
              >
                <div className="w-[20%] pr-2 flex items-center justify-start font-bold text-gray-900">
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
                <div className="w-[24%] px-1 flex items-center justify-start text-gray-900">
                  {report.filingDate}
                </div>
                <div className="w-[24%] px-2 flex items-center justify-start text-gray-900 justify-end">
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
        ) : (
          <EmptySection
            title="No Annual Reports Found"
            ctaText="Add Annual Report"
            onAction={addReportModal}
          />
        )}
      </div>
    </>
  );
};

export default AnnualReportsListFL;
