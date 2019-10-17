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
  figureNumber,
  figureContentIdentifier,
  captionNumberRef,
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
          figureNumber,
          figureContentIdentifier,
          captionNumber: captionNumberRef.current,
        },
      });
    }
  };

  return (
    <div
      className={cx(style.FigureContent, { valid })}
      onClick={openModal}
      title="Click to view in fullscreen"
    >
      {children}
    </div>
  );
}

FigureContent.propTypes = {
  valid: PropTypes.bool.isRequired,
  figureNumber: PropTypes.number.isRequired,
  figureContentIdentifier: PropTypes.string.isRequired,
  captionNumberRef: PropTypes.shape({ current: PropTypes.number }).isRequired,
  children: ContentNodesPropType.isRequired,
};
