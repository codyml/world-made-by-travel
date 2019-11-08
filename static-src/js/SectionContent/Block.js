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
  print,
  contentClassName,
}, ref) => (
  <div ref={ref} className={cx(style.Block, { isToc, isMini, print })}>
    {title && <div className={style.sectionTitle}>{title}</div>}
    {author && <LinkedAuthor className={style.sectionAuthor}>{author}</LinkedAuthor>}
    {children && <div className={cx(contentClassName, style.content)}>{children}</div>}
  </div>
));

Block.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  children: PropTypes.node,
  isToc: PropTypes.bool,
  isMini: PropTypes.bool,
  print: PropTypes.bool,
  contentClassName: PropTypes.string,
};

Block.defaultProps = {
  title: null,
  author: null,
  children: null,
  isToc: false,
  isMini: false,
  print: false,
  contentClassName: null,
};

Block.displayName = 'Block';

export default Block;
