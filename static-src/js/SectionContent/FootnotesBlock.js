import React, { useContext } from 'react';

import Block from './Block';
import { Content } from '../markdown';
import CurrentSectionContext from '../CurrentSectionContext';

export default function FootnotesBlock() {
  const { mainContent: { footnotesByNumber } } = useContext(CurrentSectionContext);
  const footnotes = Object.values(footnotesByNumber);
  footnotes.sort((a, b) => a - b);

  return (
    <Block title="Footnotes">
      <Content nodes={footnotes} />
    </Block>
  );
}
