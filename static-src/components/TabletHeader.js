import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import TableOfContents from './TableOfContents';
import {
  StyledBookTitle,
  StyledPanel,
  CONTAINER_PADDING,
  StyledBookAuthor,
  THEME_COLORS,
  Triangle,
  DURATION,
} from '../styles';
import { SET_EXPLORER_OPEN } from '../constants';

export default function TabletHeader() {
  const [tableOfContentsExpanded, setTableOfContentsExpanded] = useState(false);
  const explorerOpen = useSelector((state) => state.explorerOpen);
  const {
    backgroundImageUrl,
    coverTitle,
    coverAuthor,
  } = useSelector((state) => state.config);

  const dispatch = useDispatch();
  const toggleExplorerOpen = () => dispatch({
    type: SET_EXPLORER_OPEN,
    explorerOpen: !explorerOpen,
  });

  const toggleTableOfContentsExpanded = () => {
    setTableOfContentsExpanded(!tableOfContentsExpanded);
  };


  return (
    <StyledTabletHeader>
      <StyledTabletHeaderBackground backgroundImageUrl={backgroundImageUrl} />
      <StyledTitlePanel as={Link} to="/">
        <StyledTitlePanelInner>
          <StyledBookTitle>{coverTitle}</StyledBookTitle>
          <StyledBookAuthor>{coverAuthor}</StyledBookAuthor>
        </StyledTitlePanelInner>
      </StyledTitlePanel>
      <StyledTableOfContentsButton
        expanded={tableOfContentsExpanded}
        onClick={toggleTableOfContentsExpanded}
      >
        <StyledTrigger>
          Table of Contents
          <StyledTab><StyledTriangle /></StyledTab>
        </StyledTrigger>
        <StyledDropdownContent>
          <TableOfContents />
        </StyledDropdownContent>
      </StyledTableOfContentsButton>
      <StyledExplorerButton onClick={toggleExplorerOpen}>
        {explorerOpen ? 'Close Explorer' : 'Open Explorer'}
      </StyledExplorerButton>
    </StyledTabletHeader>
  );
}

const StyledTableOfContentsButton = styled(StyledPanel)`
  font-size: 1.75em;
  color: ${THEME_COLORS.tableOfContentsHeader};
  width: 10rem;
`;

const StyledExplorerButton = styled(StyledPanel)`
  font-size: 1.25em;
  color: ${THEME_COLORS.explorerButton};
  width: 5rem;
`;

const StyledTabletHeader = styled.div`
  ${CONTAINER_PADDING}
  position: relative;
  height: 12em;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & ${StyledTableOfContentsButton},
  & ${StyledExplorerButton} {
    height: 4.25em;
    margin-bottom: 0.5em;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

const StyledTabletHeaderBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 11em;
  background-image: url(${(props) => props.backgroundImageUrl});
  background-size: cover;
  background-position: center;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.25);
  z-index: -1;
`;

const StyledTitlePanel = styled(StyledPanel)`
  align-self: stretch;
  flex-shrink: 0;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  width: 15rem;
  padding: 1rem;
  font-size: 1.25em;
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  ${StyledBookAuthor} {
    color: ${THEME_COLORS.authorLink};
    font-weight: 400;
    margin-top: 0.25em;
  }
`;

const StyledTitlePanelInner = styled.div`
  border-bottom: 1px solid ${THEME_COLORS.uiHr};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const StyledTrigger = styled.div`
`;

const StyledTab = styled.div`
  position: absolute;
  top: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
  background-color: ${THEME_COLORS.coverPublicationInformationBackground};
  width: 4rem;
  height: 4rem;
  border-radius: 2rem;
  box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.5);
  font-size: 1.5em;
  line-height: 0.7;
  display: flex;
  justify-content: center;
  padding-top: 0.4em;
`;

const StyledTriangle = styled(Triangle)`
  transform: rotate(${({ collapsed }) => (collapsed ? '0deg' : '180deg')});
  transition: transform ${DURATION.slide}ms;
`;

const StyledDropdownContent = styled.div`
  display: none;
`;
