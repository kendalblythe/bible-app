import clsx from 'clsx';

export interface ButtonProps {
  text: string;
  onClick: () => void;
}

export interface ButtonGroupProps {
  buttons: ButtonProps[];
}

export const ButtonGroup = ({ buttons }: ButtonGroupProps) => {
  return (
    <div className="btn-group">
      {buttons.map(({ text, onClick }, i) => (
        <button
          key={text}
          className={clsx(
            'btn btn-sm text-black text-base font-medium',
            'inline-block max-w-[10rem] truncate normal-case px-2',
            'bg-gray-200 border-gray-200 hover:bg-gray-300 hover:border-gray-300',
            i > 0 && 'ml-px'
          )}
          onClick={onClick}
        >
          {text}
        </button>
      ))}
    </div>
  );
};
