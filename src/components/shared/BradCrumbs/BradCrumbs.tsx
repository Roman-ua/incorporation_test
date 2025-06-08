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
} from 'lucide-react';
import { IconFileInvoice } from '@tabler/icons-react';
import { classNames } from '../../../utils/helpers';
import { useRecoilValue } from 'recoil';
import WorkspacesState from '../../../state/atoms/Workspaces';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/navigation/routes';

const iconHandler = (label: string): BreadcrumbItem['icon'] => {
  switch (label) {
    case 'dashboard':
      return LayoutDashboard;
    case 'mail':
      return Mail;
    case 'documents':
      return FileText;
    case 'services':
      return ConciergeBell;
    case 'orders':
      return ClipboardList;
    case 'invoices':
      return IconFileInvoice;
    case 'people':
      return Users;
    default:
      return LayoutDashboard;
  }
};

export default function Breadcrumbs() {
  const location = useLocation();
  const { current } = useRecoilValue(WorkspacesState);

  const path = location.pathname.split('/').filter(Boolean);

  const label = path[path.length - 1] || 'dashboard';
  const Icon = iconHandler(label);

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
    if (path.includes('dashboard')) {
      return <span className="capitalize">Dashboard</span>;
    }

    if (path.includes('ein') && value) {
      return <Link to={`${ROUTES.HOME}?id=${current?.id}`}>{value}</Link>;
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
