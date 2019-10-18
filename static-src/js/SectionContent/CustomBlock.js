import React from 'react';
import PropTypes from 'prop-types';

import Block from './Block';
import { Content, ContentNodesPropType } from '../markdown';

export default function CustomBlock({ title, author, contentNodes }) {
  return (
    <Block title={title} author={author}>
      <Content nodes={contentNodes} />
    </Block>
  );
}

CustomBlock.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  contentNodes: ContentNodesPropType.isRequired,
};

CustomBlock.defaultProps = {
  author: null,
};
