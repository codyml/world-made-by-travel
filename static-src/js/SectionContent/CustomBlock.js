import React from 'react';
import PropTypes from 'prop-types';

import Block from './Block';
import { ContentItem } from '../markdown';

export default function CustomBlock({ title, author, content }) {
  return (
    <Block title={title} author={author}>
      <ContentItem>
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
