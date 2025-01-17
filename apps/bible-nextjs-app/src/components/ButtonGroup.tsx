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
    <div className="join">
      {buttons.map(({ text, tooltipKey, onClick }, i) => (
        <button
          key={text}
          title={t(tooltipKey, { name: text })}
          className={clsx('button-group-button join-item', i > 0 && '!ml-px')}
          onClick={onClick}
        >
          {text}
        </button>
      ))}
    </div>
  );
};
