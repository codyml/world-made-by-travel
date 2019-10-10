import React from 'react';
import PropTypes from 'prop-types';

import MarkdownContent from '../MarkdownContent';
import Block from './Block';

export default function CustomBlock({ title, author, markdown }) {
  return (
    <Block title={title} author={author}>
      <MarkdownContent>
        {markdown}
      </MarkdownContent>
    </Block>
  );
}

CustomBlock.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  markdown: PropTypes.string.isRequired,
};

CustomBlock.defaultProps = {
  author: null,
};
