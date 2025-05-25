import { atom } from 'recoil';
import { ICompanyData } from '../types/company';
import { defaultCompanyItem } from '../../constants/company/company';

const workspaces = [defaultCompanyItem];

export interface IWorkspaces {
  current: ICompanyData;
  list: typeof workspaces | [];
}

const WorkspacesState = atom<IWorkspaces>({
  key: 'WorkspacesState',
  default: {
    current: defaultCompanyItem,
    list: [],
  },
});

export default WorkspacesState;
