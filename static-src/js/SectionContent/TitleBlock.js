import React from 'react';
import PropTypes from 'prop-types';

import { EXPANDED_TOC } from '../constants';
import Block from './Block';


const TitleBlock = React.forwardRef(({
  slug,
  title,
  author,
}, ref) => (
  <Block
    ref={ref}
    title={title}
    author={author}
    isToc={slug === EXPANDED_TOC.slug}
  />
));

TitleBlock.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
};

TitleBlock.defaultProps = {
  author: null,
};

export default TitleBlock;
