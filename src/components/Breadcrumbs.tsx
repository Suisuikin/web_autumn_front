import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const Breadcrumbs: React.FC = () => {
  const location = useLocation();

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = location.pathname.split('/').filter((x) => x);
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Главная', path: '/' }];

    if (paths.length === 0) return breadcrumbs;

    if (paths[0] === 'services') {
      breadcrumbs.push({ label: 'Услуги', path: '/services' });

      if (paths.length > 1) {
        const id = paths[1];
        breadcrumbs.push({
          label: `Услуга #${id}`,
          path: `/services/${id}`,
        });
      }
    }

    if (paths[0] === 'orders' && paths.length > 1) {
      const id = paths[1];
      breadcrumbs.push({
        label: `Заявка #${id}`,
        path: `/orders/${id}`,
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <Breadcrumb className="mb-4">
      {breadcrumbs.map((crumb, index) => (
        <Breadcrumb.Item
          key={crumb.path}
          active={index === breadcrumbs.length - 1}
          linkAs={Link}
          linkProps={{ to: crumb.path }}
        >
          {crumb.label}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
