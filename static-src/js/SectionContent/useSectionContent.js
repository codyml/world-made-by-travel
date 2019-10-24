import React, { useEffect, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { processMainContentMarkdown, processMarkdown } from '../markdown';
import {
  EXPANDED_TOC,
  SECTION_CONTENT_REQUESTED,
  SECTION_CONTENT_RECEIVED,
  REQUESTED,
  REFERABLE_CONTENT_TYPES,
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
  const contentAreaRef = useRef();
  const titleRef = useRef();
  const hoverTitleRef = useRef();
  const paragraphRefs = useRef({});
  const figureRefs = useRef({});
  const footnoteLinkRefs = useRef({});
  const footnoteRefs = useRef({});
  const blockRefs = useRef();
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

  if (!blockRefs.current && contentLoaded) {
    blockRefs.current = Object.assign(
      {},
      ...content.blocks.map((block) => ({ [block.number]: React.createRef() })),
    );
  }

  const currentSectionContext = useMemo(() => ({
    isToc,
    ...meta,
    ...(contentLoaded ? content : {}),
    contentRefs: {
      contentAreaRef,
      titleRef,
      hoverTitleRef,
      [REFERABLE_CONTENT_TYPES.paragraph]: paragraphRefs,
      [REFERABLE_CONTENT_TYPES.figure]: figureRefs,
      [REFERABLE_CONTENT_TYPES.footnoteLink]: footnoteLinkRefs,
      [REFERABLE_CONTENT_TYPES.footnote]: footnoteRefs,
      blockRefs,
    },
  }), [content, contentLoaded, isToc, meta]);

  return [contentLoaded, currentSectionContext];
}
