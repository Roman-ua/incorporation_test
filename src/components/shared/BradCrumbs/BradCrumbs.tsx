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
import CompanyState from '../../../state/atoms/Company';
import { useRecoilValue } from 'recoil';

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
  const companyData = useRecoilValue(CompanyState);

  const path = location.pathname.split('/').filter(Boolean);

  const label = path[path.length - 1] || 'dashboard';
  const Icon = iconHandler(label);

  const SecondPart = ({ path, value }: { path: string; value: string }) => {
    if (path === 'dashboard' && value) {
      return (
        <>
          <ChevronRight className="h-3 w-3 text-gray-900" />
          <span>{value}</span>
        </>
      );
    }
    return <></>;
  };

  return (
    <div
      className={classNames(
        'flex items-center',
        'pointer-events-none font-medium py-2 px-4 flex flex-wrap items-center gap-1.5 text-sm'
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      <ChevronRight className="h-3 w-3 text-gray-900" />
      <span className="capitalize">{label}</span>
      <SecondPart path={label} value={companyData?.name} />
    </div>
  );
}
