import React from 'react';
import PropTypes from 'prop-types';
import classNamesBind from 'classnames/bind';

import style from 'styles/Block.module.css';
import LinkedAuthor from '../LinkedAuthor';

const cx = classNamesBind.bind(style);

const Block = React.forwardRef(({
  title,
  author,
  children,
  isToc,
  isMini,
}, ref) => (
  <div ref={ref} className={cx(style.Block, { isToc, isMini })}>
    {title && <div className={style.title}>{title}</div>}
    {author && <LinkedAuthor className={style.author}>{author}</LinkedAuthor>}
    {children && <div className={style.content}>{children}</div>}
  </div>
));

Block.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  children: PropTypes.node,
  isToc: PropTypes.bool,
  isMini: PropTypes.bool,
};

Block.defaultProps = {
  title: null,
  author: null,
  children: null,
  isToc: false,
  isMini: false,
};

export default Block;
