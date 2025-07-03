import React, { useRef, useState } from 'react';
import SectionHeading from './components/SectionHeading';
import { MdOpenInNew, MdOutlineCopyAll } from 'react-icons/md';
import { companyTypes } from '../createCompany/CreateCompany';
import StateSolidIconHandler from '../../components/shared/StateSolidIconHandler';
import { copyToClipboard, formatDateToLongForm } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/navigation/routes';
import { IoMdCheckmark } from 'react-icons/io';

import AnnualReportsListFL from './components/AnnualReportsListFL';
import RelatedPeopleList from './components/RelatedPeopleList';
import AddEinModal from '../EIN/components/modals/AddEinModal';
import { useRecoilState, useRecoilValue } from 'recoil';

import { AddPersonModal } from './modals/AddPersonToCompanyModal';
import AddReportProcess from '../report/components/AddReportProcess';

import PeopleState from '../../state/atoms/People';
import InvoicesList from './components/Invoices';
import LinkToXeroModal from './components/LinkToXeroModal';
import InvoicesState from '../../state/atoms/Invoices';
import WorkspacesState from '../../state/atoms/Workspaces';
import { EinDocumentCreate } from '../../state/types/einTypes';
import useEin from '../../utils/hooks/EIN/useEin';
import GlobalDataState from '../../state/atoms/GlobalData';
import EinState from '../../state/atoms/EIN';
import CompanyLogoUpload from './components/CompanyLogoUpload';

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

