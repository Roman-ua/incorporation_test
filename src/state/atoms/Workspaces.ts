import { atom } from 'recoil';
import { GalleryVerticalEnd } from 'lucide-react';
import React from 'react';

const workspaces = [
  {
    id: '1',
    title: 'Incorporate Now',
    description: 'Main company',
    logoUrl: '/placeholder.svg?height=40&width=40',
    balance: '$100,000',
    icon: GalleryVerticalEnd,
  },
  {
    id: '2',
    title: 'Marketing Team',
    description: 'Campaign planning',
    logoUrl: '',
    balance: '$10,000',
    icon: GalleryVerticalEnd,
  },
  {
    id: '3',
    title: 'Design Studio',
    description: 'Creative projects',
    logoUrl: '',
    balance: '$0',
    icon: GalleryVerticalEnd,
  },
  {
    id: '4',
    title: 'Engineering',
    description: 'Development',
    logoUrl: '',
    balance: '$1,10',
    icon: GalleryVerticalEnd,
  },
];
export interface IWorkspace {
  id: string;
  title: string;
  description: string;
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
      title: 'Incorporate Now',
      description: 'Main company',
      balance: '$100,000',
      logoUrl: '/placeholder.svg?height=40&width=40',
      icon: GalleryVerticalEnd,
    },
    list: workspaces,
  },
});

export default WorkspacesState;
