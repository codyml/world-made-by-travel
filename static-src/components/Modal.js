import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import AuthorModal from './AuthorModal';
import FigureModal from './FigureModal';
import CitationModal from './CitationModal';

import {
  SET_MODAL_CONTENT,
  AUTHOR_MODAL,
  FIGURE_MODAL,
  CITATION_MODAL,
} from '../constants';

import { DURATIONS, Z_INDICES } from '../styles';

export default function Modal() {
  const modalContent = useSelector((state) => state.modalContent);
  const dispatch = useDispatch();

  const getModalContent = () => {
    if (modalContent) {
      const {
        modalType,
        authorSlug,
        sectionSlug,
        figureIndex,
        paragraphIndex,
      } = modalContent;

      switch (modalType) {
        case AUTHOR_MODAL:
          return <AuthorModal {...{ authorSlug }} />;

        case FIGURE_MODAL:
          return <FigureModal {...{ sectionSlug, figureIndex }} />;

        case CITATION_MODAL:
          return <CitationModal {...{ sectionSlug, figureIndex, paragraphIndex }} />;

        default:
      }
    }

    return null;
  };

  const closeModal = () => dispatch({ type: SET_MODAL_CONTENT, modalType: null });

  return (
    <StyledModal modalOpen={modalContent}>
      {getModalContent()}
      <button type="button" onClick={closeModal}>Close Modal</button>
    </StyledModal>
  );
}

const StyledModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${Z_INDICES.modal};
  background-color: #ffd;
  visibility: hidden;
  opacity: 0;
  transition: opacity ${DURATIONS.fade}ms, visibility 0s ${DURATIONS.fade}ms;
  ${({ modalOpen }) => (modalOpen ? `
    visibility: visible;
    opacity: 1;
    transition: opacity ${DURATIONS.fade}ms, visibility 0s;
  ` : null)}
`;
