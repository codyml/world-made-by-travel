import React, { useRef, useCallback } from 'react';
import smoothscroll from 'smoothscroll-polyfill';

import { REFERABLE_CONTENT_TYPES } from '../constants';


// Polyfills smooth scrolling
smoothscroll.polyfill();


/*
* Custom hook that enables scrolling to a specific referable content
* item.
*/

export default function useScrollToContent(contentAreaRef, hoverTitleRef, { blocks }) {
  const paragraphRefs = useRef({});
  const figureRefs = useRef({});
  const footnoteLinkRefs = useRef({});
  const footnoteRefs = useRef({});
  const blockRefs = useRef();

  //  Creates a ref for each block
  if (!blockRefs.current && blocks) {
    blockRefs.current = Object.assign(
      {},
      ...blocks.map((block) => ({ [block.number]: React.createRef() })),
    );
  }

  //  Returns the offset of the top of a content element from the
  //  top of the content area.
  const getScrollOffset = useCallback((contentType, contentNumber) => {
    if (contentType === REFERABLE_CONTENT_TYPES.section) {
      return 0;
    }

    const contentRefsByContentType = {
      [REFERABLE_CONTENT_TYPES.paragraph]: paragraphRefs,
      [REFERABLE_CONTENT_TYPES.figure]: figureRefs,
      [REFERABLE_CONTENT_TYPES.footnoteLink]: footnoteLinkRefs,
      [REFERABLE_CONTENT_TYPES.footnote]: footnoteRefs,
      [REFERABLE_CONTENT_TYPES.block]: blockRefs,
    };

    if (contentRefsByContentType[contentType]) {
      const contentRef = contentRefsByContentType[contentType].current[contentNumber];
      if (contentRef && contentRef.current) {
        return (
          contentRef.current.getBoundingClientRect().top
          + contentAreaRef.current.scrollTop
          - contentAreaRef.current.getBoundingClientRect().top
          - hoverTitleRef.current.getBoundingClientRect().height
        );
      }
    }

    return null;
  }, [contentAreaRef, hoverTitleRef]);

  //  Scrolls the content area to an element.
  const scrollToContent = useCallback((contentType, contentNumber) => {
    const scrollOffset = getScrollOffset(contentType, contentNumber);
    if (scrollOffset !== null) {
      contentAreaRef.current.scrollTo({
        top: scrollOffset,
        behavior: 'smooth',
      });
    }
  }, [contentAreaRef, getScrollOffset]);

  return [
    scrollToContent,
    paragraphRefs,
    figureRefs,
    footnoteLinkRefs,
    footnoteRefs,
    blockRefs,
  ];
}
