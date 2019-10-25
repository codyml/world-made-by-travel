import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
  REFERABLE_CONTENT_TYPES,
  CONTENT_TYPE_HASH,
  SET_SECTION_SCROLLED_TO,
} from '../constants';


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


/*
* Custom hook that scrolls to indicated content when the hash changes
* and updates the hash when user scrolls to different content.
*/

export default function useHashScrolling(
  scrollToContent,
  { slug: sectionSlug, path: sectionPath },
) {
  const [
    currentContentType,
    currentContentNumber,
  ] = useSelector((state) => state.scrolledToBySection[sectionSlug] || []);

  const dispatch = useDispatch();
  const { pathname, hash } = useLocation();

  //  Updates redux store based on hash changes
  useEffect(() => {
    if (pathname === sectionPath) {
      const [hashContentType, hashContentNumber] = parseHash(hash);
      if (
        hashContentType !== currentContentType
        || hashContentNumber !== currentContentNumber
      ) {
        scrollToContent(hashContentType, hashContentNumber);
        dispatch({
          type: SET_SECTION_SCROLLED_TO,
          sectionSlug,
          scrolledTo: [hashContentType, hashContentNumber],
        });
      }
    }
  }, [
    currentContentNumber,
    currentContentType,
    dispatch,
    hash,
    pathname,
    scrollToContent,
    sectionPath,
    sectionSlug,
  ]);

  return () => null;
}
