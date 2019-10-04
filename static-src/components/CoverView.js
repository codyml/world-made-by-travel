import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch, Link } from 'react-router-dom';
import styled from 'styled-components';

import { DURATIONS, Z_INDICES } from '../styles';
import { EXPANDED_TOC_PATH } from '../constants';

/*
* This component renders the cover of the book, visible when at the
* the root URL.
*/

export default function CoverView() {
  const currentSectionPath = useSelector((state) => (
    state.currentSectionSlug
      ? state.sectionMetaBySlug[state.currentSectionSlug].path
      : null
  ));

  const match = useRouteMatch('/');

  return (
    <StyledCoverView visible={match.isExact}>
      <Link to={currentSectionPath || EXPANDED_TOC_PATH}>Enter</Link>
    </StyledCoverView>
  );
}

const StyledCoverView = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #dff;
  z-index: ${Z_INDICES.cover};
  visibility: hidden;
  opacity: 0;
  transition: opacity ${DURATIONS.fade}ms, visibility 0s ${DURATIONS.fade}ms;
  ${({ visible }) => (visible ? `
    visibility: visible;
    opacity: 1;
    transition: opacity ${DURATIONS.fade}ms, visibility 0s;
  ` : null)}
`;
