import { useCallback } from 'react';


const HTML_BLOCK_TAG = 'html_block';
const HTML_INLINE_TAG = 'html_inline';

export default function useHTML() {
  return useCallback(({ component, children }) => {
    if (component === HTML_BLOCK_TAG || component === HTML_INLINE_TAG) {
      return {
        component: component === HTML_BLOCK_TAG ? 'div' : 'span',
        props: { dangerouslySetInnerHTML: { __html: children.join(' ') } },
        children: [],
      };
    }

    return {};
  }, []);
}
