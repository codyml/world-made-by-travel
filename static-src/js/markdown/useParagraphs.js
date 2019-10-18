import { useCallback } from 'react';

import { CONTENT_TYPE_HASH, REFERABLE_CONTENT_TYPES } from '../constants';


const PARAGRAPH_TAG = 'p';

export default function useHTML() {
  return useCallback(({ tag, refNumber }, ancestors) => {
    if (tag === PARAGRAPH_TAG && ancestors.length === 1) {
      const hash = CONTENT_TYPE_HASH[REFERABLE_CONTENT_TYPES.paragraph].generate(refNumber);
      return {
        props: { id: hash },
      };
    }

    return {};
  }, []);
}
