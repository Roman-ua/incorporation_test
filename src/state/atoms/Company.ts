import { atom } from 'recoil';
import { ICompanyData } from '../types/company';
import { defaultCompanyItem } from '../../constants/company/company';

const CompanyState = atom<ICompanyData>({
  key: 'CompanyState',
  default: defaultCompanyItem,
});

export default CompanyState;
