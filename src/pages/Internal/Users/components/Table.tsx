import React, { useState } from 'react';
import { truncateString } from '../../../../utils/helpers';
import { IconBuildings } from '@tabler/icons-react';
import SearchHeader from '../../../../components/shared/TableBlocks/SearchHeader';
import TableHeaderCell from '../../../../components/shared/TableBlocks/TableHeaderCell';
import TableHeaderRow from '../../../../components/shared/TableBlocks/TableHeaderRow';
import TableBodyRow from '../../../../components/shared/TableBlocks/TableBodyRow';
import TableBodyCell from '../../../../components/shared/TableBlocks/TableBodyCell';
import TableStatusItem from '../../../../components/shared/TableBlocks/TableStatusItem';
import TableThreeDotsMenu from '../../../../components/shared/TableBlocks/TableThreeDotsMenu';

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

const dropMenuItems = [
  { title: 'Delete', onClick: () => {} },
  { title: 'Suspend', onClick: () => {} },
  { title: 'Resend password', onClick: () => {} },
];

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
      <>
        {companies.length > 0 && (
          <div key={companies[0].id} className="flex items-end gap-2">
            {companies[0].logo ? (
              <img
                src={companies[0].logo || '/placeholder.svg'}
                alt={companies[0].name}
                className="w-full h-full object-cover"
              />
            ) : (
              <IconBuildings className="w-5 h-5" />
            )}
            <span className="text-sm text-gray-900 font-medium flex items-end leading-4">
              {truncateString(companies[0].name, 20)}
            </span>

            {companies.length > 1 && (
              <div className="text-sm text-gray-500 font-medium flex items-end leading-4">
                +{companies.length - 1}
              </div>
            )}
          </div>
        )}
      </>
    );
  };

  return (
    <>
      {/* Header */}
      <SearchHeader
        filter={filter}
        setFilter={setFilter}
        showColumnsMenu={showColumnsMenu}
        setShowColumnsMenu={setShowColumnsMenu}
        columns={columns}
        visibleColumns={visibleColumns}
        handleColumnVisibility={handleColumnVisibility}
      />
      {/* Table */}
      <div className="w-full text-sm">
        <div>
          <TableHeaderRow>
            {columns
              .filter((col) => visibleColumns.includes(col.key))
              .map((column) => (
                <TableHeaderCell key={column.key} column={column} />
              ))}
            <div className="pl-2 flex items-center justify-end ml-auto"></div>
          </TableHeaderRow>
          {sampleData.map((row) => (
            <TableBodyRow key={row.id}>
              {visibleColumns.includes('name') && (
                <TableBodyCell additionalClasses="font-medium">
                  {row.name}
                </TableBodyCell>
              )}
              {visibleColumns.includes('email') && (
                <TableBodyCell>{row.email}</TableBodyCell>
              )}
              {visibleColumns.includes('status') && (
                <TableBodyCell>
                  <TableStatusItem status={row.status} />
                </TableBodyCell>
              )}
              {visibleColumns.includes('relatedCompanies') && (
                <TableBodyCell>
                  {renderCompanyLogos(row.relatedCompanies)}
                </TableBodyCell>
              )}
              <TableBodyCell additionalClasses="ml-auto pl-2 justify-end">
                <TableThreeDotsMenu
                  setShowActionMenu={setShowActionMenu}
                  showActionMenu={showActionMenu}
                  row={row}
                  dropMenuItems={dropMenuItems}
                />
              </TableBodyCell>
            </TableBodyRow>
          ))}
        </div>
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
