import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/navigation/routes';

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
    companyType: 'Non-Profit',
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
    // <div className="mt-8 flow-root">
    //   <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    //     <div className="inline-block min-w-full py-2 align-middle">
    //
    //     </div>
    //   </div>
    // </div>
    <table className="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th
            scope="col"
            className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Company Name
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Type
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Reg. Number
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Reg. State
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-20"
          >
            Status
          </th>
          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {mockCompanies.map((company) => (
          <tr
            key={company.id}
            onClick={() => navigate(`${ROUTES.COMPANY}`)}
            className="hover:bg-gray-100 transition-all duration-150 ease-in-out hover:cursor-pointer"
          >
            <td className="whitespace-nowrap py-5 px-2">
              <div className="flex items-center">
                <div>
                  <div className="font-semibold text-gray-700 text-lg">
                    {company.companyName}
                  </div>
                  <div className="mt-1 text-gray-500 text-sm">
                    {company.registrationDate}
                  </div>
                </div>
              </div>
            </td>
            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
              <div className="text-gray-700">{company.companyType}</div>
            </td>
            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
              <div className="text-gray-700 font-semibold">
                {company.registrationNumber}
              </div>
            </td>
            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
              <div className="text-gray-700">{company.registeredIn}</div>
            </td>
            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 w-20">
              <span
                className={classNames(
                  'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-green-600/20',
                  statusBadge(company.status)
                )}
              >
                {company.status}
              </span>
            </td>
            <td className="relative whitespace-nowrap py-5 px-2 text-right text-sm font-medium">
              <div className="text-mainBlue hover:text-sideBarBlue">
                Details
                <span className="sr-only">, {company.companyName}</span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CompaniesList;
