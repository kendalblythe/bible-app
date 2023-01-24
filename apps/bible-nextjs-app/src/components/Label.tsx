import { ReactNode } from 'react';

export interface LabelProps {
  children: ReactNode;
  htmlFor?: string;
}

export const Label = ({ children, htmlFor }: LabelProps) => (
  <label className="label label-text" htmlFor={htmlFor}>
    {children}
  </label>
);
