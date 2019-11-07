import React from 'react';
import PropTypes from 'prop-types';
import classNamesBind from 'classnames/bind';

import style from 'styles/Overlay.module.css';


const cx = classNamesBind.bind(style);

export default function Overlay({ visible, className, ...props }) {
  return (
    <div className={cx(className, style.Overlay, { visible })} {...props} />
  );
}

Overlay.propTypes = {
  visible: PropTypes.bool,
  className: PropTypes.string,
};

Overlay.defaultProps = {
  visible: false,
  className: null,
};
