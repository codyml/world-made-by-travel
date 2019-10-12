/*
* Parses <figure>s.
*/

const FIGURE_RULE_NAME = 'figure';
export const FIGURE_OPEN_TOKEN_TYPE = 'figure_open';
export const FIGURE_CAPTION_OPEN_TOKEN_TYPE = 'figure_caption_open';
export const FIGURE_CAPTION_CLOSE_TOKEN_TYPE = 'figure_caption_close';
export const FIGURE_CLOSE_TOKEN_TYPE = 'figure_close';
const FIGURE_OPEN = '<figure>';
const CAPTION_OPEN = '<figcaption>';
const CAPTION_CLOSE = '</figcaption>';
const FIGURE_CLOSE = '</figure>';

export const FiguresMarkdownItPlugin = (md) => {
  md.block.ruler.before('html_block', FIGURE_RULE_NAME, (state, startLine, endLine) => {
    let figureContentStartPos = -1;
    let captionStartPos = -1;
    let captionEndPos = -1;
    let figureCloseLine = -1;
    let figureContentEndPos = -1;

    for (let line = startLine; line < endLine; line++) {
      const lineStartPos = state.bMarks[line] + state.tShift[line];
      const lineEndPos = state.bMarks[line + 1];
      const lineStr = state.src.slice(lineStartPos, lineEndPos);

      //  Make sure the first line is <figure>
      if (line === startLine) {
        if (lineStr.indexOf(FIGURE_OPEN) !== 0) {
          return false;
        }
        figureContentStartPos = lineEndPos;
      }

      //  Check for <figcaption>
      if (lineStr.indexOf(CAPTION_OPEN) === 0) {
        figureContentEndPos = lineStartPos;
        captionStartPos = lineEndPos;
      }

      //  Check for </figcaption>
      if (lineStr.indexOf(CAPTION_CLOSE) === 0) {
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

    state.push(FIGURE_OPEN_TOKEN_TYPE, 'figure', 1);
    const contentInlineToken = state.push('inline', '', 0);
    contentInlineToken.children = [];
    contentInlineToken.content = state.src.slice(
      figureContentStartPos,
      figureContentEndPos,
    ).trim();

    //  If valid caption
    if (captionStartPos !== -1 && captionEndPos !== -1 && captionEndPos > captionStartPos) {
      state.push(FIGURE_CAPTION_OPEN_TOKEN_TYPE, 'figcaption', 1);
      const captionInlineToken = state.push('inline', '', 0);
      captionInlineToken.children = [];
      captionInlineToken.content = state.src.slice(captionStartPos, captionEndPos).trim();
      state.push(FIGURE_CAPTION_CLOSE_TOKEN_TYPE, 'figcaption', -1);
    }

    state.push(FIGURE_CLOSE_TOKEN_TYPE, 'figure', -1);
    state.line = figureCloseLine + 1; // eslint-disable-line no-param-reassign
    return true;
  });
};


export const useFigures = () => (item) => {
  if (item.tag === 'figure') {
    return {
      children: ['FIGURE', ...item.children],
    };
  }

  return null;
};
