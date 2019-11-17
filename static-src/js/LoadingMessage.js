import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNamesBind from 'classnames/bind';

import style from 'styles/LoadingMessage.module.css';

const cx = classNamesBind.bind(style);

export default function LoadingMessage({ visible, errorMessage }) {
  const [textVisible, setTextVisible] = useState(false);
  useEffect(() => setTextVisible(true), []);
  const message = errorMessage || 'Loading...';

  return (
    <div className={cx(style.LoadingMessage, { visible })}>
      <div className={cx(style.text, { textVisible })}>
        {message}
      </div>
    </div>
  );
}

LoadingMessage.propTypes = {
  visible: PropTypes.bool,
  errorMessage: PropTypes.string,
};

LoadingMessage.defaultProps = {
  visible: true,
  errorMessage: null,
};
