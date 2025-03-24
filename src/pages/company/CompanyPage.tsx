import React, { useState } from 'react';
import SectionHeading from './components/SectionHeading';
import { MdOpenInNew, MdOutlineCopyAll } from 'react-icons/md';
import { USStates } from '../../constants/form/form';
import { companyTypes } from '../createCompany/CreateCompany';
import StateSolidIconHandler from '../../components/shared/StateSolidIconHandler';
import { copyToClipboard } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/navigation/routes';
import { IoMdCheckmark } from 'react-icons/io';
import PageSign from '../../components/shared/PageSign';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import AnnualReportsListFL from './components/AnnualReportsListFL';
import RelatedPeopleList from './components/RelatedPeopleList';
import AddEinModal from '../EIN/components/modals/AddEinModal';
import {
  MockCompany,
  MockData,
  UpdatedCompanyState,
} from '../../interfaces/interfaces';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import EinState from '../../state/atoms/EIN';
import { AddPersonModal } from './modals/AddPersonToCompanyModal';
import AddReportProcess from '../report/components/AddReportProcess';
import CompanyState from '../../state/atoms/Company';
// import { format } from 'date-fns';

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

// const people = [
//   {
//     id: '1',
//     picture: '',
//     fullName: 'Lindsay Walton',
//     titles: ['Accountant'],
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//     status: 'Active',
//     type: 'US',
//     sendInvitation: true,
//     dateAdded: format(new Date(), 'yyyy-MM-dd'),
//     address: {},
//   },
//   {
//     id: '2',
//     picture: '',
//     fullName: 'Clark Kent',
//     titles: ['Manager', 'Director', 'Secretary', 'CTO'],
//     email: 'clark.kent@example.com',
//     role: 'Owner',
//     type: 'Other',
//     status: 'Inactive',
//     sendInvitation: true,
//     dateAdded: format(new Date(), 'yyyy-MM-dd'),
//     address: {},
//   },
//   // More people...
// ];

