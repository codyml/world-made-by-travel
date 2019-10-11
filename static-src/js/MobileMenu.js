import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import TableOfContents from './TableOfContents';
import { SET_MOBILE_MENU_OPEN } from './constants';
import style from '../styles/MobileMenu.module.css';

export default function MobileMenu() {
  const { coverTitle, coverAuthor } = useSelector((state) => state.config);
  const dispatch = useDispatch();
  const closeMobileMenu = () => (
    dispatch({ type: SET_MOBILE_MENU_OPEN, mobileMenuOpen: false })
  );

  return (
    <div className={style.MobileMenu}>
      <Link className={style.titleAuthor} to="/" onClick={closeMobileMenu}>
        <div className={style.bookTitle}>{coverTitle}</div>
        <div className={style.bookAuthor}>{coverAuthor}</div>
      </Link>
      <TableOfContents
        className={style.tableOfContents}
        onLinkClick={closeMobileMenu}
        minimized
        white
      />
    </div>
  );
}
