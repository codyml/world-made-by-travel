import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classNamesBind from 'classnames/bind';

import { SET_MOBILE_MENU_OPEN } from '../../constants';
import style from '../../styles/MobileHeader.module.css';

const cx = classNamesBind.bind(style);

export default function MobileHeader() {
  const menuOpen = useSelector((state) => state.mobileMenuOpen);
  const {
    backgroundImageUrl,
    coverTitle,
  } = useSelector((state) => state.config);

  const dispatch = useDispatch();
  const toggleMobileMenuOpen = (event) => {
    event.stopPropagation();
    dispatch({
      type: SET_MOBILE_MENU_OPEN,
      mobileMenuOpen: !menuOpen,
    });
  };

  return (
    <div
      className={style.MobileHeader}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <Link className={style.titlePanel} to="/">
        <div className={style.bookTitle}>{coverTitle}</div>
      </Link>
      <div
        className={cx(style.menuTrigger, { menuOpen })}
        onClick={toggleMobileMenuOpen}
      />
    </div>
  );
}
