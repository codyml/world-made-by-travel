import React, { useContext } from 'react';

import Block from './Block';
import { useMarginLinks } from './MarginLinks';
import useContentRefs from './useContentRefs';
import { Content } from '../markdown';
import CurrentSectionContext from '../CurrentSectionContext';
import { REFERABLE_CONTENT_TYPES } from '../constants';

export default function FootnotesBlock() {
  const { mainContent: { footnotesByNumber } } = useContext(CurrentSectionContext);
  const marginLinksExtension = useMarginLinks();
  const footnoteRefsExtension = useContentRefs(REFERABLE_CONTENT_TYPES.footnote);
  const footnotes = Object.values(footnotesByNumber);
  if (!footnotes.length) {
    return null;
  }

  footnotes.sort((a, b) => a - b);

  return (
    <Block title="Footnotes">
      <Content nodes={footnotes} extensions={[marginLinksExtension, footnoteRefsExtension]} />
    </Block>
  );
}
