import clsx from 'clsx';

import { useTranslation } from '../hooks';

export interface ButtonProps {
  text: string;
  tooltipKey: string;
  onClick: () => void;
}

export interface ButtonGroupProps {
  buttons: ButtonProps[];
}

export const ButtonGroup = ({ buttons }: ButtonGroupProps) => {
  const { t } = useTranslation();
  return (
    <div className="btn-group">
      {buttons.map(({ text, tooltipKey, onClick }, i) => (
        <button
          key={text}
          title={t(tooltipKey, { name: text })}
          className={clsx(
            'btn btn-sm text-black text-base font-medium',
            'inline-block min-w-[3rem] max-w-[10rem] truncate normal-case px-2',
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
