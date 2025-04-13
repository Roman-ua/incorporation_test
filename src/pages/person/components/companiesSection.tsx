import React from 'react';
// import SectionHeading from '../../company/components/SectionHeading';
import { classNames } from '../../../utils/helpers';
import { ROUTES } from '../../../constants/navigation/routes';
import { useNavigate } from 'react-router-dom';
import SectionHeading from '../../company/components/SectionHeading';
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
    <div>
      <div className="flex flex-row items-center justify-between">
        <SectionHeading title="Company List" removeMargin={true} />
      </div>
      <div className="w-full overflow-auto text-sm">
        <table className="w-full divide-y divide-gray-300">
          <tbody className="divide-y divide-gray-200 bg-white">
            {companies.map((company) => {
              return (
                <tr
                  key={company.id}
                  onClick={() => navigate(`${ROUTES.COMPANY}`)}
                  className="hover:bg-gray-100 transition-all duration-150 ease-in-out hover:cursor-pointer group"
                >
                  <td className="whitespace-nowrap py-4 pl-3 pr-3 text-sm font-semibold text-gray-700">
                    {company.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span
                      className={classNames(
                        'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
                        statusBadge(company.status)
                      )}
                    >
                      {company.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                    {company.registrationState}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                    {company.titles.join(', ')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
