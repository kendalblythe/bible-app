export interface IconButtonProps {
  icon: JSX.Element;
  title?: string;
  onClick: () => void;
}

export const IconButton = ({ icon, title, onClick }: IconButtonProps) => {
  return (
    <button className="btn-ghost hover:bg-gray-300 p-1" title={title} onClick={onClick}>
      {icon}
    </button>
  );
};
