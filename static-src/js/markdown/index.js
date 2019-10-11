import MarkdownIt from 'markdown-it';
import MarkdownItFootnote from 'markdown-it-footnote';

export const md = MarkdownIt({ html: true }).use(MarkdownItFootnote);

/*
* Parses, normalizes and verifies a section's Markdown content.
*/

export const parseMainContentMarkdown = (markdown, figureContentByIdentifier) => ({
  paragraphsByNumber: {}, // { number: { number, content: [content] }
  figuresByNumber: {}, // { number: { number, content: [identifier], caption: [content] } }
  mainContentItems: [], // [{ figure: true/false, number }]
  footnotesByIdentifier: {}, // { identifier: { identifier, content: [content] } },
  footnotes: [], // [identifier],
});

export const parseMarkdown = (markdown) => []; // [content]

// export const MarkdownContentTree = PropTypes.shape({
//   type: PropTypes.oneOf(ENTITY_TYPES),
//   content:
//
// const ENTITY_TYPES = [
//   PARAGRAPH,
//   HEADER_1,
//   HEADER_2,
//   HEADER_3,
//   SPAN,
//   STRONG,
//   EMPHASIS,
//   BOOK_LINK,
//   EXPLORER_LINK,
//   EXTERNAL_LINK,
//   IMAGE,
//   FOOTNOTE,
//   CHART,
//   EMBED,
// ]
