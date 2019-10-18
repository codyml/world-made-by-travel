import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import classNamesBind from 'classnames/bind';

import style from 'styles/figures.module.css';
import { SET_MODAL_CONTENT, FIGURE_MODAL } from '../../constants';

const cx = classNamesBind.bind(style);


/*
* React component for an image or Markdown figure content item.
*/

export default function FigureContent({
  figureNumber,
  figureContentIdentifier,
  captionNumberRef,
  children,
}) {
  const dispatch = useDispatch();
  const openModal = () => {
    if (children) {
      dispatch({
        type: SET_MODAL_CONTENT,
        modalContent: {
          modalType: FIGURE_MODAL,
          figureNumber,
          figureContentIdentifier,
          captionNumber: captionNumberRef.current,
        },
      });
    }
  };

  const invalid = !children;
  return (
    <div
      className={cx(style.FigureContent, { invalid })}
      onClick={openModal}
      title="Click to view in fullscreen"
    >
      {invalid ? <strong>Invalid figure content</strong> : children}
    </div>
  );
}

FigureContent.propTypes = {
  figureNumber: PropTypes.number.isRequired,
  figureContentIdentifier: PropTypes.string.isRequired,
  captionNumberRef: PropTypes.shape({ current: PropTypes.number }).isRequired,
  children: PropTypes.node,
};

FigureContent.defaultProps = {
  children: null,
};
