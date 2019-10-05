import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch, Link } from 'react-router-dom';
import styled from 'styled-components';

import { DURATION, Z_INDEX, CONTAINER_PADDING } from '../styles';
import { EXPANDED_TOC_PATH } from '../constants';

/*
* This component renders the cover of the book, visible when at the
* the root URL.
*/

export default function Cover() {
  const currentSectionPath = useSelector((state) => (
    state.currentSectionSlug
      ? state.sectionMetaBySlug[state.currentSectionSlug].path
      : null
  ));

  const match = useRouteMatch('/');

  return (
    <StyledCover visible={match.isExact}>
      <Link to={currentSectionPath || EXPANDED_TOC_PATH}>Enter</Link>
    </StyledCover>
  );
}

const StyledCover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #dff;
  z-index: ${Z_INDEX.cover};
  visibility: hidden;
  opacity: 0;
  transition: opacity ${DURATION.fade}ms, visibility 0s ${DURATION.fade}ms;
  ${({ visible }) => (visible ? `
    visibility: visible;
    opacity: 1;
    transition: opacity ${DURATION.fade}ms, visibility 0s;
  ` : null)}
  ${CONTAINER_PADDING}
`;
