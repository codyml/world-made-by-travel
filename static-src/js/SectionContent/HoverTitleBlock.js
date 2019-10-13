import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNamesBind from 'classnames/bind';

import style from 'styles/HoverTitleBlock.module.css';
import Block from './Block';
import { EXPANDED_TOC } from '../constants';
import CurrentSectionContext from '../CurrentSectionContext';

const cx = classNamesBind.bind(style);

const HoverTitleBlock = React.forwardRef(({ visible }, ref) => {
  const { title, author, slug } = useContext(CurrentSectionContext);

  return (
    <div ref={ref} className={cx(style.HoverTitleBlock, { visible })}>
      <Block
        title={title}
        author={author}
        isToc={slug === EXPANDED_TOC.slug}
        isMini
      />
    </div>
  );
});

HoverTitleBlock.propTypes = {
  visible: PropTypes.bool,
};

HoverTitleBlock.defaultProps = {
  visible: false,
};

export default HoverTitleBlock;
