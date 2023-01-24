import { ReactNode } from 'react';
import { clsx } from 'clsx';

export interface LabelProps {
  children: ReactNode;
  htmlFor?: string;
  className?: string;
}

export const Label = ({ children, htmlFor, className }: LabelProps) => (
  <label className={clsx('label label-text', className)} htmlFor={htmlFor}>
    {children}
  </label>
);
