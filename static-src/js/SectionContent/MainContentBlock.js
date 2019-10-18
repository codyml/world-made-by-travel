import React, { useContext } from 'react';

import Block from './Block';
import { useMarginLinks } from './MarginLinks';
import { Content } from '../markdown';
import CurrentSectionContext from '../CurrentSectionContext';


export default function MainContentBlock() {
  const {
    mainContent: { contentNodes },
  } = useContext(CurrentSectionContext);

  const marginLinksExtension = useMarginLinks();

  return (
    <Block>
      <Content nodes={contentNodes} extensions={[marginLinksExtension]} />
    </Block>
  );
}
