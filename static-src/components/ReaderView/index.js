import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classNamesBind from 'classnames/bind';

import useRouting from './useRouting';
import MobileHeader from './MobileHeader';
import TabletHeader from './TabletHeader';
import DesktopSidebar from './DesktopSidebar';
import PageContainer from './PageContainer';
import { SET_MOBILE_MENU_OPEN } from '../../constants';
import style from '../../styles/ReaderView.module.css';

const cx = classNamesBind.bind(style);


/*
* This component renders the reader view, which contains the top/side
* navigation bar and the currently-displayed reader view "page".
*/

export default function ReaderView() {
  const browserSize = useSelector((state) => state.browserSize);
  const mobileMenuOpen = useSelector((state) => state.mobileMenuOpen);
  const explorerOpen = useSelector((state) => state.explorerOpen);
  const redirectTo = useRouting();

  const dispatch = useDispatch();
  const closeMobileMenu = () => dispatch({ type: SET_MOBILE_MENU_OPEN, mobileMenuOpen: false });

  return (
    <div
      className={cx(style.ReaderView, { mobileMenuOpen, explorerOpen })}
      onClick={mobileMenuOpen ? closeMobileMenu : null}
    >

      {/* Redirect */}
      {redirectTo ? <Redirect to={redirectTo} /> : null}

      {/* Mobile header */}
      { browserSize === 'mobile' ? (
        <div className={style.header}>
          <MobileHeader />
        </div>
      ) : null }

      {/* Tablet header */}
      { browserSize === 'tablet' ? (
        <div className={style.header}>
          <TabletHeader />
        </div>
      ) : null }

      {/* Desktop sidebar */}
      { browserSize === 'desktop' ? (
        <div className={style.sidebar}>
          <DesktopSidebar />
        </div>
      ) : null }

      {/* Section content */}
      <div className={style.content}>
        <PageContainer />
      </div>

    </div>
  );
}
