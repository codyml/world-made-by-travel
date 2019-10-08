import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';

import { SET_EXPLORER_URL } from '../constants';
import styles from '../styles/Explorer.module.css';

const cx = classNames.bind(styles);

export default function Explorer() {
  const explorerOpen = useSelector((state) => state.explorerOpen);
  const explorerUrl = useSelector((state) => state.explorerUrl);
  const dispatch = useDispatch();

  const setExplorerUrl = (url) => dispatch({ type: SET_EXPLORER_URL, explorerUrl: url });

  return (
    <div className={cx(styles.Explorer, { explorerOpen })}>
      <div className={styles.inner}>
        <div>{ explorerOpen ? 'open' : 'closed' }</div>
        <div>{ explorerUrl }</div>
        <button type="button" onClick={() => setExplorerUrl('/#/entries/114')}>Set URL to /#/entries/114</button>
      </div>
    </div>
  );
}
