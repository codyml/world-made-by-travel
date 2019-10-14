import React, { useContext } from 'react';

import Block from './Block';
import { ContentNode, useLinks, useFigures } from '../markdown';
import CurrentSectionContext from '../CurrentSectionContext';

export default function MainContentBlock() {
  const {
    mainContent: { contentNodes },
    figureContentByIdentifier,
  } = useContext(CurrentSectionContext);

  const figuresExtension = useFigures(figureContentByIdentifier);
  const linksExtension = useLinks();

  return (
    <Block>
      <ContentNode extensions={[figuresExtension, linksExtension]}>
        {contentNodes}
      </ContentNode>
    </Block>
  );
}
