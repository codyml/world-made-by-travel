import { useCallback } from 'react';
import smoothscroll from 'smoothscroll-polyfill';

import { REFERABLE_CONTENT_TYPES } from '../constants';


// Polyfills smooth scrolling
smoothscroll.polyfill();


/*
* Custom hook that enables scrolling to a specific referable content
* item.
*/

export default function useScrollToContent({ contentAreaRef, hoverTitleRef, ...contentRefs }) {
  //  Returns the offset of the top of a content element from the
  //  top of the content area.
  const getScrollOffset = useCallback((contentType, contentNumber) => {
    if (contentType === REFERABLE_CONTENT_TYPES.section) {
      return 0;
    }

    if (contentRefs[contentType]) {
      const contentRef = contentRefs[contentType].current[contentNumber];
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
  }, [contentAreaRef, contentRefs, hoverTitleRef]);

  //  Scrolls the content area to an element.
  return useCallback((contentType, contentNumber) => {
    const scrollOffset = getScrollOffset(contentType, contentNumber);
    if (scrollOffset !== null) {
      contentAreaRef.current.scrollTo({
        top: scrollOffset,
        behavior: 'smooth',
      });
    }
  }, [contentAreaRef, getScrollOffset]);
}
