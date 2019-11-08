import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNamesBind from 'classnames/bind';

import style from 'styles/HoverTitleBlock.module.css';
import marginLinksStyle from 'styles/MarginLinks.module.css';
import Block from './Block';
import MarginLinks from '../MarginLinks';
import { REFERABLE_CONTENT_TYPES } from '../constants';
import SectionContext from '../SectionContext';

const cx = classNamesBind.bind(style);

export default function HoverTitleBlock({ visible }) {
  const {
    numeral,
    title,
    author,
    isToc,
    downloadUrl,
    contentRefs: { hoverTitleRef },
  } = useContext(SectionContext);

  return (
    <div ref={hoverTitleRef} className={cx(style.HoverTitleBlock, { visible })}>
      <MarginLinks
        contentType={REFERABLE_CONTENT_TYPES.section}
        downloadUrl={downloadUrl}
        className={marginLinksStyle.hoverTitle}
      >
        <Block
          title={`${numeral ? `${numeral}. ` : ''}${title}`}
          author={author}
          isToc={isToc}
          isMini
        />
      </MarginLinks>
    </div>
  );
}

HoverTitleBlock.propTypes = {
  visible: PropTypes.bool,
};

HoverTitleBlock.defaultProps = {
  visible: false,
};
