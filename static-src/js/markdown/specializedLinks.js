/*
* Removes {explorer-link} and {book-link} and adds an indicator token.
*/

const SPECIAL_LINK_MARKER_TOKEN_TYPE = 'special_link_marker';
const SPECIAL_LINK_TYPES = [
  { type: 'explorer', prefix: '{explorer-link}' },
  { type: 'book', prefix: '{book-link}' },
];

export default function specializedLinkPlugin(md) {
  md.inline.ruler.push(SPECIAL_LINK_MARKER_TOKEN_TYPE, (state) => {
    let token;
    SPECIAL_LINK_TYPES.forEach(({ type, prefix }) => {
      if (!token && state.src.slice(state.pos, state.posMax).indexOf(prefix) === 0) {
        token = state.push(SPECIAL_LINK_MARKER_TOKEN_TYPE, '', 0);
        token.meta = { type };
        state.pos += prefix.length; // eslint-disable-line no-param-reassign
      }
    });

    if (token) {
      return true;
    }

    return false;
  });
}