const CompanyPage = () => {
  const setEinState = useSetRecoilState(EinState);
  const companyData = useRecoilValue(CompanyState);

  const [copied, setCopied] = React.useState('');
  const [open, setOpen] = useState(false);
  const [openAddPersonModal, setOpenAddPersonModal] = useState(false);
  const [addReportModal, setOpenAddReportModal] = useState(false);
  const [data, setData] = React.useState<MockCompany>(companyData);
  const [peopleState, setPeopleState] = React.useState([]);

  const navigate = useNavigate();

  const saveHandler = (updatedState: UpdatedCompanyState) => {
    setData((prevData) => {
      const newData = { ...prevData };

      Object.keys(updatedState).forEach((key) => {
        const typedKey = key as keyof MockData;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        newData[typedKey] = updatedState[typedKey];
      });

      return newData;
    });

    setEinState((prev) => ({
      ...prev,
      taxId: updatedState.taxId || '',
    }));
  };

  return data ? (
    <div className="container max-w-7xl mx-auto pl-10 pr-10 pb-8 pt-24 text-sm">
      <AddEinModal
        isOnlyNumber={true}
        setOpen={setOpen}
        open={open}
        companyName={data.companyName || ''}
        saveHandler={saveHandler}
      />
      <AddPersonModal
        companyType={data.companyType}
        isOpen={openAddPersonModal}
        onClose={() => setOpenAddPersonModal(false)}
        onAdd={(
          //eslint-disable-next-line @typescript-eslint/ban-ts-comment
          person //@ts-expect-error
        ) => setPeopleState((prevState) => [...prevState, person])}
      />
      <AddReportProcess
        saveHandler={() => {}}
        setOpen={setOpenAddReportModal}
        open={addReportModal}
      />
      <PageSign
        title={'COMPANY'}
        icon={
          <HiOutlineOfficeBuilding className="w-3 h-3 text-gray-400 mr-1" />
        }
      />
      <div className="w-full flex items-center justify-between pb-2 pr-2 border-b">
        <span className="text-2xl font-bold text-gray-700">
          {data.companyName}
        </span>
        <span className="p-1 rounded flex items-center text-gray-600 text-sm hover:cursor-pointer hover:bg-gray-100 transition-all duration-150 ease-in-out">
          c_1v2FG
          <MdOutlineCopyAll className="text-base ml-2" />
        </span>
      </div>
      <dl className="w-full mt-4 mb-12 flex items-start justify-start overflow-x-scroll">
        <div className="flex flex-col gap-y-1 pr-6">
          <dt className="text-sm text-gray-500">Status</dt>
          <span
            className={classNames(
              'w-fit inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset',
              statusBadge(data?.status)
            )}
          >
            {data?.status}
          </span>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-6">
          <dt className="text-nowrap text-sm text-gray-500">EIN (Tax ID)</dt>
          <dd
            onClick={(event) => {
              if (!data?.taxId) {
                setOpen(true);
              } else {
                event.preventDefault();
                navigate(ROUTES.EIN);
              }
            }}
            className={classNames(
              'text-nowrap text-base  tracking-tight text-gray-700 relative pr-6 group hover:cursor-pointer',
              data?.taxId ? 'font-semibold' : 'hover:text-mainBlue'
            )}
          >
            {data?.taxId || 'Add EIN (Tax ID)'}
            {data?.taxId && (
              <>
                <IoMdCheckmark
                  className={classNames(
                    'text-gray-500 text-sm ml-2 absolute right-1 top-1 transition-all ease-in-out duration-150',
                    copied === data?.taxId ? 'opacity-100' : 'opacity-0'
                  )}
                />
                <MdOutlineCopyAll
                  onClick={(event) => {
                    event.stopPropagation();
                    setCopied(data?.taxId);

                    const timer = setTimeout(() => {
                      clearTimeout(timer);
                      setCopied('');
                    }, 700);

                    copyToClipboard(data?.taxId);
                  }}
                  className={classNames(
                    'text-gray-500 text-sm ml-2 absolute right-1 top-1  transition-all ease-in-out duration-150',
                    copied !== data?.taxId
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
          <dd className="text-base font-semibold tracking-tight text-gray-700 relative group pr-6 hover:cursor-pointer">
            {data?.registrationNumber}

            <IoMdCheckmark
              className={classNames(
                'text-gray-500 text-sm ml-2 absolute right-1 top-1 transition-all ease-in-out duration-150',
                copied === data?.registrationNumber
                  ? 'opacity-100'
                  : 'opacity-0'
              )}
            />
            <MdOutlineCopyAll
              onClick={(event) => {
                event.stopPropagation();
                setCopied(data?.registrationNumber);

                const timer = setTimeout(() => {
                  clearTimeout(timer);
                  setCopied('');
                }, 700);

                copyToClipboard(data?.registrationNumber);
              }}
              className={classNames(
                'text-gray-500 text-sm ml-2 absolute right-1 top-1  transition-all ease-in-out duration-150',
                copied !== data?.registrationNumber
                  ? 'opacity-0 group-hover:opacity-100'
                  : 'opacity-0'
              )}
            />
            <MdOpenInNew className="text-gray-500 text-sm ml-2 absolute -right-3 top-1 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-150" />
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-6">
          <dt className="text-nowrap text-sm text-gray-500">Type</dt>
          <dd className="text-nowrap text-base font-semibold tracking-tight text-gray-700">
            {
              companyTypes.find((item) => item.fullName === data?.companyType)
                ?.shortName
            }
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-6">
          <dt className="text-nowrap text-sm text-gray-500">State</dt>
          <dd className="text-nowrap text-base flex items-center font-semibold tracking-tight text-gray-700">
            <StateSolidIconHandler
              simpleIcon={true}
              selectedState={data?.registeredIn.split(' ')[2] || 'Florida'}
              state={data?.registeredIn.split(' ')[2] || 'Florida'}
            />
            {data?.registeredIn.split(' ')[2] || 'Florida'}
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-6">
          <dt className="text-nowrap text-sm text-gray-500">
            Registration Date
          </dt>
          <dd className="text-nowrap text-base font-semibold tracking-tight text-gray-700">
            {data?.registrationDate}
          </dd>
        </div>
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
      </dl>
      <SectionHeading title="Address" />
      <div className="mt-2 w-1/2 gap-4 mb-11 text-gray-700">
        <>
          <div className="text-sm text-gray-500 mb-1">Main</div>
          <div>
            <span>{data.address.address0}, </span>
            {data.address.address1 && <span>{data.address.address1}</span>}
          </div>
          <div>
            {data.address.address2 && <span>{data.address.address2}</span>}
            {data.address.address3 && (
              <span>
                {data.address.address2 ? ',' : ''} {data.address.address3}
              </span>
            )}
          </div>
          <div>
            <span>{data.address.city}, </span>
            <span>
              {USStates.find((item) => item.title === data.address.state)
                ?.value || ''}{' '}
            </span>
            <span>{data.address.zip}</span>
          </div>
          <div>{data.address.country}</div>
        </>
      </div>
      <RelatedPeopleList
        peopleState={peopleState}
        addPersonHandler={() => setOpenAddPersonModal(true)}
      />
      {data?.registeredIn.split(' ')[2] === 'Florida' && (
        <AnnualReportsListFL
          addReportModal={() => navigate(ROUTES.ANN_REPORT_ADD)}
        />
      )}
    </div>
  ) : (
    <></>
  );
};

export default CompanyPage;
