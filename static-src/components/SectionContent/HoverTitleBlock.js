import React from 'react';
import PropTypes from 'prop-types';
import classNamesBind from 'classnames/bind';

import style from 'styles/HoverTitleBlock.module.css';
import Block from './Block';
import { EXPANDED_TOC } from '../../constants';

const cx = classNamesBind.bind(style);

const HoverTitleBlock = React.forwardRef(({
  slug, title, author, visible,
}, ref) => (
  <div ref={ref} className={cx(style.HoverTitleBlock, { visible })}>
    <Block
      title={title}
      author={author}
      isToc={slug === EXPANDED_TOC.slug}
      isMini
    />
  </div>
));

HoverTitleBlock.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  visible: PropTypes.bool,
};

HoverTitleBlock.defaultProps = {
  author: null,
  visible: false,
};

export default HoverTitleBlock;
