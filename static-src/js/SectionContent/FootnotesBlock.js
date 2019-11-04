import React, { useContext } from 'react';

import Block from './Block';
import useMarginLinks from './useMarginLinks';
import useContentRefs from './useContentRefs';
import { Content, Footnote } from '../markdown';
import SectionContext from '../SectionContext';

export default function FootnotesBlock() {
  const {
    mainContent: { footnotesByNumber },
    contentRefs: { footnoteRefs },
  } = useContext(SectionContext);

  const marginLinksExtension = useMarginLinks();
  const footnoteRefsExtension = useContentRefs(Footnote, footnoteRefs);
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
