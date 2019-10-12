import React from 'react';
import PropTypes from 'prop-types';

import Block from './Block';
import { ContentItem, useSpecialLinks } from '../MarkdownContent';

export default function CustomBlock({ title, author, content }) {
  const specialLinksExtension = useSpecialLinks();

  return (
    <Block title={title} author={author}>
      <ContentItem extensions={[specialLinksExtension]}>
        {content.contentItems}
      </ContentItem>
    </Block>
  );
}

CustomBlock.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  content: PropTypes.arrayOf(PropTypes.shape({ tag: PropTypes.string.isRequired })).isRequired,
};

CustomBlock.defaultProps = {
  author: null,
};
