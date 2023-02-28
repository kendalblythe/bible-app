import { ReactNode } from 'react';

export interface PageFooterProps {
  children: ReactNode;
}

export const PageFooter = ({ children }: PageFooterProps) => (
  <footer className="mb-4">
    <div className="divider h-px mx-2 mt-2 mb-4"></div>
    {children}
  </footer>
);
