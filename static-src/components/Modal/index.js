import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';

import useModalContent from './useModalContent';
import { SET_MODAL_OPEN } from '../../constants';
import styles from '../../styles/Modal.module.css';

const cx = classNames.bind(styles);

export default function Modal() {
  const visible = useSelector((state) => state.modalOpen);
  const modalContent = useSelector((state) => state.modalContent);
  const dispatch = useDispatch();

  const [modalBackgroundContent, modalForegroundContent] = useModalContent(modalContent);
  const closeModal = () => dispatch({ type: SET_MODAL_OPEN, modalOpen: false });

  return (
    <div className={cx(styles.Modal, { visible })}>
      <div className={styles.background}>
        <button type="button" onClick={closeModal}>Close Modal</button>
        { modalBackgroundContent }
      </div>
      <div className={styles.foreground}>
        { modalForegroundContent }
      </div>
    </div>
  );
}
