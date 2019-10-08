import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from '../styles/LoadingMessage.module.css';

const cx = classNames.bind(styles);

export default function LoadingMessage({ visible }) {
  const [textVisible, setTextVisible] = useState(false);
  useEffect(() => setTextVisible(true), []);

  return (
    <div className={cx(styles.LoadingMessage, { visible })}>
      <div className={cx(styles.text, { textVisible })}>
        Loading...
      </div>
    </div>
  );
}

LoadingMessage.propTypes = {
  visible: PropTypes.bool.isRequired,
};
