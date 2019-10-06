import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import useModalContent from './useModalContent';
import { SET_MODAL_OPEN } from '../../constants';
import { Z_INDEX, CONTAINER_PADDING, StyledFadingOverlay } from '../../styles';

export default function Modal() {
  const modalOpen = useSelector((state) => state.modalOpen);
  const modalContent = useSelector((state) => state.modalContent);
  const dispatch = useDispatch();

  const [modalBackgroundContent, modalForegroundContent] = useModalContent(modalContent);
  const closeModal = () => dispatch({ type: SET_MODAL_OPEN, modalOpen: false });

  return (
    <StyledModal visible={modalOpen}>
      <StyledModalBackground>
        <button type="button" onClick={closeModal}>Close Modal</button>
        { modalBackgroundContent }
      </StyledModalBackground>
      <StyledModalForeground>
        { modalForegroundContent }
      </StyledModalForeground>
    </StyledModal>
  );
}

const StyledModal = styled(StyledFadingOverlay)`
  ${CONTAINER_PADDING}
  z-index: ${Z_INDEX.modal};
  flex-direction: column;
  background-color: #ffd;
`;

const StyledModalBackground = styled.div`
  flex-grow: 1;
`;

const StyledModalForeground = styled.div``;
