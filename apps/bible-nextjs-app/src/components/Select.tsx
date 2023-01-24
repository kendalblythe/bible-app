import { ChangeEventHandler, ReactNode } from 'react';
import { clsx } from 'clsx';

export interface SelectProps {
  children: ReactNode;
  id?: string;
  value?: string | number | readonly string[];
  ariaLabel?: string;
  title?: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

export const Select = ({
  children,
  id,
  value,
  ariaLabel,
  title,
  className,
  onChange,
}: SelectProps) => (
  <select
    id={id}
    className={clsx('select select-bordered select-sm', className)}
    value={value}
    title={title}
    aria-label={ariaLabel}
    onChange={onChange}
  >
    {children}
  </select>
);
