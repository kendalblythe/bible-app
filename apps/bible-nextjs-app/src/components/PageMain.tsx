import { ReactNode } from 'react';

export interface PageMainProps {
  dir?: string;
  children: ReactNode;
}

export const PageMain = ({ dir, children }: PageMainProps) => (
  <main className="p-5" dir={dir}>
    {children}
  </main>
);
