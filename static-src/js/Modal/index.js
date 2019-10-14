import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNamesBind from 'classnames/bind';

import style from 'styles/Modal.module.css';
import AuthorModalForeground from './AuthorModal';
import { FigureModalBackground, FigureModalForeground } from './FigureModal';
import CitationModalForeground from './CitationModal';
import { SET_MODAL_OPEN, AUTHOR_MODAL, FIGURE_MODAL, CITATION_MODAL } from '../constants';

const cx = classNamesBind.bind(style);

export default function Modal() {
  const visible = useSelector((state) => state.modalOpen);
  const { modalType } = useSelector((state) => state.modalContent);
  const dispatch = useDispatch();

  let modalBackgroundContent = null;
  let modalForegroundContent = null;
  switch (modalType) {
    case AUTHOR_MODAL: {
      modalForegroundContent = <AuthorModalForeground />;
      break;
    }

    case FIGURE_MODAL: {
      modalBackgroundContent = <FigureModalBackground />;
      modalForegroundContent = <FigureModalForeground />;
      break;
    }

    case CITATION_MODAL: {
      modalForegroundContent = <CitationModalForeground />;
      break;
    }

    default:
  }

  const closeModal = () => dispatch({ type: SET_MODAL_OPEN, modalOpen: false });

  return (
    <div className={cx(style.Modal, { visible })}>
      <div className={style.background}>
        <button type="button" onClick={closeModal}>Close Modal</button>
        {modalBackgroundContent}
      </div>
      <div className={style.foreground}>
        {modalForegroundContent}
      </div>
    </div>
  );
}
