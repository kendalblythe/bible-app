import { ReactNode } from 'react';

export interface PageHeadingProps {
  children: ReactNode;
}

export const PageHeading = ({ children }: PageHeadingProps) => (
  <h1 className="text-2xl font-bold pb-1">{children}</h1>
);
