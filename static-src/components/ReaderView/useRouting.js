import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import { SET_CURRENT_SECTION, EXPANDED_TOC_PATH } from '../../constants';

/*
* Custom hook that handles URL routing, returning either content
* or a redirect to render in the Reader View main content area.
*/

export default function useRouting() {
  const sectionMetaBySlug = useSelector((state) => state.sectionMetaBySlug);
  const sectionGroupMetaBySlug = useSelector((state) => state.sectionGroupMetaBySlug);
  const currentSectionSlug = useSelector((state) => state.currentSectionSlug);
  const dispatch = useDispatch();

  //  Matches current URL against all of those paths
  const SECTION_PATH = '/:parentSlug?/:slug';
  const ROOT_PATH = '/';
  const match = useRouteMatch([
    EXPANDED_TOC_PATH,
    SECTION_PATH,
    ROOT_PATH,
  ]);

  //  If path is "/" exactly (the cover is visible), keep rendering
  //  the current section or render the expanded Table of Contents
  //  if no current section is set.
  if (match.path === ROOT_PATH && match.isExact) {
    if (currentSectionSlug) {
      return { sectionSlug: currentSectionSlug };
    }

    return { tableOfContentsExpanded: true };
  }

  //  If path matches the expanded Table of Contents, render that.
  if (match.path === EXPANDED_TOC_PATH) {
    return { tableOfContentsExpanded: true };
  }

  //  If path isn't "/" or TOC, attempt to find matching section
  //  or section group, otherwise redirect.
  const { slug } = match.params;

  //  Check if path matches a section.
  const sectionMeta = slug && sectionMetaBySlug[slug];
  if (sectionMeta && match.url === sectionMeta.path) {
    //  If path matches a section other than the current section
    //  in Redux, update the current section in Redux to the matched
    //  section.
    if (slug !== currentSectionSlug) {
      dispatch({ type: SET_CURRENT_SECTION, sectionSlug: slug });
    }

    //  If path matches a section, render the matched section.
    return { sectionSlug: slug };
  }

  //  If path matches a section group, redirect to its redirect path.
  const sectionGroupMeta = slug && sectionGroupMetaBySlug[slug];
  if (sectionGroupMeta) {
    return { redirectTo: sectionGroupMeta.redirectPath };
  }

  //  If path doesn't match anything, redirect to the current section
  //  from Redux, or to the Table of Contents if none is set.
  if (currentSectionSlug) {
    const currentSectionMeta = sectionMetaBySlug[currentSectionSlug];
    return { redirectTo: currentSectionMeta.path };
  }

  return { redirectTo: EXPANDED_TOC_PATH };
}
