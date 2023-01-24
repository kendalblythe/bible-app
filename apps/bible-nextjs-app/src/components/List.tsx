import { ReactNode } from 'react';

export interface ListProps {
  children: ReactNode;
}

export const List = ({ children }: ListProps) => <ul className="menu bg-base-100">{children}</ul>;
