import React from 'react';
import PropTypes from 'prop-types';
import classNamesBind from 'classnames/bind';

import style from 'styles/MarginLinks.module.css';


const cx = classNamesBind.bind(style);

export default function DwldLink({ downloadAllowed }) {
  if (!downloadAllowed) {
    return null;
  }

  const startDownload = () => console.log('downloading');

  return (
    <div
      onClick={startDownload}
      className={cx(style.marginLink, style.DwldLink)}
    >
      <span className={style.linkText}>Dwld</span>
    </div>
  );
}

DwldLink.propTypes = {
  downloadAllowed: PropTypes.bool,
};

DwldLink.defaultProps = {
  downloadAllowed: false,
};
