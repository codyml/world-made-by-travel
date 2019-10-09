import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classNamesBind from 'classnames/bind';

import { SET_EXPLORER_OPEN, EXPANDED_TOC } from '../../constants';
import TableOfContents from '../TableOfContents';
import MarkdownContent from '../MarkdownContent';
import style from '../../styles/DesktopSidebar.module.css';

const cx = classNamesBind.bind(style);

export default function DesktopSidebar() {
  const explorerOpen = useSelector((state) => state.explorerOpen);
  const {
    backgroundImageUrl,
    coverTitle,
    coverAuthor,
    instructionsMarkdown,
  } = useSelector((state) => state.config);

  const onTableOfContents = useSelector((state) => (
    state.currentSectionSlug === EXPANDED_TOC.slug
  ));

  const dispatch = useDispatch();
  const toggleExplorerOpen = () => dispatch({
    type: SET_EXPLORER_OPEN,
    explorerOpen: !explorerOpen,
  });

  return (
    <div
      className={style.DesktopSidebar}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >

      {/* Title panel */}
      <div className={style.titlePanel}>
        <div className={style.titleAuthor}>
          <Link to="/">
            <div className={style.bookTitle}>{coverTitle}</div>
            <div className={style.bookAuthor}>{coverAuthor}</div>
          </Link>
        </div>
        <div className={cx(style.panelInner, { collapsed: !onTableOfContents })}>
          <MarkdownContent>{instructionsMarkdown}</MarkdownContent>
        </div>
      </div>

      {/* Table of Contents panel */}
      <div className={cx(style.tocPanel, { visible: !onTableOfContents })}>
        <div
          className={cx(style.tocTitle, { explorerOpen })}
          onClick={explorerOpen ? toggleExplorerOpen : null}
        >
          Table of Contents
        </div>
        <div className={cx(style.panelInner, { collapsed: explorerOpen })}>
          <TableOfContents className={style.toc} minimized />
        </div>
      </div>

      {/* Explorer tab */}
      <div className={style.explorerTab}>
        <div
          className={cx(style.explorerButton, { expanded: explorerOpen })}
          onClick={toggleExplorerOpen}
        >
          Explorer
        </div>
      </div>

    </div>
  );
}
