import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import useRouting from './useRouting';
import useSectionTransitions from './useSectionTransitions';
import TableOfContents from '../TableOfContents';
import SectionContent from '../SectionContent';
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

  //  Handles transitioning between reader view "pages".
  const SectionTransitionContainer = useSectionTransitions(tableOfContentsExpanded, sectionSlug);

  return (
    <StyledReaderView>
      <StyledContentViewport>

        <StyledTableOfContentsContainer expanded={tableOfContentsExpanded}>
          <TableOfContents expanded={tableOfContentsExpanded} />
        </StyledTableOfContentsContainer>

        <SectionTransitionContainer>
          { (slug) => <SectionContent slug={slug} /> }
        </SectionTransitionContainer>

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
