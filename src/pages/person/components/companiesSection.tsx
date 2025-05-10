import React from 'react';
// import SectionHeading from '../../company/components/SectionHeading';
import { classNames } from '../../../utils/helpers';
import { ROUTES } from '../../../constants/navigation/routes';
import { useNavigate } from 'react-router-dom';
import SectionHeading from '../../company/components/SectionHeading';
import { LuArrowUpRight } from 'react-icons/lu';
interface Company {
  id: number;
  name: string;
  status: string;
  registrationState: string;
  titles: string[];
}

interface CompaniesSectionProps {
  companies: Company[];
}

const statusBadge = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-50 text-green-700 ring-green-600/20';
    case 'Inactive':
      return 'bg-red-50 text-red-700 ring-red-600/20';
    case 'Dissolved':
      return 'bg-gray-50 text-gray-900 ring-gray-600/20';
    case 'Withdrawn':
      return 'bg-gray-50 text-gray-900 ring-gray-600/20';
    default:
      return 'bg-red-50 text-red-700 ring-red-600/20';
  }
};

export function CompaniesSection({ companies }: CompaniesSectionProps) {
  const navigate = useNavigate();

  return (
    <>
      <SectionHeading title="Company List" removeMargin={true} />
      <div className="w-full overflow-hidden mb-12">
        <div>
          {companies.map((company, rowIndex) => (
            <div
              onClick={() => navigate(`${ROUTES.COMPANY}/${company.id}`)}
              key={rowIndex}
              className={`flex py-3 group hover:cursor-pointer transition-all ease-in-out duration-150 border-b border-gray-100`}
            >
              <div className="w-[20%] pr-2 flex items-center justify-start font-bold text-gray-900">
                {company.name}
              </div>
              <div className="w-[24%] px-2 flex items-center justify-start">
                <span
                  className={classNames(
                    'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
                    statusBadge(company.status)
                  )}
                >
                  {company.status}
                </span>
              </div>
              <div className="w-[24%] px-2 flex items-center justify-start text-gray-900">
                {company.registrationState}
              </div>
              <div className="w-[24%] px-2 flex items-center justify-start text-gray-900 justify-end">
                {company.titles.join(', ')}
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
}
