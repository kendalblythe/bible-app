import { ReactNode } from 'react';

export interface PageHeaderProps {
  children: ReactNode;
}

export const PageHeader = ({ children }: PageHeaderProps) => (
  <header className="sticky top-0 z-10 bg-white dark:bg-black">
    <div className="navbar min-h-0 px-3 gap-2">{children}</div>
    <div className="divider h-px m-0"></div>
  </header>
);
