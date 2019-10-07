import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import {
  SET_CURRENT_SECTION,
  EXPANDED_TOC,
} from '../../constants';

/*
* Custom hook that handles URL routing, returning a redirec to render
* if indicated.
*/

export default function useRouting() {
  const sectionMetaBySlug = useSelector((state) => ({
    [EXPANDED_TOC.slug]: EXPANDED_TOC,
    ...state.sectionMetaBySlug,
  }));

  const sectionGroupMetaBySlug = useSelector((state) => state.sectionGroupMetaBySlug);
  const currentSectionSlug = useSelector((state) => state.currentSectionSlug);
  const dispatch = useDispatch();

  //  Matches current URL against all of those paths
  const SLUG_PATH = '/:parentSlug?/:slug';
  const ROOT_PATH = '/';
  const match = useRouteMatch([
    SLUG_PATH,
    ROOT_PATH,
  ]);

  //  If path matches a section other than the current section
  //  in Redux, update the current section in Redux to the matched
  //  section.
  const sectionMeta = sectionMetaBySlug[match.params.slug];
  useEffect(() => {
    if (sectionMeta && match.url === sectionMeta.path) {
      if (sectionMeta.slug !== currentSectionSlug) {
        dispatch({ type: SET_CURRENT_SECTION, sectionSlug: sectionMeta.slug });
      }
    }
  }, [currentSectionSlug, dispatch, match.url, sectionMeta]);

  //  If path matches the cover or a section, no redirect.
  if (
    (match.path === ROOT_PATH && match.isExact)
    || (sectionMeta && match.url === sectionMeta.path)
  ) {
    return null;
  }

  //  If path matches a section group, redirect to its redirect path.
  const sectionGroupMeta = sectionGroupMetaBySlug[match.params.slug];
  if (sectionGroupMeta) {
    return sectionGroupMeta.redirectPath;
  }

  //  If path doesn't match anything, redirect to the current section
  //  from Redux.
  return sectionMetaBySlug[currentSectionSlug].path;
}
