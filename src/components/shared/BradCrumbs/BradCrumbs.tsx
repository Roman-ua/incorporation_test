import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { classNames } from '../../../utils/helpers';
import { TbLayoutDashboard } from 'react-icons/tb';

interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrentPage: boolean;
}

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  useEffect(() => {
    const { pathname } = location;

    const items: BreadcrumbItem[] = [
      {
        label: 'Dashboard',
        href: '/',
        isCurrentPage: pathname === '/',
      },
    ];

    if (pathname === '/') {
      setBreadcrumbs(items);
      return;
    }

    const pathSegments = pathname.split('/').filter(Boolean);
    let currentPath = '';

    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLastSegment = index === pathSegments.length - 1;

      let label = segment.charAt(0).toUpperCase() + segment.slice(1);

      if (!isNaN(Number(segment)) && index > 0) {
        const entityName = pathSegments[index - 1];
        const singularEntityName = entityName.endsWith('s')
          ? entityName.slice(0, -1)
          : entityName;
        label = `${singularEntityName.charAt(0).toUpperCase() + singularEntityName.slice(1)} ${segment}`;
      }

      items.push({
        label,
        href: currentPath,
        isCurrentPage: isLastSegment,
      });
    });

    setBreadcrumbs(items);
  }, [location]);

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumbs" className="p-2">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center">
            {index === 0 ? (
              <Link
                to={breadcrumb.href}
                className={classNames(
                  'flex items-center text-muted-foreground hover:text-foreground transition-colors',
                  breadcrumb.isCurrentPage &&
                    'pointer-events-none text-foreground font-medium'
                )}
                aria-current={breadcrumb.isCurrentPage ? 'page' : undefined}
              >
                <TbLayoutDashboard className="h-3.5 w-3.5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            ) : (
              <>
                <ChevronRight className="h-3 w-3 text-gray-900" />
                <Link
                  to={breadcrumb.href}
                  className={classNames(
                    'ml-1.5 transition-colors text-sm',
                    breadcrumb.isCurrentPage
                      ? 'text-gray-900 font-medium pointer-events-none'
                      : 'text-gray-600 hover:text-gray-900'
                  )}
                  aria-current={breadcrumb.isCurrentPage ? 'page' : undefined}
                >
                  {breadcrumb.label}
                </Link>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
