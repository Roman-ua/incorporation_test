import { atom } from 'recoil';
import { Person } from '../../pages/company/modals/AddPersonToCompanyModal';

const mockUsers: Person[] = [];

const PeopleState = atom<Person[] | []>({
  key: 'PeopleState',
  default: mockUsers,
});

export default PeopleState;
