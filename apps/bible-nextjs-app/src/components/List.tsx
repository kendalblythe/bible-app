import { ReactNode } from 'react';

import { clsx } from 'clsx';

export interface ListProps {
  className?: string;
  children: ReactNode;
}

export const List = ({ className, children }: ListProps) => (
  <ul className={clsx('menu bg-base-100', className)}>{children}</ul>
);
