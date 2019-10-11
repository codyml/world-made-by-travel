/*
* Parses <figure>s.
*/

const FIGURE_RULE_NAME = 'image';
const FIGURE_OPEN_TOKEN_TYPE = 'figure_open';
const FIGURE_CONTENT_OPEN_TOKEN_TYPE = 'figure_content_open';
const FIGURE_CONTENT_CLOSE_TOKEN_TYPE = 'figure_content_close';
const FIGURE_CAPTION_OPEN_TOKEN_TYPE = 'figure_caption_open';
const FIGURE_CAPTION_CLOSE_TOKEN_TYPE = 'figure_caption_close';
const INLINE_TOKEN_TYPE = 'inline';
const FIGURE_CLOSE_TOKEN_TYPE = 'figure_close';
const FIGURE_OPEN = '<figure>';
const CAPTION_OPEN = '<figcaption>';
const CAPTION_CLOSE = '</figcaption>';
const FIGURE_CLOSE = '</figure>';

export default function specializedLinkPlugin(md) {
  md.block.ruler.before('table', FIGURE_RULE_NAME, (state, startLine, endLine) => {
    let figureContentStartPos = -1;
    let captionOpenLine = -1;
    let captionStartPos = -1;
    let captionCloseLine = -1;
    let captionEndPos = -1;
    let figureCloseLine = -1;
    let figureContentEndPos = -1;

    for (let line = startLine; line < endLine; line++) {
      const lineStartPos = state.bMarks[line] + state.tShift[line];
      const lineEndPos = state.bMarks[line + 1];
      const lineStr = state.src.slice(lineStartPos, lineEndPos);

      //  Make sure the first line is <figure>
      if (line === startLine) {
        if (lineStr.indexOf(FIGURE_OPEN) === -1) {
          return false;
        }
        figureContentStartPos = lineEndPos;
        continue;
      }

      //  Check for <figcaption>
      if (lineStr.indexOf(CAPTION_OPEN) === 0) {
        captionOpenLine = line;
        figureContentEndPos = lineStartPos;
        captionStartPos = lineEndPos;
      }

      //  Check for </figcaption>
      if (lineStr.indexOf(CAPTION_CLOSE) === 0) {
        captionCloseLine = line;
        captionEndPos = lineStartPos;
      }

      //  Check for </figure>
      if (lineStr.indexOf(FIGURE_CLOSE) === 0) {
        figureCloseLine = line;
        if (figureContentEndPos === -1) {
          figureContentEndPos = lineStartPos;
        }

        break;
      }
    }

    //  If no </figure>, return
    if (figureCloseLine === -1) {
      return false;
    }

    state.push(FIGURE_OPEN_TOKEN_TYPE);
    state.push(FIGURE_CONTENT_OPEN_TOKEN_TYPE);
    const contentInlineToken = state.push(INLINE_TOKEN_TYPE);
    contentInlineToken.content = state.str.slice(figureContentStartPos, figureContentEndPos).trim();
    state.push(FIGURE_CONTENT_CLOSE_TOKEN_TYPE);

    //  If valid caption
    if (captionOpenLine !== -1 && captionCloseLine !== -1 && captionCloseLine > captionOpenLine) {
      state.push(FIGURE_CAPTION_OPEN_TOKEN_TYPE);
      const captionInlineToken = state.push(INLINE_TOKEN_TYPE);
      captionInlineToken.content = state.str.slice(captionStartPos, captionEndPos).trim();
      state.push(FIGURE_CAPTION_CLOSE_TOKEN_TYPE);
    }

    state.push(FIGURE_CLOSE_TOKEN_TYPE);
    state.line = figureCloseLine + 1; // eslint-disable-line no-param-reassign
    return true;
  });
}
