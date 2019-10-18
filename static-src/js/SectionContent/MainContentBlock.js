import React, { useContext } from 'react';

import Block from './Block';
import { Content } from '../markdown';
import CurrentSectionContext from '../CurrentSectionContext';

export default function MainContentBlock() {
  const {
    mainContent: { contentNodes },
  } = useContext(CurrentSectionContext);

  return (
    <Block>
      <Content nodes={contentNodes} />
    </Block>
  );
}
