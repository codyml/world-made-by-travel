import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNamesBind from 'classnames/bind';

import style from 'styles/HoverTitleBlock.module.css';
import marginLinksStyle from 'styles/MarginLinks.module.css';
import Block from './Block';
import MarginLinks from '../MarginLinks';
import { EXPANDED_TOC, REFERABLE_CONTENT_TYPES } from '../constants';
import SectionContext from '../SectionContext';

const cx = classNamesBind.bind(style);

export default function HoverTitleBlock({ visible }) {
  const {
    title,
    author,
    slug,
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
          title={title}
          author={author}
          isToc={slug === EXPANDED_TOC.slug}
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
