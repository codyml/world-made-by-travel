import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import classNamesBind from 'classnames/bind';

import style from 'styles/MarginLinks.module.css';
import SectionContext from '../SectionContext';
import { SET_MODAL_CONTENT, CITATION_MODAL, REFERABLE_CONTENT_TYPES } from '../constants';


const cx = classNamesBind.bind(style);

export default function CiteLink({ contentType, contentNumber }) {
  const { slug: sectionSlug } = useContext(SectionContext);
  const dispatch = useDispatch();
  const openCitationModal = () => dispatch({
    type: SET_MODAL_CONTENT,
    modalContent: {
      modalType: CITATION_MODAL,
      sectionSlug,
      contentType,
      contentNumber,
    },
  });

  return (
    <div
      onClick={openCitationModal}
      className={cx(style.marginLink, style.CiteLink)}
    >
      <span className={style.linkText}>Cite</span>
    </div>
  );
}

CiteLink.propTypes = {
  contentType: PropTypes.oneOf(Object.values(REFERABLE_CONTENT_TYPES)).isRequired,
  contentNumber: PropTypes.number,
};

CiteLink.defaultProps = {
  contentNumber: null,
};
