import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import TableOfContents from './TableOfContents';
import { SET_MOBILE_MENU_OPEN } from '../constants';
import styles from '../styles/MobileMenu.module.css';

export default function MobileMenu() {
  const mobileMenuContainerRef = useRef();
  const { coverTitle, coverAuthor } = useSelector((state) => state.config);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    let element = event.target;
    while (element !== mobileMenuContainerRef.current) {
      if (element.tagName === 'A') {
        dispatch({ type: SET_MOBILE_MENU_OPEN, mobileMenuOpen: false });
        return;
      }

      element = element.parentElement;
    }
  };

  return (
    <div className={styles.MobileMenu} ref={mobileMenuContainerRef} onClick={handleClick}>
      <Link className={styles.titleAuthor} to="/">
        <div className={styles.bookTitle}>{coverTitle}</div>
        <div className={styles.bookAuthor}>{coverAuthor}</div>
      </Link>
      <div className={styles.tableOfContents}>
        <TableOfContents />
      </div>
    </div>
  );
}
