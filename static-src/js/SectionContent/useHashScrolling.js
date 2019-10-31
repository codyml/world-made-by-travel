import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import { REFERABLE_CONTENT_TYPES, CONTENT_TYPE_HASH } from '../constants';


//  Matches a URL hash value against the referable content types.
const parseHash = (hash) => {
  if (!hash) {
    return [REFERABLE_CONTENT_TYPES.section];
  }

  for (const [contentType, { regex }] of Object.entries(CONTENT_TYPE_HASH)) {
    const match = hash.slice(1).match(regex);
    if (match) {
      const [, contentNumber] = match;
      return [contentType, contentNumber];
    }
  }

  return [null, null];
};


//  Generates a hash value for a content item
// const generateHash = (contentType, contentNumber) => {
//   if (CONTENT_TYPE_HASH[contentType]) {
//     return CONTENT_TYPE_HASH[contentType].generate(contentNumber);
//   }
//
//   return null;
// };


/*
* Custom hook that scrolls to indicated content when the hash changes
* and updates the hash when user scrolls to different content.
*/

export default function useHashScrolling(scrollToContent, { path: sectionPath }) {
  const [[currentContentType, currentContentNumber], setCurrentContent] = useState([]);
  const { pathname, hash } = useLocation();

  //  Scrolls to section when hash changes
  useEffect(() => {
    if (pathname === sectionPath) {
      const [hashContentType, hashContentNumber] = parseHash(hash);
      if (
        hashContentType !== currentContentType
        || hashContentNumber !== currentContentNumber
      ) {
        scrollToContent(hashContentType, hashContentNumber);
        setCurrentContent([hashContentType, hashContentNumber]);
      }
    }
  }, [
    currentContentNumber,
    currentContentType,
    hash,
    pathname,
    scrollToContent,
    sectionPath,
  ]);

  //  Updates hash on scroll
  const handleScroll = useCallback(() => {
    // console.log(event);
  }, []);

  return handleScroll;
}