const CompanyPage = () => {
  const einState = useRecoilValue(EinState);
  const workspacesState = useRecoilValue(WorkspacesState);

  const [peopleState, setPeopleState] = useRecoilState(PeopleState);
  const [invoicesList, setInvoicesList] = useRecoilState(InvoicesState);
  const [copied, setCopied] = React.useState('');
  const [open, setOpen] = useState(false);
  const [openLinkToXero, setOpenLinkToXero] = useState(false);
  const [openAddPersonModal, setOpenAddPersonModal] = useState(false);
  const [addReportModal, setOpenAddReportModal] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const globalData = useRecoilValue(GlobalDataState);
  const navigate = useNavigate();
  const { createEin } = useEin();
  // const { getSpecificCompany } = useCompany();

  const saveHandler = (einData: EinDocumentCreate) => {
    createEin(einData);
    // getSpecificCompany(workspacesState.current.id);
  };

  const closeEinModalHandler = () => {
    setOpen(false);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return workspacesState.current?.name ? (
    <div className="container max-w-7xl mx-auto pl-10 pr-10 pb-8 pt-4 text-sm">
      {open && (
        <AddEinModal
          isOpen={open}
          isOnlyNumber={true}
          setOpen={closeEinModalHandler}
          companyName={workspacesState.current?.name || ''}
          saveHandler={saveHandler}
        />
      )}
      {openLinkToXero && (
        <LinkToXeroModal
          isOpen={openLinkToXero}
          setOpen={setOpenLinkToXero}
          saveHandler={() => {
            setOpenLinkToXero(false);
            setInvoicesList((prevState) => [
              ...prevState,
              {
                id: `inv_12345`,
                status: 'Not Paid',
                amount: '$100',
                date: new Date().toISOString(),
                relatedTo: 'inv_12343',
              },
            ]);
          }}
        />
      )}
      <AddPersonModal
        companyType={workspacesState.current?.type_name}
        isOpen={openAddPersonModal}
        onClose={() => setOpenAddPersonModal(false)}
        onAdd={(person) =>
          setPeopleState((prevState) => [...prevState, person])
        }
      />
      <CompanyLogoUpload
        fileInputRef={fileInputRef}
        image={image}
        setImage={setImage}
        croppedImage={croppedImage}
        setCroppedImage={setCroppedImage}
        addPictureHandler={() => {}}
        prevImage={workspacesState.current?.logoUrl || null}
      />
      <AddReportProcess
        saveHandler={() => {}}
        setOpen={setOpenAddReportModal}
        open={addReportModal}
      />

      <div
        className={classNames(
          'w-full flex items-center justify-between pb-2 pr-2 border-b',
          croppedImage || image ? 'mt-5' : ''
        )}
      >
        <span className="text-2xl font-bold text-gray-700">
          {workspacesState.current?.name}
        </span>
        {/* <span className="p-1 rounded flex items-center text-gray-600 text-sm hover:cursor-pointer hover:bg-gray-100 transition-all duration-150 ease-in-out">
          c_{workspacesState.current?.id}
          <MdOutlineCopyAll className="text-base ml-2" />
        </span> */}
        {!croppedImage && (
          <button
            onClick={triggerFileUpload}
            className="rounded-md bg-mainBackground px-2.5 py-1.5 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-all ease-in-out duration-150"
          >
            Upload Logo
          </button>
        )}
      </div>
      <dl className="w-full mt-4 mb-12 flex items-start justify-start overflow-x-scroll">
        <div className="flex flex-col gap-y-1 pr-6">
          <dt className="text-sm text-gray-500">Status</dt>
          <span
            className={classNames(
              'w-fit inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset',
              statusBadge(workspacesState.current?.status?.name)
            )}
          >
            {workspacesState.current?.status?.name}
          </span>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-6">
          <dt className="text-nowrap text-sm text-gray-500">EIN (Tax ID)</dt>
          <dd
            onClick={(event) => {
              if (!einState) {
                setOpen(true);
              } else {
                event.preventDefault();
                navigate(
                  `${ROUTES.EIN}/c_${workspacesState.current?.id}/ein_${einState.company.ein}`
                );
              }
            }}
            className={classNames(
              'text-nowrap text-base    text-gray-700 relative pr-6 group hover:cursor-pointer',
              workspacesState.current?.ein
                ? 'font-semibold'
                : 'hover:text-mainBlue'
            )}
          >
            {einState?.ein_number || 'Add EIN (Tax ID)'}
            {einState?.ein_number && (
              <>
                <IoMdCheckmark
                  className={classNames(
                    'text-gray-500 text-sm ml-2 absolute right-1 top-1 transition-all ease-in-out duration-150',
                    copied === einState?.ein_number
                      ? 'opacity-100'
                      : 'opacity-0'
                  )}
                />
                <MdOutlineCopyAll
                  onClick={(event) => {
                    event.stopPropagation();
                    setCopied(einState?.ein_number);

                    const timer = setTimeout(() => {
                      clearTimeout(timer);
                      setCopied('');
                    }, 700);

                    copyToClipboard(einState?.ein_number);
                  }}
                  className={classNames(
                    'text-gray-500 text-sm ml-2 absolute right-1 top-1  transition-all ease-in-out duration-150',
                    copied !== einState?.ein_number
                      ? 'opacity-0 group-hover:opacity-100'
                      : 'opacity-0'
                  )}
                />
                <MdOpenInNew className="text-gray-500 text-sm ml-2 absolute -right-3 top-1 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-150" />
              </>
            )}
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-6">
          <dt className="text-nowrap text-sm text-gray-500">Registration #</dt>
          <dd className="text-base font-semibold   text-gray-700 relative group pr-6 hover:cursor-pointer">
            {workspacesState.current?.registration_number}

            <IoMdCheckmark
              className={classNames(
                'text-gray-500 text-sm ml-2 absolute right-1 top-1 transition-all ease-in-out duration-150',
                copied === workspacesState.current?.registration_number
                  ? 'opacity-100'
                  : 'opacity-0'
              )}
            />
            <MdOutlineCopyAll
              onClick={(event) => {
                event.stopPropagation();
                setCopied(workspacesState.current?.registration_number);

                const timer = setTimeout(() => {
                  clearTimeout(timer);
                  setCopied('');
                }, 700);

                copyToClipboard(workspacesState.current?.registration_number);
              }}
              className={classNames(
                'text-gray-500 text-sm ml-2 absolute right-1 top-1  transition-all ease-in-out duration-150',
                copied !== workspacesState.current?.registration_number
                  ? 'opacity-0 group-hover:opacity-100'
                  : 'opacity-0'
              )}
            />
            <MdOpenInNew className="text-gray-500 text-sm ml-2 absolute -right-3 top-1 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-150" />
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-6">
          <dt className="text-nowrap text-sm text-gray-500">Type</dt>
          <dd className="text-nowrap text-base font-semibold   text-gray-700">
            {
              companyTypes.find(
                (item) => item.shortName === workspacesState.current?.type?.name
              )?.fullName
            }
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-6">
          <dt className="text-nowrap text-sm text-gray-500">State</dt>
          <dd className="text-nowrap text-base flex items-center font-semibold   text-gray-700">
            <StateSolidIconHandler
              simpleIcon={true}
              selectedState={workspacesState.current?.state_name || 'Florida'}
              state={workspacesState.current?.state_name || 'Florida'}
            />
            {workspacesState.current?.state_name || 'Florida'}
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-6">
          <dt className="text-nowrap text-sm text-gray-500">
            Registration Date
          </dt>
          <dd className="text-nowrap text-base font-semibold   text-gray-700">
            {formatDateToLongForm(workspacesState.current?.registration_date)}
          </dd>
        </div>
        {peopleState.length ? (
          <div className="flex flex-col gap-y-1 ml-auto">
            <dt className="text-nowrap text-sm text-gray-500">People</dt>
            <div className="isolate flex -space-x-2 overflow-hidden">
              <div className="flex text-xs items-center justify-center font-bold relative z-40 inline-block size-6 rounded-full ring-2 ring-white bg-gray-400 text-white">
                U
              </div>
              <img
                alt=""
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="relative z-30 inline-block size-6 rounded-full ring-2 ring-white"
              />
              <img
                alt=""
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="relative z-20 inline-block size-6 rounded-full ring-2 ring-white"
              />
              <div className="flex text-xs items-center justify-center font-bold relative z-10 inline-block size-6 rounded-full ring-2 ring-white bg-gray-400 text-white">
                K
              </div>
              <img
                alt=""
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="relative z-0 inline-block size-6 rounded-full ring-2 ring-white"
              />
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </dl>
      <SectionHeading title="Address" />
      <div className="mt-2 w-1/2 gap-4 mb-11 text-gray-700">
        <>
          <div className="text-sm text-gray-500 mb-1">Main</div>
          <div>
            <span>{workspacesState.current?.line1}, </span>
            {workspacesState.current?.line2 && (
              <span>{workspacesState.current?.line2}</span>
            )}
          </div>
          <div>
            {workspacesState.current?.line3 && (
              <span>{workspacesState.current?.line3}</span>
            )}
            {workspacesState.current?.line3 && (
              <span>
                {workspacesState.current?.line2 ? ',' : ''}{' '}
                {workspacesState.current?.line3}
              </span>
            )}
          </div>
          <div>
            <span>{workspacesState.current?.city}, </span>
            <span>
              {globalData.states.find(
                (item) => item.name === workspacesState.current?.state.name
              )?.abbreviation || ''}{' '}
            </span>
            <span>{workspacesState.current?.zip}</span>
          </div>
          <div>{workspacesState.current?.country.full_name}</div>
        </>
      </div>
      <RelatedPeopleList
        peopleState={peopleState}
        addPersonHandler={() => setOpenAddPersonModal(true)}
      />
      {workspacesState.current?.state?.name === 'Florida' && (
        <AnnualReportsListFL
          addReportModal={() => navigate(ROUTES.ANN_REPORT_ADD)}
        />
      )}
      <InvoicesList
        data={invoicesList}
        linkToHandler={() => setOpenLinkToXero(true)}
        refreshHandler={() => undefined}
      />
    </div>
  ) : (
    <></>
  );
};

export default CompanyPage;
