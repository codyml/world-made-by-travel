import React, { useCallback } from 'react';

import { REFERABLE_CONTENT_TYPES } from '../constants';
import { PARAGRAPH_TAG, Figure, FootnoteLink, Footnote } from '../markdown';

const referableComponentsByContentType = {
  [REFERABLE_CONTENT_TYPES.paragraph]: PARAGRAPH_TAG,
  [REFERABLE_CONTENT_TYPES.figure]: Figure,
  [REFERABLE_CONTENT_TYPES.footnoteLink]: FootnoteLink,
  [REFERABLE_CONTENT_TYPES.footnote]: Footnote,
};

/*
* Custom hook that creates refs and attaches them to content components.
*/

export default function useContentRefs(contentRefs, contentType) {
  const component = referableComponentsByContentType[contentType];
  return useCallback((item) => {
    if (item.component === component) {
      const ref = React.createRef();
      contentRefs.current[item.refNumber] = ref; // eslint-disable-line no-param-reassign
      return {
        props: { ...item.props, ref },
      };
    }

    return {};
  }, [component, contentRefs]);
}
