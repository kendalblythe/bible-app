import { ReactNode } from 'react';

export interface PageFooterProps {
  children: ReactNode;
}

export const PageFooter = ({ children }: PageFooterProps) => (
  <footer className="flex flex-col gap-5 mb-5">
    <div className="divider h-px m-0"></div>
    {children}
  </footer>
);
