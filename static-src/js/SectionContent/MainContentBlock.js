import React from 'react';
import PropTypes from 'prop-types';

import Block from './Block';

export default function MainContentBlock({ content }) {
  return (
    <Block>{JSON.stringify(content)}</Block>
  );
}

MainContentBlock.propTypes = {
  content: PropTypes.shape({}).isRequired,
};
