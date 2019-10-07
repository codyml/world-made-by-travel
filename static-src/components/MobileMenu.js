import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import TableOfContents from './TableOfContents';
import {
  THEME_COLORS,
  StyledBookTitle,
  StyledBookAuthor,
  Z_INDEX,
} from '../styles';
import { SET_MOBILE_MENU_OPEN } from '../constants';

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
    <StyledMobileMenu ref={mobileMenuContainerRef} onClick={handleClick}>
      <StyledTitleAuthor to="/">
        <StyledBookTitle>{coverTitle}</StyledBookTitle>
        <StyledBookAuthor>{coverAuthor}</StyledBookAuthor>
      </StyledTitleAuthor>
      <StyledTableOfContents>
        <TableOfContents />
      </StyledTableOfContents>
    </StyledMobileMenu>
  );
}

const StyledMobileMenu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: calc(100% - 6em);
  height: 100%;
  background-color: ${THEME_COLORS.mobileMenuBackground};
  color: white;
  padding: 0 1.5em;
  display: flex;
  flex-direction: column;
  z-index: ${Z_INDEX.mobileMenu};
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5) inset;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.75);
`;

const StyledTitleAuthor = styled(Link)`
  height: 6em;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 1.5em;
  flex-shrink: 0;

  ${StyledBookTitle} {
    color: white;
    font-size: 1.65em;
    margin-bottom: 0.25em;
  }

  ${StyledBookAuthor} {
    font-size: 1.1em;
  }
`;

const StyledTableOfContents = styled.div`
  overflow-y: scroll;
  padding-bottom: 1.5em;
`;
