import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { processMainContentMarkdown, processMarkdown } from '../markdown';
import {
  EXPANDED_TOC,
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
    }) => ({
      [identifier]: {
        identifier,
        contentNodes: figureMarkdown
          ? processMarkdown(figureMarkdown)
          : [{ component: 'img', key: `figureContent:${identifier}`, props: { src: image } }],
        download: figureDownload,
      },
    }),
  ));

  const mainContent = processMainContentMarkdown(markdown);
  const parsedBlocks = blocks.map(({ markdown: blockMarkdown, ...block }, index) => ({
    number: index + 1,
    contentNodes: processMarkdown(blockMarkdown),
    ...block,
  }));

  return {
    mainContent,
    figureContentByIdentifier,
    blocks: parsedBlocks,
    download,
  };
};


/*
* Custom hook that inits download of section content and parses it
* when it arrives.
*/

export default function useSectionContent(sectionSlug) {
  const meta = useSelector((state) => (
    state.sectionMetaBySlug[sectionSlug] || EXPANDED_TOC
  ));

  const content = useSelector((state) => state.sectionContentBySlug[sectionSlug]);
  const dispatch = useDispatch();
  const isToc = meta.slug === EXPANDED_TOC.slug;

  //  Initiates download of section content
  useEffect(() => {
    if (!isToc && !content) {
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
  }, [content, dispatch, isToc, sectionSlug]);

  const contentLoaded = content && content !== REQUESTED;
  const currentSectionContext = useMemo(
    () => ({ isToc, ...meta, ...(contentLoaded ? content : {}) }),
    [content, contentLoaded, isToc, meta],
  );

  return [contentLoaded, currentSectionContext];
}
