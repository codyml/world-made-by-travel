import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { SET_MOBILE_MENU_OPEN } from '../../constants';
import styles from '../../styles/MobileHeader.module.css';

const cx = classNames.bind(styles);

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
      className={styles.MobileHeader}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <Link className={styles.titlePanel} to="/">
        <div className={styles.bookTitle}>{coverTitle}</div>
      </Link>
      <div
        className={cx(styles.menuTrigger, { menuOpen })}
        onClick={toggleMobileMenuOpen}
      />
    </div>
  );
}
