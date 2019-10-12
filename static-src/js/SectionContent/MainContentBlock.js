import React from 'react';

import useSectionContent from './useSectionContent';
import Block from './Block';
import {
  ContentItem,
  useReferences,
  useSpecialLinks,
} from '../MarkdownContent';

export default function MainContentBlock() {
  const [, { mainContent, figureContentByIdentifier }] = useSectionContent();
  const referencesExtension = useReferences(figureContentByIdentifier);
  const specialLinksExtension = useSpecialLinks();

  return (
    <Block>
      <ContentItem extensions={[referencesExtension, specialLinksExtension]}>
        {mainContent.contentItems}
      </ContentItem>
    </Block>
  );
}
