import { ReactNode } from 'react';

export interface PageMainProps {
  children: ReactNode;
}

export const PageMain = ({ children }: PageMainProps) => <main className="p-2">{children}</main>;
