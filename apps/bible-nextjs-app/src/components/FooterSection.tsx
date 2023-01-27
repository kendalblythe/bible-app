import { MarkdownText } from './MarkdownText';

export interface FooterSectionProps {
  title: string;
  text: string;
}

export const FooterSection = ({ title, text }: FooterSectionProps) => (
  <div className="max-w-prose mx-auto mb-4 text-center text-sm">
    <div className="font-medium mt-4 mb-1">{title}</div>
    <div>
      <MarkdownText text={text} />
    </div>
  </div>
);
