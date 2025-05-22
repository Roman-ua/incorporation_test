import { atom } from 'recoil';
import { Address } from '../../interfaces/interfaces';

const defaultCompanyItem = {
  registeredIn: '',
  companyName: '',
  companyType: '',
  registrationDate: '',
  registrationNumber: '',
  status: '',
  taxId: '',
  address: {
    country: '',
    address0: '',
    address1: '',
    address2: '',
    address3: '',
    city: '',
    zip: '',
    state: '',
  },
};
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
  default: defaultCompanyItem,
});

export default CompanyState;
