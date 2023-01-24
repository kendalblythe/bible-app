import { ReactNode } from 'react';

export interface PageHeaderProps {
  children: ReactNode;
}

export const PageHeader = ({ children }: PageHeaderProps) => (
  <header className="sticky top-0 bg-base-100 z-10">
    <div className="navbar min-h-0 px-4">{children}</div>
    <div className="divider h-px m-0"></div>
  </header>
);
