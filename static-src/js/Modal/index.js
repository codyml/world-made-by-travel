import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNamesBind from 'classnames/bind';

import style from 'styles/Modal.module.css';
import SectionContext from '../SectionContext';
import { useSectionContent } from '../SectionContent';
import AuthorModalForeground from './AuthorModal';
import { FigureModalBackground, FigureModalForeground } from './FigureModal';
import CitationModalForeground from './CitationModal';
import { SET_MODAL_OPEN, AUTHOR_MODAL, FIGURE_MODAL, CITATION_MODAL } from '../constants';

const cx = classNamesBind.bind(style);

export default function Modal() {
  const visible = useSelector((state) => state.modalOpen);
  const { modalType, sectionSlug } = useSelector((state) => state.modalContent);
  const currentSectionSlug = useSelector((state) => state.currentSectionSlug);
  const [, , currentSectionContext] = useSectionContent(sectionSlug);
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

  const closeModal = useCallback(
    () => dispatch({ type: SET_MODAL_OPEN, modalOpen: false }),
    [dispatch],
  );

  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    if (sectionSlug !== currentSectionSlug) {
      closeModal();
    }
  }, [closeModal, currentSectionSlug, sectionSlug]);

  return (
    <SectionContext.Provider value={currentSectionContext}>
      <div className={cx(style.Modal, { visible })}>
        <div className={style.background} onClick={handleBackgroundClick}>
          <div className={style.closeButton} onClick={closeModal} />
          {modalBackgroundContent}
        </div>
        <div className={style.foreground}>
          {modalForegroundContent}
        </div>
      </div>
    </SectionContext.Provider>
  );
}
