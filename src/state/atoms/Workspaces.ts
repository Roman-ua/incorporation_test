import React from 'react';
import { TbBuilding } from 'react-icons/tb';
import { atom } from 'recoil';

import logo from '../../images/icon_square.png';
import { IconBuildings } from '@tabler/icons-react';

const workspaces = [
  {
    logoUrl: logo,
    balance: '$100,000',
    icon: IconBuildings,
    title: 'Incorporate Now Inc',
    description: 'Main company',
    registeredIn: 'Florida',
    companyName: '1 My Company',
    companyType: 'Limited Liability Company',
    shortType: 'LLC',
    registrationDate: 'September 10, 2024',
    registrationNumber: '123-433R',
    status: 'Active',
    id: '1',
  },
  {
    logoUrl: '',
    balance: '$10,000',
    icon: IconBuildings,
    title: 'ACME Services Inc',
    description: 'Campaign planning',
    registeredIn: 'Delaware',
    companyName: '2 My Company',
    companyType: 'Corporation',
    shortType: 'Corporation',
    registrationDate: 'September 10, 2024',
    registrationNumber: '123-433R',
    status: 'Withdrawn',
    id: '2',
  },
  {
    logoUrl: '',
    balance: '$1,10',
    icon: IconBuildings,
    title: 'New Lake LLC',
    description: 'Development',
    registeredIn: 'Texas',
    companyName: '5 My Company',
    companyType: 'Limited Liability Company',
    shortType: 'LLC',
    registrationDate: 'September 10, 2024',
    registrationNumber: '123-433R',
    status: 'Active',
    id: '5',
  },
  {
    logoUrl: '',
    balance: '$0',
    icon: IconBuildings,
    title: 'Compliance Mitigation Inc',
    description: 'Creative projects',
    registeredIn: 'Florida',
    companyName: '3 My Company',
    companyType: 'Limited Liability Company',
    shortType: 'LLC',
    registrationDate: 'September 10, 2024',
    registrationNumber: '123-433R',
    status: 'Active',
    id: '3',
  },
  {
    logoUrl: '',
    balance: '$1,10',
    icon: IconBuildings,
    title: 'Apple Inc',
    description: 'Development',
    registeredIn: 'Florida',
    companyName: '4 My Company',
    companyType: 'Corporation',
    shortType: 'Corporation',
    registrationDate: 'September 10, 2024',
    registrationNumber: '123-433R',
    status: 'Inactive',
    id: '4',
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
