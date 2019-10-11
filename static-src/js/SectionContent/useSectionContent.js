import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { parseMarkdown, parseMainContentMarkdown } from '../markdown';
import {
  SECTION_CONTENT_REQUESTED,
  SECTION_CONTENT_RECEIVED,
  REQUESTED,
} from '../constants';


const parseSectionContent = ({
  markdown,
  figures,
  blocks,
  download,
}) => {
  const figureContentByIdentifier = Object.assign({}, ...figures.map(
    ({
      identifier,
      markdown: imageMarkdown,
      image,
      download: imageDownload,
    }) => ({
      [identifier]: {
        identifier,
        content: imageMarkdown
          ? parseMarkdown(imageMarkdown)
          : [{ image }],

        download: imageDownload,
      },
    }),
  ));

  const mainContent = parseMainContentMarkdown(markdown);
  const parsedBlocks = blocks.map(({ markdown: blockMarkdown, ...block }, index) => ({
    index,
    content: parseMarkdown(blockMarkdown),
    ...block,
  }));

  return {
    mainContent,
    figureContentByIdentifier,
    preFootnotesBlocks: parsedBlocks.filter((block) => !block.belowFootnotes),
    postFootnotesBlocks: parsedBlocks.filter((block) => block.belowFootnotes),
    download,
  };
};


/*
* Custom hook that inits download of section content and parses it
* when it arrives.
*/

export default function useSectionContent(sectionSlug) {
  const meta = useSelector((state) => state.sectionMetaBySlug[sectionSlug]);
  const content = useSelector((state) => state.sectionContentBySlug[sectionSlug]);
  const dispatch = useDispatch();

  //  Initiates download of section content
  useEffect(() => {
    if (meta && !content) {
      const fetchContent = async () => {
        dispatch({ type: SECTION_CONTENT_REQUESTED, sectionSlug });
        const response = await fetch(`/wp-json/wmt/section-content?slug=${sectionSlug}`);
        if (response.ok) {
          const jsonResponse = await response.json();
          dispatch({
            type: SECTION_CONTENT_RECEIVED,
            sectionSlug,
            sectionContent: parseSectionContent(jsonResponse),
          });
        }
      };

      fetchContent();
    }
  }, [content, dispatch, meta, sectionSlug]);

  return content && content !== REQUESTED ? content : null;
}
