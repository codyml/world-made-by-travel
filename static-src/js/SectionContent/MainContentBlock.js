import React, { useContext } from 'react';

import Block from './Block';
import useLinks from './useLinks';
import useFigures from './useFigures';
import { ContentItem } from '../markdown';
import CurrentSectionContext from '../CurrentSectionContext';

export default function MainContentBlock() {
  const {
    mainContent: { contentItems },
    figureContentByIdentifier,
  } = useContext(CurrentSectionContext);

  const figuresExtension = useFigures(figureContentByIdentifier);
  const linksExtension = useLinks();

  return (
    <Block>
      <ContentItem extensions={[figuresExtension, linksExtension]}>
        {contentItems}
      </ContentItem>
    </Block>
  );
}
