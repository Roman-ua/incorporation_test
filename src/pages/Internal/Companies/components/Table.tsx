import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import WorkspacesState from '../../../../state/atoms/Workspaces';
import SearchHeader from '../../../../components/shared/TableBlocks/SearchHeader';
import TableHeaderCell from '../../../../components/shared/TableBlocks/TableHeaderCell';
import TableHeaderRow from '../../../../components/shared/TableBlocks/TableHeaderRow';
import TableBodyRow from '../../../../components/shared/TableBlocks/TableBodyRow';
import TableBodyCell from '../../../../components/shared/TableBlocks/TableBodyCell';
import StateSolidIconHandler from '../../../../components/shared/StateSolidIconHandler';
import TableStatusItem from './StatusCell';
import { ArrowUpRight } from 'lucide-react';
import { IconBuildings } from '@tabler/icons-react';
import { ICompanyData } from '../../../../state/types/company';
import { useNavigate } from 'react-router-dom';
import EinState from '../../../../state/atoms/EIN';
import useEin from '../../../../utils/hooks/EIN/useEin';
import { ROUTES } from '../../../../constants/navigation/routes';
import { Preloader } from '../../../workspaces/components/Preloader';

const columns = [
  {
    key: 'companyName',
    label: 'Company Name',
    sortable: true,
    columnClass: 'w-[27%]',
  },
  { key: 'type', label: 'Type', sortable: false, columnClass: 'w-[15%]' },
  { key: 'state', label: 'State', sortable: false, columnClass: 'w-[20%]' },
  { key: 'status', label: 'Status', sortable: false, columnClass: 'w-[25%]' },
];
const DataTable = () => {
  const navigate = useNavigate();
  const { getEin } = useEin();

  const setEin = useSetRecoilState(EinState);
  const [filter, setFilter] = useState('');
  const [showColumnsMenu, setShowColumnsMenu] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map((col) => col.key)
  );
  const [companiesData, setCompaniesData] = useRecoilState(WorkspacesState);
  const [selectedWorkspace, setSelectedWorkspace] =
    useState<ICompanyData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleColumnVisibility = (columnKey: string) => {
    setVisibleColumns((prev) =>
      prev.includes(columnKey)
        ? prev.filter((key) => key !== columnKey)
        : [...prev, columnKey]
    );
  };

  const selectWorkspaceHandler = (workspace: ICompanyData) => {
    setSelectedWorkspace(workspace);
    setIsLoading(true);

    if (workspace?.ein) {
      getEin(workspace.ein);
    } else {
      setEin(null);
    }

    localStorage.setItem('selected_company', `${workspace?.id}`);
  };

  const handleLoadingComplete = () => {
    if (selectedWorkspace) {
      setCompaniesData((prev) => ({
        ...prev,
        current: selectedWorkspace,
      }));
    }
    setIsLoading(false);
    navigate(`${ROUTES.COMPANY}/${selectedWorkspace?.id}`);
  };

  return (
    <>
      <Preloader
        isLoading={isLoading}
        onLoadingComplete={handleLoadingComplete}
        text={
          selectedWorkspace
            ? `Loading ${selectedWorkspace.name}`
            : 'Loading workspace'
        }
        logo={
          selectedWorkspace?.logoUrl ? (
            <img
              src={selectedWorkspace?.logoUrl}
              alt={`${selectedWorkspace?.name} logo`}
              className="w-16 h-16 object-cover rounded-xl"
            />
          ) : (
            <div className="mr-2 flex-shrink-0 w-16 h-16 p-1 rounded-lg overflow-hidden flex items-center border border-gray-200 justify-center">
              <IconBuildings />
            </div>
          )
        }
      />
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
                <TableHeaderCell
                  key={column.key}
                  column={column}
                  additionalClasses={column.columnClass}
                />
              ))}
            <div className="pl-2 flex items-center justify-end ml-auto w-[20%]"></div>
          </TableHeaderRow>
          {companiesData.list.map((company) => (
            <TableBodyRow
              key={company.id}
              onClick={() => selectWorkspaceHandler(company)}
            >
              {visibleColumns.includes('companyName') && (
                <TableBodyCell additionalClasses="w-[27%]">
                  {company?.logoUrl ? (
                    <img
                      src={company?.logoUrl}
                      alt={`${company?.name} logo`}
                      className="mr-2 w-7 h-7 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="mr-2 flex-shrink-0 w-7 h-7 p-1 rounded-lg overflow-hidden flex items-center border border-gray-200 justify-center">
                      <IconBuildings />
                    </div>
                  )}
                  {company.name}
                </TableBodyCell>
              )}
              {visibleColumns.includes('type') && (
                <TableBodyCell additionalClasses="w-[15%]">
                  {company.type?.name}
                </TableBodyCell>
              )}
              {visibleColumns.includes('state') && (
                <TableBodyCell additionalClasses="w-[20%]">
                  <StateSolidIconHandler
                    simpleIcon={true}
                    selectedState={company?.state?.name || 'Florida'}
                    state={company?.state?.name || 'Florida'}
                  />
                  {company?.state?.name}
                </TableBodyCell>
              )}
              {visibleColumns.includes('status') && (
                <TableBodyCell additionalClasses="w-[25%]">
                  <TableStatusItem status={company.status?.name || ''} />
                </TableBodyCell>
              )}
              <TableBodyCell additionalClasses="ml-auto pl-2 justify-end w-[10%]">
                <div className="flex items-center gap-1 mr-1 px-2.5 py-1 border rounded-md  text-sm text-gray-900 transition-all ease-in-out duration-150 hover:cursor-pointer">
                  Open <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                </div>
              </TableBodyCell>
            </TableBodyRow>
          ))}
        </div>
      </div>
    </>
  );
};

export default DataTable;
