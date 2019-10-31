import React, { useEffect, useMemo, useRef, useState } from 'react';
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
    }, index) => ({
      [identifier]: {
        identifier,
        contentNodes: figureMarkdown
          ? processMarkdown(figureMarkdown)
          : [{
            component: 'img',
            key: `figureContent:${index}`,
            props: { src: image },
            refNumber: index,
          }],
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
  const imageRefs = useRef({});
  const paragraphRefs = useRef({});
  const figureRefs = useRef({});
  const footnoteLinkRefs = useRef({});
  const footnoteRefs = useRef({});
  const blockRefs = useRef();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const meta = useSelector((state) => (
    state.sectionMetaBySlug[sectionSlug] || EXPANDED_TOC
  ));

  const content = useSelector((state) => state.sectionContentBySlug[sectionSlug]);
  const transitioningTo = useSelector((state) => (
    state.currentSectionSlug === sectionSlug && state.transitionPrepared
  ));

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

  const contentReceived = content && content !== REQUESTED;
  const contentReady = contentReceived && !transitioningTo;

  useEffect(() => {
    if (contentReady && !imagesLoaded) {
      Promise.all(
        Object.values(imageRefs.current).map(
          ({ current: element }) => new Promise((resolve) => {
            if (element.complete) {
              resolve();
            } else {
              element.addEventListener('load', () => {
                resolve();
              });
            }
          }),
        ),
      ).then(() => {
        setImagesLoaded(true);
      });
    }
  }, [contentReady, imagesLoaded]);

  if (!blockRefs.current && contentReady) {
    blockRefs.current = Object.assign(
      {},
      ...content.blocks.map((block) => ({ [block.number]: React.createRef() })),
    );
  }

  const currentSectionContext = useMemo(() => ({
    isToc,
    ...meta,
    ...(contentReceived ? content : {}),
    contentRefs: {
      contentAreaRef,
      titleRef,
      hoverTitleRef,
      imageRefs,
      paragraphRefs,
      figureRefs,
      footnoteLinkRefs,
      footnoteRefs,
      blockRefs,
    },
  }), [content, contentReceived, isToc, meta]);

  return [contentReady, imagesLoaded, currentSectionContext];
}
