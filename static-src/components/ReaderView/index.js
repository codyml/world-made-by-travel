import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import useRouting from './useRouting';
import useTransitioningSectionContent from './useTransitioningSectionContent';
import TableOfContents from '../TableOfContents';
import { DURATIONS } from '../../styles';


/*
* This component renders the reader view, which contains the top/side
* navigation bar and the currently-displayed reader view "page".
*/

export default function ReaderView() {
  const {
    tableOfContentsExpanded,
    sectionSlug,
    redirectTo,
  } = useRouting();

  //  Handles transitioning between section content views.
  const TransitioningSectionContent = useTransitioningSectionContent();

  return (
    <StyledReaderView>
      <StyledContentViewport>

        {/* Table of contents */}
        <StyledTableOfContentsContainer expanded={tableOfContentsExpanded}>
          <TableOfContents expanded={tableOfContentsExpanded} />
        </StyledTableOfContentsContainer>

        {/* Section content */}
        <TransitioningSectionContent slug={sectionSlug} />

        {/* Redirect */}
        { redirectTo ? <Redirect to={redirectTo} /> : null }

      </StyledContentViewport>
    </StyledReaderView>
  );
}

const StyledReaderView = styled.div`
  position: relative;
  flex-grow: 1;
  width: 600px;
  background-color: #eee;
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  overflow: hidden;
`;

const StyledContentViewport = styled.div`
  position: relative;
  width: 75%;
  background-color: #ddd;
`;

const StyledTableOfContentsContainer = styled.div`
  position: absolute;
  background-color: #ccc;
  transition: width ${DURATIONS.slide}ms, height ${DURATIONS.slide}ms, top ${DURATIONS.slide}ms, right ${DURATIONS.slide}ms;
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
