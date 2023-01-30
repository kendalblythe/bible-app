import { MarkdownText } from './MarkdownText';

export interface FooterSectionProps {
  title: string;
  text: string;
}

export const FooterSection = ({ title, text }: FooterSectionProps) => (
  <div className="mx-auto px-4 sm:px-8 md:px-10 lg:px-12 pb-4 text-center text-sm">
    <div className="font-bold mb-1">{title}</div>
    <div>
      <MarkdownText text={text} />
    </div>
  </div>
);
