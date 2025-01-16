import { JSX } from 'react';

export interface IconButtonProps {
  icon: JSX.Element;
  title?: string;
  onClick: () => void;
}

export const IconButton = ({ icon, title, onClick }: IconButtonProps) => {
  return (
    <button className="icon-button" title={title} onClick={onClick}>
      {icon}
    </button>
  );
};
