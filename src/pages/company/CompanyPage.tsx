import React from 'react';
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
import { LuArrowUpRight } from 'react-icons/lu';
const people = [
  {
    name: 'Lindsay Walton',
    title: 'Accountant',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  {
    name: 'Clark Kent',
    title: 'CTO',
    email: 'clark.kent@example.com',
    role: 'Owner',
  },
  // More people...
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

const CompanyPage = () => {
  const [copied, setCopied] = React.useState('');
  const navigate = useNavigate();
  const localData = localStorage.getItem('finalFormData');
  const data = localData ? JSON.parse(localData) : undefined;

  return data ? (
    <div className="container max-w-7xl mx-auto pl-10 pr-10 pb-8 pt-24">
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
        <div className="flex flex-col gap-y-1 pr-5">
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
        <div className="flex flex-col gap-y-1 border-l px-5">
          <dt className="text-nowrap text-sm text-gray-500">EIN (Tax ID)</dt>
          <dd
            onClick={(event) => {
              event.preventDefault();
              navigate(ROUTES.EIN);
            }}
            className="text-nowrap text-base font-semibold tracking-tight text-gray-700 relative pr-6 group hover:cursor-pointer"
          >
            12-3456789
            <IoMdCheckmark
              className={classNames(
                'text-gray-500 text-sm ml-2 absolute right-1 top-1 transition-all ease-in-out duration-150',
                copied ? 'opacity-100' : 'opacity-0'
              )}
            />
            <MdOutlineCopyAll
              onClick={(event) => {
                event.stopPropagation();
                setCopied('Copied!');

                const timer = setTimeout(() => {
                  clearTimeout(timer);
                  setCopied('');
                }, 700);

                copyToClipboard('12-3456789');
              }}
              className={classNames(
                'text-gray-500 text-sm ml-2 absolute right-1 top-1  transition-all ease-in-out duration-150',
                !copied ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
              )}
            />
            <MdOpenInNew className="text-gray-500 text-sm ml-2 absolute -right-3 top-1 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-150" />
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-5">
          <dt className="text-nowrap text-sm text-gray-500">Registration #</dt>
          <dd className="text-base font-semibold tracking-tight text-gray-700">
            {data?.registrationNumber}
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-5">
          <dt className="text-nowrap text-sm text-gray-500">Type</dt>
          <dd className="text-nowrap text-base font-semibold tracking-tight text-gray-700">
            {
              companyTypes.find((item) => item.fullName === data?.companyType)
                ?.shortName
            }
          </dd>
        </div>
        <div className="flex flex-col gap-y-1 border-l px-5">
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
        <div className="flex flex-col gap-y-1 border-l px-5">
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
      <SectionHeading title="People" />
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y ">
              <tbody className="divide-y divide-gray-200 bg-white">
                {people.map((person) => (
                  <tr
                    key={person.email}
                    className="transition-all ease-in-out duration-150 group"
                  >
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="size-11 shrink-0">
                          <span className="w-10 h-10 text-xl font-bold text-white bg-gray-300 rounded-full flex items-center justify-center">
                            {person.name[0]}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {person.name}
                          </div>
                          <div className="mt-1 text-gray-500">
                            {person.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="text-gray-900">{person.title}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Active
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {person.role}
                    </td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <div className="p-1 rounded w-fit ml-auto bg-gray-700 text-white hover:bg-gray-900 transition-all duration-150 ease-in-out hover:cursor-pointer opacity-0 group-hover:opacity-100">
                        <LuArrowUpRight className="h-4 w-4" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default CompanyPage;
