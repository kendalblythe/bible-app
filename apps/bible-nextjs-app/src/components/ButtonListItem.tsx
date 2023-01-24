import { MouseEventHandler, ReactNode } from 'react';

export interface ButtonListItemProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const ButtonListItem = ({ children, onClick }: ButtonListItemProps) => (
  <li>
    <button className="block btn-ghost text-start" onClick={onClick}>
      {children}
    </button>
  </li>
);
