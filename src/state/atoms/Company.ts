import { atom } from 'recoil';
import { Address } from '../../interfaces/interfaces';

export interface ICompanyData {
  registeredIn: string;
  companyName: string;
  companyType: string;
  registrationDate: string;
  registrationNumber: string;
  taxId: string;
  status: string;
  address: Address;
}

const CompanyState = atom<ICompanyData>({
  key: 'CompanyState',
  default: {
    registeredIn: 'State of Florida',
    companyName: 'my company',
    companyType: 'Corporation',
    registrationDate: 'January 15, 2025',
    registrationNumber: '12312rt',
    status: 'Active',
    taxId: '',
    address: {
      country: 'United States',
      address0: 'street one',
      address1: 'aprts',
      address2: '',
      address3: '',
      city: 'bocka',
      zip: '12312-3123',
      state: 'Alabama',
    },
  },
});

export default CompanyState;
