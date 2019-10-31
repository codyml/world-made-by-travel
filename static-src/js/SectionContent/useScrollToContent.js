import { useState, useEffect, useCallback } from 'react';
import smoothscroll from 'smoothscroll-polyfill';

import { REFERABLE_CONTENT_TYPES } from '../constants';


// Polyfills smooth scrolling
smoothscroll.polyfill();


/*
* Custom hook that enables scrolling to a specific referable content
* item.
*/

export default function useScrollToContent({ contentRefs }, contentReady, imagesLoaded) {
  const [nextScrolledContent, setNextScrolledContent] = useState(null);

  //  Returns the offset of the top of a content element from the
  //  top of the content area.
  const { contentAreaRef, hoverTitleRef } = contentRefs;
  const scrollableContentRefs = {
    [REFERABLE_CONTENT_TYPES.paragraph]: contentRefs.paragraphRefs,
    [REFERABLE_CONTENT_TYPES.figure]: contentRefs.figureRefs,
    [REFERABLE_CONTENT_TYPES.footnoteLink]: contentRefs.footnoteLinkRefs,
    [REFERABLE_CONTENT_TYPES.footnote]: contentRefs.footnoteRefs,
    [REFERABLE_CONTENT_TYPES.block]: contentRefs.blockRefs,
  };

  //  Returns the offset from the top of the scrollable element for
  //  a content item.
  const getScrollOffset = useCallback((contentType, contentNumber) => {
    if (contentType === REFERABLE_CONTENT_TYPES.section) {
      return 0;
    }

    if (scrollableContentRefs[contentType]) {
      const contentRef = scrollableContentRefs[contentType].current[contentNumber];
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
  }, [contentAreaRef, hoverTitleRef, scrollableContentRefs]);

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


  //  Executes the queued scroll if content and images are loaded.
  useEffect(() => {
    if (nextScrolledContent && contentReady && imagesLoaded) {
      setNextScrolledContent(null);
      scrollToContent(...nextScrolledContent);
    }
  }, [contentReady, imagesLoaded, nextScrolledContent, scrollToContent]);

  //  Queues content to be scrolled to.
  return (contentType, contentNumber) => {
    setNextScrolledContent([contentType, contentNumber]);
  };
}
