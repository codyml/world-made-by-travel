import { useState, useEffect, useCallback, useRef } from 'react';
import smoothscroll from 'smoothscroll-polyfill';

import { REFERABLE_CONTENT_TYPES } from '../constants';


// Polyfills smooth scrolling
smoothscroll.polyfill();


/*
* Custom hook that enables scrolling to a specific referable content
* item.
*/

export default function useScrollToContent({ contentRefs }, contentReady, imagesLoaded) {
  const scrollEndPromise = useRef();
  const [nextScrolledContent, setNextScrolledContent] = useState(null);

  /*
  * Returns the offset of the top of a content element from the top
  * of the content area.
  */

  const { contentAreaRef, hoverTitleRef } = contentRefs;
  const scrollableContentRefs = {
    [REFERABLE_CONTENT_TYPES.paragraph]: contentRefs.paragraphRefs,
    [REFERABLE_CONTENT_TYPES.figure]: contentRefs.figureRefs,
    [REFERABLE_CONTENT_TYPES.footnoteLink]: contentRefs.footnoteLinkRefs,
    [REFERABLE_CONTENT_TYPES.footnote]: contentRefs.footnoteRefs,
    [REFERABLE_CONTENT_TYPES.block]: contentRefs.blockRefs,
  };


  /*
  * Returns the offset from the top of the scrollable element for
  * a content item.
  */

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
          - hoverTitleRef.current.clientHeight
        );
      }
    }

    return null;
  }, [contentAreaRef, hoverTitleRef, scrollableContentRefs]);


  /*
  * Scrolls the content area to an element.
  */

  const scrollToContent = useCallback((contentType, contentNumber) => {
    const scrollOffset = getScrollOffset(contentType, contentNumber);
    if (scrollOffset !== null) {
      //  Resolves the scroll promise on scroll end
      const onScroll = () => {
        if (
          Math.abs(contentAreaRef.current.scrollTop - scrollOffset) < 1
          || contentAreaRef.current.scrollTop === (
            contentAreaRef.current.scrollHeight
            - contentAreaRef.current.clientHeight
          )
        ) {
          scrollEndPromise.current.resolve();
          scrollEndPromise.current = null;
          contentAreaRef.current.removeEventListener('scroll', onScroll);
        }
      };

      contentAreaRef.current.addEventListener('scroll', onScroll);
      onScroll();
      contentAreaRef.current.scrollTo({
        top: scrollOffset,
        behavior: 'smooth',
      });
    } else {
      scrollEndPromise.current.reject(`No valid scroll destination found: ${contentType} ${contentNumber}`);
    }
  }, [contentAreaRef, getScrollOffset]);


  /*
  * Executes the queued scroll if content and images are loaded.
  */

  useEffect(() => {
    if (nextScrolledContent && contentReady && imagesLoaded) {
      setNextScrolledContent(null);
      scrollToContent(...nextScrolledContent);
    }
  }, [contentReady, imagesLoaded, nextScrolledContent, scrollToContent]);


  /*
  * Queues content to be scrolled to, returning a Promise that resolves
  * when the scroll is finish.  If another scroll is started before
  * the last scroll finishes, the last scroll's Promise rejects.
  */

  return (contentType, contentNumber) => new Promise((resolve) => {
    if (scrollEndPromise.current) {
      scrollEndPromise.current.reject(`Scroll cancelled in favor of newer scroll: ${contentType} ${contentNumber}`);
    }

    scrollEndPromise.current = { resolve, reject: resolve };
    setNextScrolledContent([contentType, contentNumber]);
  });
}
