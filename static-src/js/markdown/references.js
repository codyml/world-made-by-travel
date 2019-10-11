/*
* Parses curly bracket references (used in figures).
*/

const REFERENCE_RULE_NAME = 'reference';
const REFERENCE_TOKEN_TYPE = 'reference';

export default function referencePlugin(md) {
  md.inline.ruler.push(REFERENCE_RULE_NAME, (state) => {
    if (state.src.charAt(state.pos) !== '{') {
      return false;
    }

    const endPosRelative = state.src.slice(state.pos, state.posMax).indexOf('}');
    if (endPosRelative !== -1) {
      const endPos = state.pos + endPosRelative;
      const text = state.src.slice(state.pos, endPos + 1);
      const reference = state.src.slice(state.pos + 1, endPos);
      const token = state.push(REFERENCE_TOKEN_TYPE, '', 0);
      token.meta = { text, reference };

      state.pos = endPos + 1; // eslint-disable-line no-param-reassign
      return true;
    }

    return false;
  });
}
