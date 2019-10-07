import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import useRouting from './useRouting';
import MobileHeader from '../MobileHeader';
import TabletHeader from '../TabletHeader';
import Sidebar from '../Sidebar';
import TransitioningReaderViewContent from './TransitioningReaderViewContent';
import {
  CONTAINER_PADDING,
  atSize,
  SIDEBAR_WIDTH,
  GUTTER_WIDTH,
  DURATION,
  Z_INDEX,
} from '../../styles';
import { SET_MOBILE_MENU_OPEN } from '../../constants';


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
    <StyledReaderView
      mobileMenuOpen={mobileMenuOpen}
      onClick={mobileMenuOpen ? closeMobileMenu : null}
    >

      {/* Redirect */}
      {redirectTo ? <Redirect to={redirectTo} /> : null}

      {/* Mobile header */}
      { browserSize === 'mobile' ? (
        <StyledHeaderContainer>
          <MobileHeader />
        </StyledHeaderContainer>
      ) : null }

      {/* Tablet header */}
      { browserSize === 'tablet' ? (
        <StyledHeaderContainer>
          <TabletHeader />
        </StyledHeaderContainer>
      ) : null }

      {/* Desktop sidebar */}
      { browserSize === 'desktop' ? (
        <StyledSidebarContainer>
          <Sidebar />
        </StyledSidebarContainer>
      ) : null }

      {/* Section content */}
      <StyledContentViewport>
        <TransitioningReaderViewContent />
      </StyledContentViewport>

    </StyledReaderView>
  );
}

const StyledReaderView = styled.div`
  ${CONTAINER_PADDING}
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  right: ${(p) => (p.mobileMenuOpen ? 'calc(100% - 6em)' : 0)};
  transition: right ${DURATION.slide}ms;
  z-index: ${Z_INDEX.readerView};
  background-color: white;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    z-index: 1;
    cursor: pointer;
    opacity: ${(p) => (p.mobileMenuOpen ? 0.5 : 0)};
    visibility: ${(p) => (p.mobileMenuOpen ? 'visible' : 'hidden')};
    transition: opacity ${DURATION.fade}ms, visibility 0s ${(p) => (p.mobileMenuOpen ? 0 : DURATION.fade)}ms;
  }

  ${atSize.desktop(`
    flex-direction: row;
  `)}
`;

const StyledHeaderContainer = styled.div`
  margin: 0 calc((100% - 100vw) / 2);
  z-index: 1;
`;

const StyledSidebarContainer = styled.div`
  width: ${SIDEBAR_WIDTH}px;
  margin-right: ${GUTTER_WIDTH}px;
`;

const StyledContentViewport = styled.div`
  position: relative;
  flex-grow: 1;
`;
