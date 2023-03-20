import { ReactNode } from 'react';

export interface LabelProps {
  children: ReactNode;
  htmlFor?: string;
  className?: string;
}

export const Label = ({ children, htmlFor, className }: LabelProps) => (
  <label className={className} htmlFor={htmlFor}>
    {children}
  </label>
);
