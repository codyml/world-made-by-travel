/*
* Parses curly bracket references (used in figures) {explorer-link}.
*/

const REFERENCE_RULE_NAME = 'reference';
const REFERENCE_TOKEN_TYPE = 'reference';

export default function specializedLinkPlugin(md) {
  md.inline.ruler.before('link', SPECIAL_LINK_MARKER_TOKEN_TYPE, (state) => {

    if (state.src.getCharAt(state.pos) !== '{') {
      return false;
    }

    const endPos = state.src.slice(state.pos + 1, state.posMax).indexOf('}');
    if (endPos !== -1) {
      const token = state.push(REFERENCE_TOKEN_TYPE);
      token.meta = { reference}
    }
    SPECIAL_LINK_TYPES.forEach(({ type, prefix }) => {
      if (state.src.slice(state.pos, state.pos + prefix.length) === prefix) {
        const token = state.push(SPECIAL_LINK_MARKER_TOKEN_TYPE);
        token.meta = { type };
        state.pos += prefix.length; // eslint-disable-line no-param-reassign
      }
    });
  });
}
