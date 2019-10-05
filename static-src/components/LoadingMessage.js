import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DURATION, CONTAINER_PADDING, Z_INDEX } from '../styles';

export default function LoadingMessage({ contentLoaded }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(true), []);

  return (
    <StyledLoadingMessage hidden={contentLoaded}>
      <StyledText visible={visible}>Loading...</StyledText>
    </StyledLoadingMessage>
  );
}

LoadingMessage.propTypes = {
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
  opacity: ${({ hidden }) => (hidden ? 0 : 1)};
  visibility: ${({ hidden }) => (hidden ? 'hidden' : 'visible')};
  transition: opacity ${DURATION.fade}ms ${DURATION.loadingFadeDelay}ms, visibility 0s ${DURATION.loadingFadeDelay + DURATION.fade}ms;
  ${CONTAINER_PADDING}
`;

const StyledText = styled.div`
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity ${DURATION.fade}ms;
  font-size: 3em;
  color: #aaa;
`;
