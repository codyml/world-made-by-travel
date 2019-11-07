import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import {
  REFERABLE_CONTENT_TYPES,
  MATCH_CONTENT_IDENTIFIER,
  GET_CONTENT_IDENTIFIER,
} from '../constants';


//  Matches a URL hash value against the referable content types.
const parseHash = (hash) => {
  if (!hash) {
    return [REFERABLE_CONTENT_TYPES.section];
  }

  for (const [contentType, regex] of Object.entries(MATCH_CONTENT_IDENTIFIER)) {
    const match = hash.slice(1).match(regex);
    if (match) {
      const [, contentNumber] = match;
      return [contentType, contentNumber];
    }
  }

  return [null, null];
};


/*
* Custom hook that scrolls to indicated content when the hash changes
* and updates the hash when user scrolls to different content.
*/

export default function useHashScrolling(scrollToContent, {
  path: sectionPath,
  contentRefs: {
    titleRef,
    hoverTitleRef,
    contentAreaRef,
    paragraphRefs,
    figureRefs,
    footnoteRefs,
    blockRefs,
  },
}) {
  const [previousHash, setPreviousHash] = useState(null);
  const [nextHash, setNextHash] = useState(null);
  const [scrolling, setScrolling] = useState(false);
  const { pathname: currentPath, hash: currentHash } = useLocation();
  const scrollableContentRefs = {
    [REFERABLE_CONTENT_TYPES.paragraph]: paragraphRefs,
    [REFERABLE_CONTENT_TYPES.figure]: figureRefs,
    [REFERABLE_CONTENT_TYPES.footnote]: footnoteRefs,
    [REFERABLE_CONTENT_TYPES.block]: blockRefs,
  };


  /*
  * Returns whether the content area is scrolled to a given element.
  */

  const currentlyScrolledTo = useCallback((element) => {
    let itemScrollStart;
    let itemScrollEnd;
    if (element === titleRef.current) {
      itemScrollStart = 0;
      itemScrollEnd = element.getBoundingClientRect().height;
    } else {
      itemScrollStart = (
        element.getBoundingClientRect().top
        + contentAreaRef.current.scrollTop
        - contentAreaRef.current.getBoundingClientRect().top
        - hoverTitleRef.current.getBoundingClientRect().height
      );

      itemScrollEnd = (
        itemScrollStart + element.getBoundingClientRect().height
      );
    }

    return (
      contentAreaRef.current.scrollTop > itemScrollStart
      && contentAreaRef.current.scrollTop < itemScrollEnd
    );
  }, [contentAreaRef, hoverTitleRef, titleRef]);


  /*
  * Queues the next hash when user scrolls to a new content item.
  */

  const handleScroll = useCallback(() => {
    if (!scrolling) {
      if (currentlyScrolledTo(titleRef.current)) {
        setNextHash('');
        return;
      }

      for (const [contentType, contentRefs] of Object.entries(scrollableContentRefs)) {
        for (const [contentNumber, contentRef] of Object.entries(contentRefs.current)) {
          if (currentlyScrolledTo(contentRef.current)) {
            const hash = `#${GET_CONTENT_IDENTIFIER[contentType](contentNumber)}`;
            if (hash !== currentHash) {
              setNextHash(hash);
            }

            return;
          }
        }
      }
    }
  }, [currentHash, currentlyScrolledTo, scrollableContentRefs, scrolling, titleRef]);


  /*
  * Attaches scroll handler.
  */

  useEffect(() => {
    const { current: contentArea } = contentAreaRef;
    contentArea.addEventListener('scroll', handleScroll);
    return () => contentArea.removeEventListener('scroll', handleScroll);
  }, [contentAreaRef, handleScroll]);


  /*
  * Updates the hash to the queued value.
  */

  useEffect(() => {
    if (nextHash !== null) {
      setNextHash(null);
      window.location.hash = nextHash;
      setPreviousHash(nextHash);
    }
  }, [nextHash]);


  /*
  * Scrolls to section when hash changes of its own accord.
  */

  useEffect(() => {
    if (
      currentPath === sectionPath
      && currentHash !== previousHash
    ) {
      const [hashContentType, hashContentNumber] = parseHash(currentHash);
      if (hashContentType) {
        setPreviousHash(currentHash);
        setScrolling(true);
        scrollToContent(hashContentType, hashContentNumber).then(() => {
          setScrolling(false);
        }).catch(() => null);
      }
    }
  }, [currentHash, currentPath, previousHash, scrollToContent, sectionPath]);
}
