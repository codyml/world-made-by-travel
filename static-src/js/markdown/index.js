import MarkdownIt from 'markdown-it';
import MarkdownItFootnote from 'markdown-it-footnote';

import specializedLinkPlugin from './specializedLinks';
import figurePlugin from './figures';


/*
* Initializes Markdown parser/renderer with additional rules.
*/

export const md = MarkdownIt({ html: true })
  .use(MarkdownItFootnote)
  .use(specializedLinkPlugin)
  .use(figurePlugin);


/*
* Parses, normalizes and verifies a section's Markdown content.
*/

const PARAGRAPH = 'PARAGRAPH';
const FIGURE = 'FIGURE';
const EMBED = 'EMBED';
const UNKNOWN = 'UNKNOWN';

export const parseMainContentMarkdown = (markdown, figureContentByIdentifier) => {
  // console.log(markdown);
  const env = {};
  const tokens = md.parse(markdown, env);
  // console.log(tokens, env);

  let lastParagraphNumber = 0;
  let lastFigureNumber = 0;
  const paragraphsByNumber = {};
  const figuresByNumber = {};
  const footnotesByIdentifier = {};
  const footnotes = [];
  const mainContentItems = [];

  const parseTokens = (currentTokens) => {
    let currentParagraph = null;
    let currentFootnote = null;

    for (let i = 0; i < currentTokens.length; i++) {
      const token = currentTokens[i];
      switch (token.type) {
        case 'paragraph_open':
          if (currentParagraph) {
            throw new Error('Already in paragraph');
          }

          currentParagraph = { type: PARAGRAPH };
          break;

        case 'inline':
          if (!currentParagraph) {
            throw new Error('Not in paragraph');
          }

          currentParagraph.children = parseTokens(token.children);
          break;

        case 'paragraph_close':
          if (!currentParagraph) {
            throw new Error('Not in paragraph');
          }

          currentParagraph.number = lastParagraphNumber + 1;
          lastParagraphNumber = currentParagraph.number;
          paragraphsByNumber[currentParagraph.number] = currentParagraph;
          mainContentItems.push({ itemType: PARAGRAPH, identifier: currentParagraph.number });
          currentParagraph = null;
          break;

        case 'figure': {
          const figure = {
            type: FIGURE,
            ...token.meta,
            number: lastFigureNumber + 1,
          };

          lastFigureNumber = figure.number;
          figuresByNumber[figure.number] = figure;
          mainContentItems.push({ itemType: FIGURE, identifier: figure.number });
          break;
        }

        case 'html_block': {
          const embed = {
            type: EMBED,
            content: token.content,
          };

          break;
        }

        default:
          mainContentItems.push({ type: UNKNOWN, token });
      }
    }
  };

  parseTokens(tokens);

  return {
    paragraphsByNumber, // { number: { number, content: [content] }
    figuresByNumber, // { number: { number, content: [identifier], caption: [content] } }
    mainContentItems, // [{ figure: true/false, number }]
    footnotesByIdentifier, // { identifier: { identifier, content: [content] } },
    footnotes, // [identifier],
  };
};

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
