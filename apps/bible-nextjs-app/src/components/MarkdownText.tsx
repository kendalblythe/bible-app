import ReactMarkdown from 'react-markdown';

import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import styles from './MarkdownText.module.css';

export interface MarkdownTextProps {
  text: string;
}
export const MarkdownText = ({ text }: MarkdownTextProps) => (
  <ReactMarkdown
    className={styles.markdownText}
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]}
    linkTarget="_blank"
  >
    {text}
  </ReactMarkdown>
);
