import { atom } from 'recoil';
import { ICompanyData } from '../types/company';
import { defaultCompanyItem } from '../../constants/company/company';

const workspaces = [defaultCompanyItem];

export interface IWorkspaces {
  dataRequested: boolean;
  current: ICompanyData;
  list: typeof workspaces | [];
}

const WorkspacesState = atom<IWorkspaces>({
  key: 'WorkspacesState',
  default: {
    dataRequested: false,
    current: defaultCompanyItem,
    list: [],
  },
});

export default WorkspacesState;
