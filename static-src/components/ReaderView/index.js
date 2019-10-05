import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import MobileHeader from '../MobileHeader';
import TabletHeader from '../TabletHeader';
import Sidebar from '../Sidebar';
import TableOfContents from '../TableOfContents';
import useRouting from './useRouting';
import useTransitioningSectionContent from './useTransitioningSectionContent';
import {
  DURATION,
  CONTAINER_PADDING,
  BrowserSizeContext,
  columns,
  atSize,
} from '../../styles';


/*
* This component renders the reader view, which contains the top/side
* navigation bar and the currently-displayed reader view "page".
*/

export default function ReaderView() {
  const browserSize = useContext(BrowserSizeContext);
  const {
    tableOfContentsExpanded,
    sectionSlug,
    redirectTo,
  } = useRouting();

  //  Handles transitioning between section content views.
  const TransitioningSectionContent = useTransitioningSectionContent();

  return (
    <StyledReaderView>

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

      <StyledContentViewport>

        {/* Table of contents */}
        <StyledTableOfContentsContainer expanded={tableOfContentsExpanded}>
          <TableOfContents expanded={tableOfContentsExpanded} />
        </StyledTableOfContentsContainer>

        {/* Section content */}
        <TransitioningSectionContent slug={sectionSlug} />

      </StyledContentViewport>
    </StyledReaderView>
  );
}

const StyledReaderView = styled.div`
  position: relative;
  flex-grow: 1;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  ${CONTAINER_PADDING}
  ${atSize('desktop', `
    flex-direction: row;
  `)}
`;

const StyledHeaderContainer = styled.div`
  margin: 0 calc((100% - 100vw) / 2);
`;

const StyledSidebarContainer = styled.div`
  width: ${columns(4)};
`;

const StyledContentViewport = styled.div`
  position: relative;
  flex-grow: 1;
  background-color: #ddd;
`;

const StyledTableOfContentsContainer = styled.div`
  position: absolute;
  background-color: #ccc;
  transition: width ${DURATION.slide}ms, height ${DURATION.slide}ms, top ${DURATION.slide}ms, right ${DURATION.slide}ms;
  ${({ expanded }) => (expanded ? `
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
  ` : `
    width: 33%;
    height: 200px;
    top: 200px;
    right: 100%;
  `)}
`;
