import { atom } from 'recoil';
import { Person } from '../../pages/company/modals/AddPersonToCompanyModal';

const mockUsers = [
  {
    id: '3',
    fullName: 'Clara Davis',
    title: 'UX Designer',
    email: 'clara.davis@example.com',
    picture: '',
    signer: true,
    sendInvitation: false,
    titles: ['UX, Designer'],
    dateAdded: new Date().toISOString(),
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

const PeopleState = atom<Person[]>({
  key: 'PeopleState',
  default: mockUsers,
});

export default PeopleState;
