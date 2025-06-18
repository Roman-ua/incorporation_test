import React, { useState } from 'react';
import { classNames, truncateString } from '../../../../utils/helpers';
import { inputSimpleFocus } from '../../../../constants/form/form';
import { IconBuildings } from '@tabler/icons-react';
import { ArrowDownUp, Check } from 'lucide-react';
import { BsThreeDots } from 'react-icons/bs';

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
      { id: '1', name: 'Google', logo: '' },
      {
        id: '2',
        name: 'Microsoft',
        logo: '',
      },
      { id: '3', name: 'Apple', logo: '' },
    ],
  },
  {
    id: '2',
    email: 'carmella@example.com',
    name: 'Carmella Rodriguez',
    status: 'Inactive',
    relatedCompanies: [
      { id: '4', name: 'Meta', logo: '' },
      { id: '5', name: 'Netflix', logo: '' },
    ],
  },
  {
    id: '3',
    email: 'silas22@example.com',
    name: 'Silas Chen',
    status: 'Active',
    relatedCompanies: [
      { id: '6', name: 'Tesla', logo: '' },
      { id: '7', name: 'SpaceX', logo: '' },
      { id: '8', name: 'Amazon', logo: '' },
      { id: '9', name: 'Stripe', logo: '' },
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
        name: 'Real Constanta LLC',
        logo: '',
      },
    ],
  },
  {
    id: '5',
    email: 'abe45@example.com',
    name: 'Abraham Foster',
    status: 'Active',
    relatedCompanies: [{ id: '11', name: 'DMCA Now LLC', logo: '' }],
  },
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

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'status', label: 'Status', sortable: false },
  { key: 'relatedCompanies', label: 'Related companies', sortable: false },
];

export default function DataTable() {
  const [filter, setFilter] = useState('');

  const [showColumnsMenu, setShowColumnsMenu] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map((col) => col.key)
  );

  const handleColumnVisibility = (columnKey: string) => {
    setVisibleColumns((prev) =>
      prev.includes(columnKey)
        ? prev.filter((key) => key !== columnKey)
        : [...prev, columnKey]
    );
  };

  const renderCompanyLogos = (companies: Company[]) => {
    return (
      <div className="flex items-center">
        {companies.length > 0 && (
          <div key={companies[0].id} className="flex items-center gap-2">
            {companies[0].logo ? (
              <img
                src={companies[0].logo || '/placeholder.svg'}
                alt={companies[0].name}
                className="w-full h-full object-cover"
              />
            ) : (
              <IconBuildings className="w-5 h-5" />
            )}
            <span className="text-sm text-gray-900 font-medium">
              {truncateString(companies[0].name, 20)}
            </span>

            {companies.length > 1 && (
              <div className="text-sm text-gray-500 font-medium">
                +{companies.length - 1}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-10 mb-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder={`Filter by email...`}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={classNames(
              'w-1/2 px-3 py-1 border flex h-9 min-w-0 border-gray-300 rounded-md focus:outline-none ring-offset-0 text-sm placeholder:text-gray-400',
              inputSimpleFocus
            )}
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setShowColumnsMenu(!showColumnsMenu)}
            className="px-4 py-2 h-9 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none flex items-center gap-2 text-sm font-medium"
          >
            Columns
            <svg
              className={classNames(
                'w-4 h-4 transition-transform duration-200',
                showColumnsMenu ? 'rotate-180' : ''
              )}
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
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-md z-10">
              <div className="p-1">
                {columns.map((col) => (
                  <label
                    key={col.key}
                    onClick={() => handleColumnVisibility(col.key)}
                    className="relative flex items-center gap-2 py-1.5 pr-2 pl-8 hover:bg-gray-50 text-sm cursor-pointer rounded-md"
                  >
                    {visibleColumns.includes(col.key) && (
                      <Check className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4" />
                    )}
                    {col.label}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-md">
        <table className="w-full">
          <thead className="border-b border-gray-200 rounded-t-md">
            <tr className="rounded-t-md">
              {columns
                .filter((col) => visibleColumns.includes(col.key))
                .map((column) => (
                  <th
                    key={column.key}
                    className="text-left text-sm h-10 px-2 align-middle whitespace-nowrap font-medium text-gray-900"
                  >
                    <div className="flex items-center gap-2">
                      {column.label}
                      {column.sortable && (
                        <ArrowDownUp className="w-4 h-4 hover:cursor-pointer" />
                      )}
                    </div>
                  </th>
                ))}
              <th className="w-12 h-9 px-4 py-2 rounded-t-md"></th>
            </tr>
          </thead>
          <tbody className="rounded-b-md">
            {sampleData.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-all duration-200"
              >
                {visibleColumns.includes('name') && (
                  <td className="px-2 py-2 text-gray-900 font-medium">
                    {row.name}
                  </td>
                )}
                {visibleColumns.includes('email') && (
                  <td className="px-2 py-2 text-gray-900">{row.email}</td>
                )}
                {visibleColumns.includes('status') && (
                  <td className="px-2 py-2">
                    <span
                      className={classNames(
                        'w-fit inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
                        statusBadge(row.status)
                      )}
                    >
                      {row.status}
                    </span>
                  </td>
                )}
                {visibleColumns.includes('relatedCompanies') && (
                  <td className="px-2 py-2">
                    {renderCompanyLogos(row.relatedCompanies)}
                  </td>
                )}
                <td className="pl-2 pr-4 py-2">
                  <div className="relative">
                    <button
                      onClick={() =>
                        setShowActionMenu(
                          showActionMenu === row.id ? null : row.id
                        )
                      }
                      className="p-1 hover:bg-gray-100 rounded-md w-8 h-8 flex items-center justify-center transition-all duration-200"
                    >
                      <BsThreeDots className="w-4 h-4" />
                    </button>

                    {showActionMenu === row.id && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-md z-10">
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
