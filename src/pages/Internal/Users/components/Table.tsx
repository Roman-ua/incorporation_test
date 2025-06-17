import React, { useState } from 'react';
import logo1 from '../../../../images/mocklogos/AlphaWave.jpg';
import logo2 from '../../../../images/mocklogos/Calescence.jpg';
import logo3 from '../../../../images/mocklogos/Clandestine.jpg';
import { classNames } from '../../../../utils/helpers';
import { inputSimpleFocus } from '../../../../constants/form/form';
interface Company {
  id: string;
  name: string;
  logo: string;
}

interface TableRow {
  id: string;
  email: string;
  name: string;
  status: 'Active' | 'Inactive' | 'Pending';
  relatedCompanies: Company[];
}

const sampleData: TableRow[] = [
  {
    id: '1',
    email: 'ken99@example.com',
    name: 'Ken Thompson',
    status: 'Active',
    relatedCompanies: [
      { id: '1', name: 'Google', logo: logo1 },
      {
        id: '2',
        name: 'Microsoft',
        logo: logo2,
      },
      { id: '3', name: 'Apple', logo: logo3 },
    ],
  },
  {
    id: '2',
    email: 'carmella@example.com',
    name: 'Carmella Rodriguez',
    status: 'Inactive',
    relatedCompanies: [
      { id: '4', name: 'Meta', logo: logo3 },
      { id: '5', name: 'Netflix', logo: logo2 },
    ],
  },
  {
    id: '3',
    email: 'silas22@example.com',
    name: 'Silas Chen',
    status: 'Active',
    relatedCompanies: [
      { id: '6', name: 'Tesla', logo: logo1 },
      { id: '7', name: 'SpaceX', logo: logo2 },
      { id: '8', name: 'Amazon', logo: logo3 },
      { id: '9', name: 'Stripe', logo: logo1 },
    ],
  },
  {
    id: '4',
    email: 'monserrat44@example.com',
    name: 'Monserrat Williams',
    status: 'Pending',
    relatedCompanies: [
      {
        id: '10',
        name: 'Shopify',
        logo: logo1,
      },
    ],
  },
  {
    id: '5',
    email: 'abe45@example.com',
    name: 'Abraham Foster',
    status: 'Active',
    relatedCompanies: [
      { id: '11', name: 'Uber', logo: logo3 },
      { id: '12', name: 'Airbnb', logo: logo2 },
    ],
  },
];

const searchColumns = [
  { key: 'email', label: 'Email' },
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status' },
];

const statusBadge = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-50 text-green-700 ring-green-600/20';
    case 'Pending':
      return 'bg-orange-50 text-orange-700 ring-orange-600/20';
    case 'Inactive':
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    default:
      return 'bg-red-50 text-red-700 ring-red-600/20';
  }
};

export default function DataTable() {
  const [filter, setFilter] = useState('');

  const [showColumnsMenu, setShowColumnsMenu] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [searchColumn, setSearchColumn] = useState('email');

  const filteredData = sampleData.filter((row) => {
    const searchValue = filter.toLowerCase();
    switch (searchColumn) {
      case 'email':
        return row.email.toLowerCase().includes(searchValue);
      case 'name':
        return row.name.toLowerCase().includes(searchValue);
      case 'status':
        return row.status.toLowerCase().includes(searchValue);
      default:
        return true;
    }
  });

  const renderCompanyLogos = (companies: Company[]) => {
    const maxVisible = 3;
    const visibleCompanies = companies.slice(0, maxVisible);
    const remainingCount = companies.length - maxVisible;

    return (
      <div className="flex items-center">
        <div className="flex -space-x-2">
          {visibleCompanies.map((company, index) => (
            <div
              key={company.id}
              className="w-8 h-8 bg-gray-200 border-2 border-white rounded-md overflow-hidden"
              style={{ zIndex: visibleCompanies.length - index }}
              title={company.name}
            >
              <img
                src={company.logo || '/placeholder.svg'}
                alt={company.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        {remainingCount > 0 && (
          <div className="ml-2 text-sm text-gray-500 font-medium">
            +{remainingCount}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder={`Filter by ${searchColumns.find((col) => col.key === searchColumn)?.label.toLowerCase()}...`}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={classNames(
              'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none ring-offset-0',
              inputSimpleFocus
            )}
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setShowColumnsMenu(!showColumnsMenu)}
            className="px-3 py-3 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none flex items-center gap-1 text-xs font-medium"
          >
            {searchColumns.find((col) => col.key === searchColumn)?.label}
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {showColumnsMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <div className="p-2">
                {searchColumns.map((column) => (
                  <button
                    key={column.key}
                    onClick={() => {
                      setSearchColumn(column.key);
                      setShowColumnsMenu(false);
                    }}
                    className={`w-full text-left p-2 hover:bg-gray-50 rounded cursor-pointer text-xs ${
                      searchColumn === column.key
                        ? 'bg-gray-50 text-gray-900'
                        : ''
                    }`}
                  >
                    {column.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left text-xs p-3 font-medium text-gray-900">
                <div className="flex items-center gap-1">
                  Email
                  <svg
                    className="w-4 h-4 hover:cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    />
                  </svg>
                </div>
              </th>
              <th className="text-left text-xs p-3 font-medium text-gray-900">
                <div className="flex items-center gap-1">
                  Name
                  <svg
                    className="w-4 h-4 hover:cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    />
                  </svg>
                </div>
              </th>
              <th className="text-left text-xs p-3 font-medium text-gray-900">
                Status
              </th>
              <th className="text-left text-xs p-3 font-medium text-gray-900">
                Related companies
              </th>
              <th className="w-12 p-4"></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id} className="border-b border-gray-100">
                <td className="p-3 text-gray-900">{row.email}</td>
                <td className="p-3 text-gray-900 font-medium">{row.name}</td>
                <td className="p-3">
                  <span
                    className={classNames(
                      'w-fit inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset',
                      statusBadge(row.status)
                    )}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="p-3">
                  {renderCompanyLogos(row.relatedCompanies)}
                </td>
                <td className="p-3">
                  <div className="relative">
                    <button
                      onClick={() =>
                        setShowActionMenu(
                          showActionMenu === row.id ? null : row.id
                        )
                      }
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </button>

                    {showActionMenu === row.id && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <div className="py-1">
                          <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-400 cursor-not-allowed">
                            Delete
                          </button>
                          <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-400 cursor-not-allowed">
                            Suspend
                          </button>
                          <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-400 cursor-not-allowed">
                            Resend password
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Click outside to close menus */}
      {(showColumnsMenu || showActionMenu) && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => {
            setShowColumnsMenu(false);
            setShowActionMenu(null);
          }}
        />
      )}
    </>
  );
}
