import React, { useContext } from 'react';

import Block from './Block';
import { useMarginLinks } from './MarginLinks';
import useContentRefs from './useContentRefs';
import { Content, Footnote } from '../markdown';
import CurrentSectionContext from '../CurrentSectionContext';

export default function FootnotesBlock() {
  const {
    mainContent: { footnotesByNumber },
    contentRefs: { footnoteRefs },
  } = useContext(CurrentSectionContext);

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
