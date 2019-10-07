import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import useRouting from './useRouting';
import MobileHeader from '../MobileHeader';
import TabletHeader from '../TabletHeader';
import Sidebar from '../Sidebar';
import TransitioningReaderViewContent from './TransitioningReaderViewContent';
import {
  CONTAINER_PADDING,
  BrowserSizeContext,
  atSize,
  SIDEBAR_WIDTH,
  GUTTER_WIDTH,
} from '../../styles';


/*
* This component renders the reader view, which contains the top/side
* navigation bar and the currently-displayed reader view "page".
*/

export default function ReaderView() {
  const browserSize = useContext(BrowserSizeContext);
  const redirectTo = useRouting();

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

      {/* Section content */}
      <StyledContentViewport>
        <TransitioningReaderViewContent />
      </StyledContentViewport>

    </StyledReaderView>
  );
}

const StyledReaderView = styled.div`
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  ${CONTAINER_PADDING}
  ${atSize.desktop(`
    flex-direction: row;
  `)}
`;

const StyledHeaderContainer = styled.div`
  margin: 0 calc((100% - 100vw) / 2);
`;

const StyledSidebarContainer = styled.div`
  width: ${SIDEBAR_WIDTH}px;
  margin-right: ${GUTTER_WIDTH}px;
`;

const StyledContentViewport = styled.div`
  position: relative;
  flex-grow: 1;
`;
