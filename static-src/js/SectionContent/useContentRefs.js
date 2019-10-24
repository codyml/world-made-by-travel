import React, { useCallback, useContext } from 'react';

import CurrentSectionContext from '../CurrentSectionContext';
import { REFERABLE_CONTENT_TYPES } from '../constants';
import { PARAGRAPH_TAG, Figure, FootnoteLink, Footnote } from '../markdown';

const referableComponentsByContentType = {
  [REFERABLE_CONTENT_TYPES.paragraph]: PARAGRAPH_TAG,
  [REFERABLE_CONTENT_TYPES.figure]: Figure,
  [REFERABLE_CONTENT_TYPES.footnoteLink]: FootnoteLink,
  [REFERABLE_CONTENT_TYPES.footnote]: Footnote,
};


/*
* Custom hook that creates refs, attaches them to content nodes,
* and saves them in a ref container for a certain node type.
*/

export default function useContentRefs(contentType) {
  const { contentRefs } = useContext(CurrentSectionContext);
  const component = referableComponentsByContentType[contentType];
  return useCallback((item) => {
    if (item.component === component) {
      const ref = React.createRef();
      contentRefs[contentType].current[item.refNumber] = ref;
      return {
        props: { ...item.props, ref },
      };
    }

    return {};
  }, [component, contentRefs, contentType]);
}
