import { useMemo, useCallback, useContext } from 'react';

import FootnoteLink from './FootnoteLink';
import Footnote from './Footnote';
import SectionContext from '../../SectionContext';


export const FOOTNOTE_REF_TAG = 'footnote_ref';
const FOOTNOTE_BLOCK_TAG = 'footnote_block_open';
export const FOOTNOTE_TAG = 'footnote_open';
const FOOTNOTE_ANCHOR_TAG = 'footnote_anchor';

export default function useFootnotes() {
  const currentSectionContext = useContext(SectionContext);
  const footnoteLinksByLabel = useMemo(() => {
    if (currentSectionContext && currentSectionContext.mainContent) {
      const { mainContent: { footnoteLinksByNumber } } = currentSectionContext;
      return Object.assign(
        {},
        ...Object.values(footnoteLinksByNumber).map((footnoteLink) => ({
          [footnoteLink.props.label]: footnoteLink,
        })),
      );
    }

    return null;
  }, [currentSectionContext]);

  const footnotesByLabel = useMemo(() => {
    if (currentSectionContext && currentSectionContext.mainContent) {
      const { mainContent: { footnotesByNumber } } = currentSectionContext;
      return Object.assign(
        {},
        ...Object.values(footnotesByNumber).map((footnote) => ({
          [footnote.props.label]: footnote,
        })),
      );
    }

    return null;
  }, [currentSectionContext]);

  return useCallback(({ component, props, componentRef }) => {
    if (!currentSectionContext) {
      return {};
    }

    switch (component) {
      case FOOTNOTE_REF_TAG: {
        return {
          component: FootnoteLink,
          props: {
            label: props.label,
            footnoteNumber: footnotesByLabel[props.label].refNumber,
            ref: componentRef,
          },
        };
      }

      case FOOTNOTE_BLOCK_TAG: {
        return null;
      }

      case FOOTNOTE_TAG: {
        return {
          component: Footnote,
          props: {
            label: props.label,
            footnoteLinkNumber: footnoteLinksByLabel[props.label].refNumber,
            ref: componentRef,
          },
        };
      }

      case FOOTNOTE_ANCHOR_TAG: {
        return null;
      }

      default:
    }

    return {};
  }, [currentSectionContext, footnoteLinksByLabel, footnotesByLabel]);
}
