import React from 'react';
import PropTypes from 'prop-types';

import useSectionContent from './useSectionContent';
import Block from './Block';
import { ContentItem, useSpecialLinks, useReferences } from '../markdown';

export default function MainContentBlock({ sectionSlug }) {
  const [, { mainContent, figureContentByIdentifier }] = useSectionContent(sectionSlug);
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

MainContentBlock.propTypes = {
  sectionSlug: PropTypes.string.isRequired,
};
