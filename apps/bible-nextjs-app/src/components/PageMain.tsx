import { ReactNode } from 'react';

export interface PageMainProps {
  dir?: string;
  children: ReactNode;
}

export const PageMain = ({ dir, children }: PageMainProps) => (
  <main className="px-4 py-2" dir={dir}>
    {children}
  </main>
);
