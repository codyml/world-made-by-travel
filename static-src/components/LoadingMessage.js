import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DURATION, CONTAINER_PADDING, Z_INDEX } from '../styles';

export default function LoadingMessage({ fontsLoaded, contentLoaded }) {
  return (
    <StyledLoadingMessage contentLoaded={contentLoaded}>
      <StyledText fontsLoaded={fontsLoaded}>Loading...</StyledText>
    </StyledLoadingMessage>
  );
}

LoadingMessage.propTypes = {
  fontsLoaded: PropTypes.bool.isRequired,
  contentLoaded: PropTypes.bool.isRequired,
};

const StyledLoadingMessage = styled.div`
  position: absolute;
  z-index: ${Z_INDEX.loading};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  opacity: ${({ contentLoaded }) => (contentLoaded ? 0 : 1)};
  visibility: ${({ contentLoaded }) => (contentLoaded ? 'hidden' : 'visible')};
  transition: opacity ${DURATION.fade}ms ${DURATION.loadingFadeDelay}ms, visibility 0s ${DURATION.loadingFadeDelay + DURATION.fade}ms;
  ${CONTAINER_PADDING}
`;

const StyledText = styled.div`
  opacity: ${({ fontsLoaded }) => (fontsLoaded ? 1 : 0)};
  transition: opacity ${DURATION.fade}ms;
  font-size: 3em;
  color: #aaa;
`;
