import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import TableOfContents from '../TableOfContents';
import { SET_EXPLORER_OPEN } from '../../constants';
import styles from '../../styles/TabletHeader.module.css';

const cx = classNames.bind(styles);

export default function TabletHeader() {
  const [tocExpanded, setTableOfContentsExpanded] = useState(false);
  const explorerOpen = useSelector((state) => state.explorerOpen);
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

  const toggleTableOfContentsExpanded = () => {
    setTableOfContentsExpanded(!tocExpanded);
  };

  return (
    <div className={styles.TabletHeader}>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      />
      <Link className={styles.titlePanel} to="/">
        <div className={styles.titlePanelInner}>
          <div className={styles.bookTitle}>{coverTitle}</div>
          <div className={styles.bookAuthor}>{coverAuthor}</div>
        </div>
      </Link>
      <div
        className={cx(styles.tocButton, { tocExpanded })}
        onClick={toggleTableOfContentsExpanded}
      >
        <div>Table of Contents</div>
        <div className={styles.tocDropdown}>
          <TableOfContents />
        </div>
      </div>
      <div className={styles.explorerButton} onClick={toggleExplorerOpen}>
        {explorerOpen ? 'Close Explorer' : 'Open Explorer'}
      </div>
    </div>
  );
}
