import { type FC } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES, ROUTE_LABELS } from '../Routes';
import type { Breadcrumb as BreadcrumbType } from '../types/index';

interface BreadcrumbsProps {
  crumbs: BreadcrumbType[];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ crumbs }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const getAutoCrumbs = () => {
    const autoCrumbs: BreadcrumbType[] = [];
    
    if (currentPath.startsWith(ROUTES.CEPHEID+'/')) {
      autoCrumbs.push({
        label: ROUTE_LABELS.CEPHEIDS,
        path: ROUTES.CEPHEIDS
      });
    }
    
    return autoCrumbs;
  };

  const autoCrumbs = getAutoCrumbs();
  const allCrumbs = [...autoCrumbs, ...crumbs];

  return (
    <Breadcrumb>
      <Breadcrumb.Item 
        linkAs={Link} 
        linkProps={{ to: ROUTES.HOME }}
      >
        {ROUTE_LABELS.HOME}
      </Breadcrumb.Item>
      
      {allCrumbs.map((crumb, index) => {
        const isLast = index === allCrumbs.length - 1;
        
        return isLast ? (
          <Breadcrumb.Item active key={crumb.label}>
            {crumb.label}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item 
            linkAs={Link} 
            linkProps={{ to: crumb.path || '#' }}
            key={crumb.label}
          >
            {crumb.label}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;