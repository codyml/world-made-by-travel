import MarkdownIt from 'markdown-it';
import MarkdownItFootnote from 'markdown-it-footnote';

import referencePlugin from './references';
import specializedLinkPlugin from './specializedLinks';
import figurePlugin from './figures';


/*
* Initializes Markdown parser/renderer with additional rules.
*/

export const md = MarkdownIt({ html: true })
  .use(MarkdownItFootnote)
  .use(figurePlugin)
  .use(specializedLinkPlugin)
  .use(referencePlugin);

export default function parseMarkdown(markdown) {
  const env = {};
  return md.parse(markdown, env);
}
