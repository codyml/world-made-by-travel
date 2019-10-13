import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { processMainContentMarkdown, processMarkdown } from '../markdown';
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
      markdown: figureMarkdown,
      image,
      download: figureDownload,
    }, index) => ({
      [identifier]: {
        identifier,
        contentItems: figureMarkdown
          ? processMarkdown(figureMarkdown)
          : [{ key: `img:${index}`, tag: 'img', props: { src: image } }],

        download: figureDownload,
      },
    }),
  ));

  const mainContent = processMainContentMarkdown(markdown);
  const parsedBlocks = blocks.map(({ markdown: blockMarkdown, ...block }, index) => ({
    number: index + 1,
    content: processMarkdown(blockMarkdown),
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

  const contentLoaded = content && content !== REQUESTED;
  return [contentLoaded, contentLoaded ? content : {}];
}
