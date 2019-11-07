import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNamesBind from 'classnames/bind';

import style from 'styles/LoadingMessage.module.css';
import Overlay from './Overlay';

const cx = classNamesBind.bind(style);

export default function LoadingMessage({ visible }) {
  const [textVisible, setTextVisible] = useState(false);
  useEffect(() => setTextVisible(true), []);

  return (
    <Overlay className={style.LoadingMessage} visible={visible}>
      <div className={cx(style.text, { textVisible })}>
        Loading...
      </div>
    </Overlay>
  );
}

LoadingMessage.propTypes = {
  visible: PropTypes.bool.isRequired,
};
