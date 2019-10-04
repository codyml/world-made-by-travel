import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DURATIONS } from '../styles';

export default function LoadingMessage({ contentLoaded }) {
  return (
    <StyledLoadingMessage contentLoaded={contentLoaded}>
      Loading...
    </StyledLoadingMessage>
  );
}

LoadingMessage.propTypes = {
  contentLoaded: PropTypes.bool.isRequired,
};

const StyledLoadingMessage = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  opacity: 1;
  visibility: visible;
  transition: opacity 0s, visibility 0s;
  ${({ contentLoaded }) => (contentLoaded ? `
    opacity: 0;
    visibility: hidden;
    transition: opacity ${DURATIONS.fade}ms, visibility 0s ${DURATIONS.fade}ms;
  ` : null)}
`;
