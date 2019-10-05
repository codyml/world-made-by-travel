import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import useModalContent from './useModalContent';
import { SET_MODAL_OPEN } from '../../constants';
import { DURATION, Z_INDEX } from '../../styles';

export default function Modal() {
  const modalOpen = useSelector((state) => state.modalOpen);
  const modalContent = useSelector((state) => state.modalContent);
  const dispatch = useDispatch();

  const [modalBackgroundContent, modalForegroundContent] = useModalContent(modalContent);
  const closeModal = () => dispatch({ type: SET_MODAL_OPEN, modalOpen: false });

  return (
    <StyledModal modalOpen={modalOpen}>
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

const StyledModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${Z_INDEX.modal};
  flex-direction: column;
  background-color: #ffd;
  visibility: hidden;
  opacity: 0;
  transition: opacity ${DURATION.fade}ms, visibility 0s ${DURATION.fade}ms;
  ${({ modalOpen }) => (modalOpen ? `
    visibility: visible;
    opacity: 1;
    transition: opacity ${DURATION.fade}ms, visibility 0s;
  ` : null)}
`;

const StyledModalBackground = styled.div`
  flex-grow: 1;
`;

const StyledModalForeground = styled.div``;
