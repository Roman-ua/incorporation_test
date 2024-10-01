import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/navigation/routes';
import { companyTypes } from '../../createCompany/CreateCompany';
import { LuArrowUpRight } from 'react-icons/lu';
import SectionHeading from './SectionHeading';

const mockCompanies = [
  {
    registeredIn: 'State of Florida',
    companyName: '1 My Company',
    companyType: 'Limited Liability Company',
    registrationDate: 'September 10, 2024',
    registrationNumber: '123-433R',
    status: 'Active',
    id: '1',
  },
  {
    registeredIn: 'State of Florida',
    companyName: '2 My Company',
    companyType: 'Corporation',
    registrationDate: 'September 10, 2024',
    registrationNumber: '123-433R',
    status: 'Withdrawn',
    id: '2',
  },
  {
    registeredIn: 'State of Florida',
    companyName: '3 My Company',
    companyType: 'Limited Liability Company',
    registrationDate: 'September 10, 2024',
    registrationNumber: '123-433R',
    status: 'Active',
    id: '3',
  },
  {
    registeredIn: 'State of Florida',
    companyName: '4 My Company',
    companyType: 'Corporation',
    registrationDate: 'September 10, 2024',
    registrationNumber: '123-433R',
    status: 'Inactive',
    id: '4',
  },
  {
    registeredIn: 'State of Florida',
    companyName: '5 My Company',
    companyType: 'Non-profit',
    registrationDate: 'September 10, 2024',
    registrationNumber: '123-433R',
    status: 'Active',
    id: '5',
  },
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

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const CompaniesList = () => {
  const navigate = useNavigate();

  const localData = localStorage.getItem('finalFormData');
  useEffect(() => {
    if (localData) {
      const data = JSON.parse(localData);
      data.id = 0;

      mockCompanies.unshift(data);
    }
  }, [localData]);

  return (
    <>
      <SectionHeading title="Companies" />
      <div className="w-full overflow-auto">
        <table className="w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="whitespace-nowrap	 py-3 pl-3 pr-3 text-left text-sm font-medium tracking-wide text-gray-500"
              >
                Company Name
              </th>
              <th
                scope="col"
                className="whitespace-nowrap	 px-3 py-3 text-left text-sm font-medium tracking-wide text-gray-500"
              >
                Status
              </th>
              <th
                scope="col"
                className="whitespace-nowrap	 px-3 py-3 text-left text-sm font-medium tracking-wide text-gray-500"
              >
                Type
              </th>
              <th
                scope="col"
                className="whitespace-nowrap	 px-3 py-3 text-left text-sm font-medium tracking-wide text-gray-500 "
              >
                Registration #
              </th>
              <th
                scope="col"
                className="whitespace-nowrap	 px-3 py-3 text-left text-sm font-medium tracking-wide text-gray-500"
              >
                State
              </th>
              <th scope="col" className="w-8 relative py-3 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {mockCompanies.map((company) => {
              const formatedType = companyTypes.find(
                (companyTypeItem) =>
                  companyTypeItem.fullName === company.companyType
              );
              return (
                <tr
                  key={company.id}
                  onClick={() => navigate(`${ROUTES.COMPANY}`)}
                  className="hover:bg-gray-100 transition-all duration-150 ease-in-out hover:cursor-pointer group"
                >
                  <td className="whitespace-nowrap py-4 pl-3 pr-3 text-base font-semibold text-gray-700">
                    {company.companyName}
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
                  <td className="whitespace-nowrap px-3 py-4 text-base text-gray-700">
                    {company.companyType === 'Limited Liability Company'
                      ? formatedType?.shortName
                      : company.companyType}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-base text-gray-700">
                    {company.registrationNumber}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-base text-gray-700">
                    {company.registeredIn.split(' ')[2]}
                  </td>
                  <td className="w-8 relative opacity-0 group-hover:opacity-100 whitespace-nowrap py-5 pl-2 pr-5 text-right text-sm font-medium transition-all duration-150 ease-in-out">
                    <div className="p-1 rounded w-fit ml-auto bg-gray-700 text-white hover:bg-gray-900 transition-all duration-150 ease-in-out">
                      <LuArrowUpRight className="h-4 w-4" />
                      <span className="sr-only">, {company.companyName}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CompaniesList;
