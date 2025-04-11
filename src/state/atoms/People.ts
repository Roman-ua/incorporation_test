import { atom } from 'recoil';
import { Person } from '../../pages/company/modals/AddPersonToCompanyModal';

const PeopleState = atom<Person[]>({
  key: 'PeopleState',
  default: [],
});

export default PeopleState;
