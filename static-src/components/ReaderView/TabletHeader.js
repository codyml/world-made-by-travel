import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classNamesBind from 'classnames/bind';

import TableOfContents from '../TableOfContents';
import Tabbed from '../Tabbed';
import { SET_EXPLORER_OPEN, EXPANDED_TOC } from '../../constants';
import style from '../../styles/TabletHeader.module.css';

const cx = classNamesBind.bind(style);

export default function TabletHeader() {
  const [tocExpanded, setTableOfContentsExpanded] = useState(false);
  const explorerOpen = useSelector((state) => state.explorerOpen);
  const onTableOfContents = useSelector((state) => (
    state.currentSectionSlug === EXPANDED_TOC.slug
  ));

  const {
    backgroundImageUrl,
    coverTitle,
    coverAuthor,
  } = useSelector((state) => state.config);

  const dispatch = useDispatch();
  const toggleExplorerOpen = () => dispatch({
    type: SET_EXPLORER_OPEN,
    explorerOpen: !explorerOpen,
  });

  const toggleTocExpanded = () => {
    setTableOfContentsExpanded(!tocExpanded);
  };

  return (
    <div className={style.TabletHeader}>

      {/* Title panel */}
      <div className={style.titlePanel}>
        <div className={style.titlePanelInner}>
          <Link to="/">
            <div className={style.bookTitle}>{coverTitle}</div>
            <div className={style.bookAuthor}>{coverAuthor}</div>
          </Link>
        </div>
      </div>

      {/* Header background */}
      <div
        className={style.bar}
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >

        {/* Table of Contents dropdown */}
        <div className={cx(style.tocWrapper, { visible: !onTableOfContents })}>
          <div className={cx(style.panel, { tocExpanded })}>
            <Tabbed triangleClassName={style.triangle} isExpanded={tocExpanded}>
              <div className={style.tocButton} onClick={toggleTocExpanded}>
                Table of Contents
              </div>
              <div className={cx(style.tocDropdown, { tocExpanded })}>
                <TableOfContents minimized onLinkClick={toggleTocExpanded} />
              </div>
            </Tabbed>
          </div>
        </div>

        {/* Explorer button */}
        <div className={style.explorerButton} onClick={toggleExplorerOpen}>
          {explorerOpen ? 'Close Explorer' : 'Open Explorer'}
        </div>

      </div>
    </div>
  );
}
