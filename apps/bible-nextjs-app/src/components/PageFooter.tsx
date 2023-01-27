import { ReactNode } from 'react';

export interface PageFooterProps {
  children: ReactNode;
}

export const PageFooter = ({ children }: PageFooterProps) => (
  <footer>
    <div className="divider h-px mx-2 my-4"></div>
    {children}
  </footer>
);
