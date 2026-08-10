import { Link } from 'react-router-dom';

export interface Crumb {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  /** Full trail including the current page, which renders as plain text. */
  trail: Crumb[];
}

export default function Breadcrumbs({ trail }: BreadcrumbsProps) {
  return (
    <nav className="breadcrumbs" aria-label="Ruta de navegación">
      <ol>
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={crumb.path}>
              {isLast ? (
                <span aria-current="page">{crumb.name}</span>
              ) : (
                <Link to={crumb.path}>{crumb.name}</Link>
              )}
              {!isLast && (
                <span className="breadcrumbs__sep" aria-hidden="true">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
