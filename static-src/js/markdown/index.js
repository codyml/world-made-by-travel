import parseMarkdown, { md } from './parse';
import normalizeTokens from './normalize';


/*
* Parses and normalizes a section's Markdown content, returning an
* object of the various fields used to support the features of the
* section's main content.
*/

export const processMainContentMarkdown = (markdown) => {
  const tokens = parseMarkdown(markdown);
  return normalizeTokens(tokens);
};


/*
* Parses and normalizes other Markdown content, returning just an
* array of content entities that can be rendered as-is.  Does not
* include data to support paragraph-level margin links, figures,
* or footnotes.  Used for custom block content and other Markdown
* around the site.
*/

export const processMarkdown = (markdown) => {
  const tokens = parseMarkdown(markdown);
  const { contentItems } = normalizeTokens(tokens);
  return contentItems;
};


export { md };
