/*
* Extends MarkdownIt to parse {explorer-link} and {book-link}.
*/

const SPECIAL_LINK_MARKER_TOKEN_TYPE = 'special_link_marker';
export const SPECIAL_LINK_TAG = 'special_link_marker';
export const EXPLORER_LINK_TYPE = 'EXPLORER_LINK_TYPE';
export const BOOK_LINK_TYPE = 'BOOK_LINK_TYPE';
const SPECIAL_LINK_TYPES = [
  { type: EXPLORER_LINK_TYPE, prefix: '{explorer-link}' },
  { type: BOOK_LINK_TYPE, prefix: '{book-link}' },
];

export default function SpecialLinksMarkdownItPlugin(md) {
  md.inline.ruler.push(SPECIAL_LINK_MARKER_TOKEN_TYPE, (state) => {
    let token;
    SPECIAL_LINK_TYPES.forEach(({ type, prefix }) => {
      if (!token && state.src.slice(state.pos, state.posMax).indexOf(prefix) === 0) {
        token = state.push(SPECIAL_LINK_MARKER_TOKEN_TYPE, SPECIAL_LINK_TAG, 0);
        token.attrSet('linkType', type);
        state.pos += prefix.length; // eslint-disable-line no-param-reassign
      }
    });

    if (token) {
      return true;
    }

    return false;
  });
}
