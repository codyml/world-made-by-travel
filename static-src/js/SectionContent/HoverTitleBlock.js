import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNamesBind from 'classnames/bind';

import style from 'styles/HoverTitleBlock.module.css';
import Block from './Block';
import { MarginLinks } from './MarginLinks';
import { EXPANDED_TOC, REFERABLE_CONTENT_TYPES } from '../constants';
import CurrentSectionContext from '../CurrentSectionContext';

const cx = classNamesBind.bind(style);

const HoverTitleBlock = React.forwardRef(({ visible }, ref) => {
  const { title, author, slug, download } = useContext(CurrentSectionContext);

  return (
    <div ref={ref} className={cx(style.HoverTitleBlock, { visible })}>
      <MarginLinks
        contentType={REFERABLE_CONTENT_TYPES.section}
        downloadAllowed={!!download}
        hoverTitle
      >
        <Block
          title={title}
          author={author}
          isToc={slug === EXPANDED_TOC.slug}
          isMini
        />
      </MarginLinks>
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
