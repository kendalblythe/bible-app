import { ReactNode } from 'react';

export interface PageHeaderProps {
  dir?: string;
  children: ReactNode;
}

export const PageHeader = ({ dir, children }: PageHeaderProps) => (
  <header className="sticky top-0 bg-base-100 z-10" dir={dir}>
    <div className="navbar min-h-0 px-4">{children}</div>
    <div className="divider h-px m-0"></div>
  </header>
);
