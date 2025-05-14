import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronRight,
  ConciergeBell,
  FileMinus,
  Files,
  FileText,
  LayoutDashboard,
  ListOrdered,
  Mails,
  Puzzle,
  Users,
} from 'lucide-react';
import { LuFileStack } from 'react-icons/lu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../constants/navigation/routes';
import { classNames } from '../../../../utils/helpers';

const navigationItems = [
  {
    id: 'Dashboard',
    label: 'Dashboard',
    href: ROUTES.HOME,
    icon: LayoutDashboard,
  },
  { id: 'Mail', label: 'Mail', href: ROUTES.MAIL, icon: Mails },
  {
    id: 'Documents',
    label: 'Documents',
    href: ROUTES.DOCUMENTS,
    icon: Files,
  },
  {
    id: 'Services',
    label: 'Services',
    href: ROUTES.SERVICES,
    icon: ConciergeBell,
  },
  { id: 'Orders', label: 'Orders', href: ROUTES.ORDERS, icon: ListOrdered },
  {
    id: 'Invoices',
    label: 'Invoices',
    href: ROUTES.INVOICES,
    icon: FileMinus,
  },
  { id: 'People', label: 'People', href: ROUTES.PEOPLE, icon: Users },
];

const internalItems = [
  {
    id: 'Elements',
    label: 'Elements',
    icon: Puzzle,
    children: [
      { id: 'buttons', label: 'Buttons', href: ROUTES.ELEMENTS_BUTTONS },
      {
        id: 'notifications',
        label: 'Notifications',
        href: ROUTES.ELEMENTS_NOTIONS,
      },
      { id: 'address', label: 'Address', href: ROUTES.ELEMENTS_ADDRESS },
      { id: 'icons', label: 'Icons', href: ROUTES.ELEMENTS_ICONS },
    ],
  },
  {
    id: 'Emails',
    label: 'Emails',
    icon: LuFileStack,
    href: ROUTES.EMAILS,
    children: [],
  },
  {
    id: 'Report Confirmation',
    label: 'Annual Report Confirmation',
    icon: FileText,
    href: ROUTES.REPORT_REVIEW,
    children: [],
  },
];

const hideInternal = true;
// Internal items with nested structure
const NawLinks = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [activeItem, setActiveItem] = React.useState('home');
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  // Toggle expanded state for internal items
  const toggleExpand = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Check if an item is expanded
  const isExpanded = (id: string) => expandedItems.includes(id);

  return (
    <div className="flex-1 overflow-auto bg-zinc-50">
      {/* Navigation Section */}
      <div className="px-4 mb-6">
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.id}
                to={item.href}
                onClick={() => {
                  setActiveItem(item.id);
                }}
                className={classNames(
                  'text-gray-900 flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 h-8 text-sm',
                  isActive ? 'bg-gray-100' : 'hover:bg-gray-100/80'
                )}
              >
                <Icon className={`h-5 w-5 text-gray-900`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      {/* Internal Section */}
      {!hideInternal && (
        <div className="px-4">
          <h3 className="px-2 text-xs font-medium text-gray-400 tracking-wider mb-2">
            Internal
          </h3>
          <nav className="space-y-1">
            {internalItems.map((item) => {
              const Icon = item.icon;
              const hasChildren = item.children && item.children.length > 0;
              const expanded = isExpanded(item.id);

              return (
                <div key={item.id} className="space-y-1">
                  <button
                    onClick={() => {
                      if (!item.children.length && item?.href) {
                        navigate(item.href);
                      } else {
                        toggleExpand(item.id);
                      }
                    }}
                    className={classNames(
                      'text-gray-900 flex w-full items-center justify-start gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 h-8 text-sm',
                      activeItem === item.id
                        ? 'bg-gray-100'
                        : 'hover:bg-gray-100/80'
                    )}
                  >
                    <div className="flex items-center gap-2 transition-[width,height,padding] [&>svg]:size-4 [&>svg]:shrink-0 h-8 text-sm">
                      <Icon className={`h-5 w-5 text-gray-900`} />
                      <span>{item.label}</span>
                    </div>
                    {hasChildren && (
                      <ChevronRight
                        className={`h-4 w-4 ml-auto text-gray-400 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
                      />
                    )}
                  </button>

                  {/* Nested Items */}
                  {hasChildren && (
                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-8 space-y-1">
                            {item.children.map((child) => (
                              <Link
                                key={`${item.id}-${child.id}`}
                                to={child.href}
                                onClick={() => {
                                  setActiveItem(`${item.id}-${child.id}`);
                                }}
                                className={classNames(
                                  'relative text-gray-900 flex items-center p-2 text-left h-8 text-sm rounded-md',
                                  pathname === child.href
                                    ? 'bg-gray-100'
                                    : 'hover:bg-gray-100/80'
                                )}
                              >
                                <div className="absolute inset-y-0 -left-4 w-0.5 -top-1 -bottom-1 border-l border-gray-200" />
                                <span>{child.label}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
};

export default NawLinks;

// peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 text-sm
