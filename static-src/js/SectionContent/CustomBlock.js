import React from 'react';
import PropTypes from 'prop-types';

import Block from './Block';
import { MarginLinks } from './MarginLinks';
import { Content, ContentNodesPropType } from '../markdown';
import { REFERABLE_CONTENT_TYPES } from '../constants';

export default function CustomBlock({ title, author, download, contentNodes }) {
  return (
    <MarginLinks
      contentType={REFERABLE_CONTENT_TYPES.block}
      downloadAllowed={!!download}
    >
      <Block title={title} author={author}>
        <Content nodes={contentNodes} />
      </Block>
    </MarginLinks>
  );
}

CustomBlock.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  download: PropTypes.string,
  contentNodes: ContentNodesPropType.isRequired,
};

CustomBlock.defaultProps = {
  author: null,
  download: null,
};
