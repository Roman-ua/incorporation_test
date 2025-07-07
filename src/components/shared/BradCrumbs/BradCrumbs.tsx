interface BreadcrumbItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isCurrentPage: boolean;
}

import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Mail,
  FileText,
  LayoutDashboard,
  Users,
  ClipboardList,
  ConciergeBell,
  ChevronRight,
  CircleUser,
} from 'lucide-react';
import { IconFileInvoice } from '@tabler/icons-react';
import { classNames } from '../../../utils/helpers';
import { useRecoilValue } from 'recoil';
import WorkspacesState from '../../../state/atoms/Workspaces';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/navigation/routes';
import UserProfileState from '../../../state/atoms/UserProfile';

const iconHandler = (path: string[]): BreadcrumbItem['icon'] => {
  switch (true) {
    case path.includes('dashboard'):
      return LayoutDashboard;
    case path.includes('mail'):
      return Mail;
    case path.includes('documents'):
      return FileText;
    case path.includes('services'):
      return ConciergeBell;
    case path.includes('orders'):
      return ClipboardList;
    case path.includes('invoices'):
      return IconFileInvoice;
    case path.includes('people'):
      return Users;
    case path.includes('account'):
      return CircleUser;
    default:
      return LayoutDashboard;
  }
};

export default function Breadcrumbs() {
  const location = useLocation();
  const userData = useRecoilValue(UserProfileState);

  const { current } = useRecoilValue(WorkspacesState);

  const path = location.pathname.split('/').filter(Boolean);

  const label = path[path.length - 1] || 'dashboard';
  const Icon = iconHandler(path);

  const SecondPart = () => {
    if (path.includes('ein')) {
      return (
        <>
          <ChevronRight className="h-3 w-3 text-gray-900" />
          <span>EIN (Tax ID)</span>
        </>
      );
    }

    if (path.includes('invoices')) {
      return (
        <>
          <ChevronRight className="h-3 w-3 text-gray-900" />
          <span>Invoices</span>
        </>
      );
    }

    if (path.includes('dashboard')) {
      return (
        <>
          {/* <ChevronRight className="h-3 w-3 text-gray-900" />
          <span>C_{current?.id}</span> */}
        </>
      );
    }

    return <></>;
  };

  const FirstPart = ({ value }: { value: string }) => {
    console.log(userData, 'userData');

    if (path.includes('dashboard')) {
      return <span className="capitalize">Dashboard</span>;
    }

    if (path.includes('ein') && value) {
      return <Link to={`${ROUTES.HOME}/${current?.id}`}>{value}</Link>;
    }
    if (path.includes('account') && value) {
      return <div>{userData.data?.full_name || 'Account'}</div>;
    }
    return <span className="capitalize">{label}</span>;
  };

  return (
    <div
      className={classNames(
        'font-medium py-2 px-4 flex flex-wrap items-center gap-1.5 text-sm'
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      <ChevronRight className="h-3 w-3 text-gray-900" />
      <FirstPart value={current?.name} />
      <SecondPart />
    </div>
  );
}
