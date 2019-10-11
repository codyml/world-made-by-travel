/*
* Removes {explorer-link} and {book-link} and adds an indicator token.
*/

const SPECIAL_LINK_MARKER_TOKEN_TYPE = 'special_link_marker';
const SPECIAL_LINK_TYPES = [
  { type: 'explorer', prefix: '{explorer-link}' },
  { type: 'book', prefix: '{book-link}' },
];

export default function specializedLinkPlugin(md) {
  md.inline.ruler.before('link', SPECIAL_LINK_MARKER_TOKEN_TYPE, (state) => {
    SPECIAL_LINK_TYPES.forEach(({ type, prefix }) => {
      if (state.src.slice(state.pos, state.pos + prefix.length) === prefix) {
        const token = state.push(SPECIAL_LINK_MARKER_TOKEN_TYPE);
        token.meta = { type };
        state.pos += prefix.length; // eslint-disable-line no-param-reassign
      }
    });
  });
}
