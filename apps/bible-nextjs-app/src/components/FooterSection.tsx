import { MarkdownText } from './MarkdownText';

export interface FooterSectionProps {
  title: string;
  text: string;
}

export const FooterSection = ({ title, text }: FooterSectionProps) => (
  <div className="mx-auto text-sm text-center px-8">
    <div className="font-bold">{title}</div>
    <div className="mt-2">
      <MarkdownText text={text} />
    </div>
  </div>
);
