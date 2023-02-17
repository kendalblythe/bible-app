import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

export interface PreviousIconProps {
  dir: string;
}

export const PreviousIcon = ({ dir }: PreviousIconProps) =>
  dir === 'rtl' ? <BsChevronRight size="1.25rem" /> : <BsChevronLeft size="1.25rem" />;
