import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNamesBind from 'classnames/bind';

import useModalContent from './useModalContent';
import { SET_MODAL_OPEN } from '../../constants';
import style from '../../styles/Modal.module.css';

const cx = classNamesBind.bind(style);

export default function Modal() {
  const visible = useSelector((state) => state.modalOpen);
  const modalContent = useSelector((state) => state.modalContent);
  const dispatch = useDispatch();

  const [modalBackgroundContent, modalForegroundContent] = useModalContent(modalContent);
  const closeModal = () => dispatch({ type: SET_MODAL_OPEN, modalOpen: false });

  return (
    <div className={cx(style.Modal, { visible })}>
      <div className={style.background}>
        <button type="button" onClick={closeModal}>Close Modal</button>
        { modalBackgroundContent }
      </div>
      <div className={style.foreground}>
        { modalForegroundContent }
      </div>
    </div>
  );
}
