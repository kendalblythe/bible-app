import ReactMarkdown from 'react-markdown';

import { clsx } from 'clsx';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import styles from './MarkdownText.module.css';

export interface MarkdownTextProps {
  text: string;
  className?: string;
}
export const MarkdownText = ({ text, className }: MarkdownTextProps) => (
  <ReactMarkdown
    className={clsx(styles.markdownText, className)}
    remarkPlugins={[remarkGfm, remarkBreaks]}
    rehypePlugins={[rehypeRaw]}
    linkTarget="_blank"
  >
    {text.replaceAll('¶ ', '').trim()}
  </ReactMarkdown>
);
