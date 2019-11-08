import { useCallback } from 'react';

import style from 'styles/PrintView.module.css';
import { PARAGRAPH_TAG } from '../markdown';
import { MarginParagraphNumber } from '../MarginLinks';


export default function usePrintMarginLinks() {
  return useCallback((
    { component, props, children, refNumber },
    ancestors,
  ) => {
    if (component === PARAGRAPH_TAG && ancestors.length === 1) {
      return {
        props: { ...props, className: style.paragraph },
        children: [
          ...children,
          {
            component: MarginParagraphNumber,
            key: 'paragraphNumber',
            props: { contentNumber: refNumber, className: style.paragraphNumber },
          },
        ],
      };
    }

    return {};
  }, []);
}
