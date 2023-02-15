import { MarkdownText } from './MarkdownText';

export interface FooterSectionProps {
  title: string;
  text: string;
}

export const FooterSection = ({ title, text }: FooterSectionProps) => (
  <div className="mx-auto text-base text-center px-8 pb-4">
    <div className="font-bold my-2">{title}</div>
    <div>
      <MarkdownText text={text} />
    </div>
  </div>
);
