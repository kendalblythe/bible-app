import { MouseEventHandler, ReactNode } from 'react';

import { clsx } from 'clsx';

export interface ButtonListItemProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const ButtonListItem = ({ children, className, onClick }: ButtonListItemProps) => (
  <li className="max-w-full">
    <button className={clsx('btn-ghost text-start max-w-full', className)} onClick={onClick}>
      {children}
    </button>
  </li>
);
