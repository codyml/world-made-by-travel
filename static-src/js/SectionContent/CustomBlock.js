import React from 'react';
import PropTypes from 'prop-types';

import Block from './Block';
import { MarginLinks, BLOCK } from './MarginLinks';
import { Content, ContentNodesPropType } from '../markdown';

export default function CustomBlock({ title, author, contentNodes }) {
  return (
    <MarginLinks recipientType={BLOCK}>
      <Block title={title} author={author}>
        <Content nodes={contentNodes} />
      </Block>
    </MarginLinks>
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
