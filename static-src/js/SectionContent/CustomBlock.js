import React from 'react';
import PropTypes from 'prop-types';

import Block from './Block';

export default function CustomBlock({ title, author, content }) {
  return (
    <Block title={title} author={author}>{JSON.stringify(content)}</Block>
  );
}

CustomBlock.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  content: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

CustomBlock.defaultProps = {
  author: null,
};
