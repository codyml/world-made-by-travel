import MarkdownIt from 'markdown-it';
import FootnotesMarkdownItPlugin from 'markdown-it-footnote';

import { ReferencesMarkdownItPlugin } from './references';
import { SpecialLinksMarkdownItPlugin } from './links';
import { FiguresMarkdownItPlugin } from './figures';


/*
* Initializes Markdown parser/renderer with additional rules.
*/

export const md = MarkdownIt({ html: true })
  .use(FootnotesMarkdownItPlugin)
  .use(SpecialLinksMarkdownItPlugin)
  .use(ReferencesMarkdownItPlugin)
  .use(FiguresMarkdownItPlugin);

export default function parseMarkdown(markdown) {
  const env = {};
  return md.parse(markdown, env);
}
