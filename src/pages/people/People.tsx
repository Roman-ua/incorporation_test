import React from 'react';

import { ROUTES } from '../../constants/navigation/routes';
import { useNavigate } from 'react-router-dom';
import SearchHeading from './components/SearchHeader';
import { classNames } from '../../utils/helpers';
import SectionHeading from '../home/components/SectionHeading';
import AddPersonModal from './components/AddPersonModal';
import { Person } from '../../interfaces/interfaces';

const mockUsers = [
  {
    id: 1,
    name: 'Alice Johnson',
    title: 'Product Manager',
    email: 'alice.johnson@example.com',
    signer: true,
    status: 'Active',
    picture: '',
    address: {
      country: 'United States',
      address0: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
    },
  },
  {
    id: 2,
    name: 'Bob Smith',
    title: 'Lead Developer',
    email: 'bob.smith@example.com',
    picture: '',
    signer: false,
    status: 'Dissolved',
    address: {
      country: 'United States',
      address0: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
    },
  },
  {
    id: 3,
    name: 'Clara Davis',
    title: 'UX Designer',
    email: 'clara.davis@example.com',
    picture: '',
    signer: true,
    status: 'Inactive',
    address: {
      country: 'United States',
      address0: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
    },
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

function People() {
  const navigate = useNavigate();

  const [peopleData, setPeopleData] = React.useState<Person[]>(mockUsers);
  const [openModal, setOpenModal] = React.useState(false);

  const handleButtonClick = (id: number) => {
    navigate(`${ROUTES.PERSON}/${id}`);
  };

  return (
    <div className="relative pl-10 pr-10 py-8 max-sm:pl-4 max-sm:pr-4 container max-w-7xl mx-auto">
      <SearchHeading setOpenModal={setOpenModal} />
      <>
        <SectionHeading title="People" />
        <div className="w-full overflow-auto text-sm">
          <div className="w-full divide-y divide-gray-300">
            <div className="flex py-3 pl-3 pr-3">
              <div className="w-[25%] text-sm font-medium tracking-wide text-gray-500">
                Name
              </div>
              <div className="w-[25%] text-sm font-medium tracking-wide text-gray-500">
                Email
              </div>
              <div className="w-[50%] text-sm font-medium tracking-wide text-gray-500 text-right">
                Status
              </div>
            </div>
            <div className="divide-y divide-gray-200 bg-white">
              {peopleData.map((person) => {
                return (
                  <div
                    key={person.id}
                    onClick={() => handleButtonClick(person.id)}
                    className="flex py-4 hover:bg-gray-100 transition-all duration-150 ease-in-out hover:cursor-pointer group"
                  >
                    <div className="w-[25%] pl-3 pr-3 text-sm font-semibold text-gray-700 flex items-center gap-2">
                      {person.picture ? (
                        <img
                          src={person.picture}
                          alt={person.name}
                          className="w-6 h-6 rounded-full"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                          {person.name.charAt(0)}
                        </div>
                      )}
                      {person.name}
                    </div>
                    <div className="w-[25%] px-3 text-sm text-gray-700">
                      {person.email}
                    </div>
                    <div className="w-[50%] px-3 text-sm text-gray-500 text-right">
                      <span
                        className={classNames(
                          'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
                          statusBadge(person.status || '')
                        )}
                      >
                        {person.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
      <AddPersonModal
        open={openModal}
        setOpen={() => setOpenModal(!openModal)}
        closeModalHandler={() => setOpenModal(false)}
        submitProcess={(data) => setPeopleData([...peopleData, data])}
      />
    </div>
  );
}

export default People;
