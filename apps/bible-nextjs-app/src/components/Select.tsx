import { ChangeEventHandler, ReactNode } from 'react';

export interface SelectProps {
  children: ReactNode;
  id?: string;
  value?: string | number | readonly string[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

export const Select = ({ children, id, value, onChange }: SelectProps) => (
  <select id={id} className="select select-bordered select-sm" value={value} onChange={onChange}>
    {children}
  </select>
);
