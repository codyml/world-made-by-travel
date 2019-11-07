import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNamesBind from 'classnames/bind';

import style from 'styles/DesktopSidebar.module.css';
import { EXPANDED_TOC } from '../constants';
import TableOfContents from '../TableOfContents';
import { MarkdownContent } from '../markdown';

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

  return (
    <div
      className={style.DesktopSidebar}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >

      {/* Title panel */}
      <div className={cx(style.titlePanel, style.firstPanel)}>
        <div className={style.titleAuthor}>
          <Link to="/">
            <div className={style.bookTitle}>{coverTitle}</div>
            <div className={style.author}>{coverAuthor}</div>
          </Link>
        </div>
        <div className={cx(style.instructions, { collapsed: !onTableOfContents })}>
          <MarkdownContent>{instructionsMarkdown}</MarkdownContent>
        </div>
      </div>

      {/* Table of Contents panel */}
      <div className={cx(style.tocPanel, { visible: !onTableOfContents })}>
        <div className={cx(style.tocTitle, { explorerOpen })}>
          Table of Contents
        </div>
        <div className={cx(style.panelInner, { collapsed: explorerOpen })}>
          <TableOfContents className={style.toc} minimized />
        </div>
      </div>

    </div>
  );
}
