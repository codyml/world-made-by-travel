import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  DURATION,
  CONTAINER_PADDING,
  Z_INDEX,
  StyledFadingOverlay,
} from '../styles';

export default function LoadingMessage({ contentLoaded }) {
  const [textVisible, setTextVisible] = useState(false);
  useEffect(() => setTextVisible(true), []);

  return (
    <StyledLoadingMessage visible={!contentLoaded}>
      <StyledText visible={textVisible}>Loading...</StyledText>
    </StyledLoadingMessage>
  );
}

LoadingMessage.propTypes = {
  contentLoaded: PropTypes.bool.isRequired,
};

const StyledLoadingMessage = styled(StyledFadingOverlay)`
  ${CONTAINER_PADDING}
  z-index: ${Z_INDEX.loading};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  transition-delay: ${DURATION.loadingFadeDelay}ms, ${DURATION.loadingFadeDelay + DURATION.fade}ms;
`;

const StyledText = styled.div`
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity ${DURATION.fade}ms;
  font-size: 3em;
  font-weight: 300;
  color: #aaa;
`;
