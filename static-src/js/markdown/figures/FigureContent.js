import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import classNamesBind from 'classnames/bind';

import style from 'styles/Figure.module.css';
import { ContentNodesPropType } from '../ContentNode';
import CurrentSectionContext from '../../CurrentSectionContext';
import { SET_MODAL_CONTENT, FIGURE_MODAL } from '../../constants';

const cx = classNamesBind.bind(style);

/*
* React component for an image or Markdown figure content item.
*/

export default function FigureContent({
  valid,
  captionContentRef,
  children,
}) {
  const { slug: sectionSlug } = useContext(CurrentSectionContext);
  const dispatch = useDispatch();
  const openModal = () => {
    if (valid) {
      dispatch({
        type: SET_MODAL_CONTENT,
        modalContent: {
          modalType: FIGURE_MODAL,
          sectionSlug,
          figureContent: children,
          captionContent: captionContentRef.current,
        },
      });
    }
  };

  return (
    <div
      className={cx(style.FigureContent, { valid })}
      onClick={openModal}
    >
      {children}
    </div>
  );
}

FigureContent.propTypes = {
  valid: PropTypes.bool.isRequired,
  captionContentRef: PropTypes.shape({ current: ContentNodesPropType }).isRequired,
  children: PropTypes.oneOfType([ContentNodesPropType]).isRequired,
};
