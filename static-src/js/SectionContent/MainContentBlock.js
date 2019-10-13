import React, { useContext } from 'react';

import Block from './Block';
import { ContentItem, useSpecialLinks, useReferences } from '../markdown';
import CurrentSectionContext from '../CurrentSectionContext';

export default function MainContentBlock() {
  const {
    mainContent: { contentItems },
    figureContentByIdentifier,
  } = useContext(CurrentSectionContext);

  const referencesExtension = useReferences(figureContentByIdentifier);
  const specialLinksExtension = useSpecialLinks();

  return (
    <Block>
      <ContentItem extensions={[referencesExtension, specialLinksExtension]}>
        {contentItems}
      </ContentItem>
    </Block>
  );
}
