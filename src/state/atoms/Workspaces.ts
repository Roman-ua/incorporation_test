import React from 'react';
import { TbBuilding } from 'react-icons/tb';
import { atom } from 'recoil';
import logoone from '../../images/mocklogos/AlphaWave.jpg';
import logosecond from '../../images/mocklogos/Calescence.jpg';
import logo from '../../images/icon_square.png';
import { IconBuildings } from '@tabler/icons-react';

const workspaces = [
  {
    id: '1',
    title: 'Incorporate Now Inc',
    description: 'Main company',
    companyType: 'Corporation',
    shortType: 'Corporation',
    logoUrl: logo,
    balance: '$100,000',
    icon: IconBuildings,
  },
  {
    id: '2',
    title: 'Marketing Team',
    description: 'Campaign planning',
    companyType: 'Limited Liability Company',
    shortType: 'LLC',
    logoUrl: logosecond,
    balance: '$10,000',
    icon: IconBuildings,
  },
  {
    id: '3',
    title: 'Design Studio',
    description: 'Creative projects',
    companyType: 'Non-profit',
    shortType: 'Non-profit',
    logoUrl: '',
    balance: '$0',
    icon: IconBuildings,
  },
  {
    id: '4',
    title: 'Engineering',
    description: 'Development',
    companyType: 'Non-profit',
    shortType: 'Non-profit',
    logoUrl: logoone,
    balance: '$1,10',
    icon: IconBuildings,
  },
];
export interface IWorkspace {
  id: string;
  title: string;
  description: string;
  companyType: string;
  shortType: string;
  logoUrl: string;
  balance: string;
  icon: React.FC;
}

export interface IWorkspaces {
  current: IWorkspace;
  list: typeof workspaces;
}

const WorkspacesState = atom<IWorkspaces>({
  key: 'WorkspacesState',
  default: {
    current: {
      id: '1',
      title: 'Incorporate Now Inc',
      description: 'Main company',
      companyType: 'Corporation',
      shortType: 'Corporation',
      balance: '$100,000',
      logoUrl: logo,
      icon: TbBuilding,
    },
    list: workspaces,
  },
});

export default WorkspacesState;
