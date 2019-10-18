import { useMemo, useCallback, useContext } from 'react';

import FootnoteLink from './FootnoteLink';
import Footnote from './Footnote';
import CurrentSectionContext from '../../CurrentSectionContext';


export const FOOTNOTE_REF_TAG = 'footnote_ref';
const FOOTNOTE_BLOCK_TAG = 'footnote_block_open';
export const FOOTNOTE_TAG = 'footnote_open';
const FOOTNOTE_ANCHOR_TAG = 'footnote_anchor';

export default function useFootnotes() {
  const currentSectionContext = useContext(CurrentSectionContext);
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

  return useCallback(({ tag, props, refNumber }) => {
    if (!currentSectionContext) {
      return {};
    }

    switch (tag) {
      case FOOTNOTE_REF_TAG: {
        return {
          tag: FootnoteLink,
          props: {
            label: props.label,
            footnoteNumber: footnotesByLabel[props.label].refNumber,
          },
        };
      }

      case FOOTNOTE_BLOCK_TAG: {
        return null;
      }

      case FOOTNOTE_TAG: {
        return {
          tag: Footnote,
          props: {
            label: props.label,
            footnoteNumber: refNumber,
            footnoteLinkNumber: footnoteLinksByLabel[props.label].refNumber,
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
