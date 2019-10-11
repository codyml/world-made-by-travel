import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNamesBind from 'classnames/bind';

import style from 'styles/LoadingMessage.module.css';

const cx = classNamesBind.bind(style);

export default function LoadingMessage({ visible }) {
  const [textVisible, setTextVisible] = useState(false);
  useEffect(() => setTextVisible(true), []);

  return (
    <div className={cx(style.LoadingMessage, { visible })}>
      <div className={cx(style.text, { textVisible })}>
        Loading...
      </div>
    </div>
  );
}

LoadingMessage.propTypes = {
  visible: PropTypes.bool.isRequired,
};
