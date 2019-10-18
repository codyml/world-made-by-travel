import { useCallback } from 'react';


const HTML_BLOCK_TAG = 'html_block';

export default function useHTML() {
  return useCallback(({ tag, children }) => {
    if (tag === HTML_BLOCK_TAG) {
      return {
        tag: 'div',
        props: { dangerouslySetInnerHTML: { __html: children.join(' ') } },
        children: [],
      };
    }

    return {};
  }, []);
}
