import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

export interface NextIconProps {
  dir: string;
}

export const NextIcon = ({ dir }: NextIconProps) =>
  dir === 'rtl' ? <BsChevronLeft size="1.25rem" /> : <BsChevronRight size="1.25rem" />;
