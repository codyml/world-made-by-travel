import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames/bind';

import useRouting from './useRouting';
import MobileHeader from './MobileHeader';
import TabletHeader from './TabletHeader';
import Sidebar from './Sidebar';
import TransitioningReaderViewContent from './TransitioningReaderViewContent';
import { SET_MOBILE_MENU_OPEN } from '../../constants';
import styles from '../../styles/ReaderView.module.css';

const cx = classNames.bind(styles);


/*
* This component renders the reader view, which contains the top/side
* navigation bar and the currently-displayed reader view "page".
*/

export default function ReaderView() {
  const browserSize = useSelector((state) => state.browserSize);
  const mobileMenuOpen = useSelector((state) => state.mobileMenuOpen);
  const redirectTo = useRouting();

  const dispatch = useDispatch();
  const closeMobileMenu = () => dispatch({ type: SET_MOBILE_MENU_OPEN, mobileMenuOpen: false });

  return (
    <div
      className={cx(styles.ReaderView, { mobileMenuOpen })}
      onClick={mobileMenuOpen ? closeMobileMenu : null}
    >

      {/* Redirect */}
      {redirectTo ? <Redirect to={redirectTo} /> : null}

      {/* Mobile header */}
      { browserSize === 'mobile' ? (
        <div className={styles.header}>
          <MobileHeader />
        </div>
      ) : null }

      {/* Tablet header */}
      { browserSize === 'tablet' ? (
        <div className={styles.header}>
          <TabletHeader />
        </div>
      ) : null }

      {/* Desktop sidebar */}
      { browserSize === 'desktop' ? (
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
      ) : null }

      {/* Section content */}
      <div className={styles.content}>
        <TransitioningReaderViewContent />
      </div>

    </div>
  );
}
