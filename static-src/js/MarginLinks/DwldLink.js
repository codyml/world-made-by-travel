import React from 'react';
import PropTypes from 'prop-types';
import classNamesBind from 'classnames/bind';

import style from 'styles/MarginLinks.module.css';


const cx = classNamesBind.bind(style);

export default function DwldLink({ downloadUrl }) {
  if (!downloadUrl) {
    return null;
  }

  return (
    <a
      href={downloadUrl}
      download
      className={cx(style.marginLink, style.DwldLink)}
    >
      <span className={style.linkText}>Dwld</span>
    </a>
  );
}

DwldLink.propTypes = {
  downloadUrl: PropTypes.string,
};

DwldLink.defaultProps = {
  downloadUrl: null,
};
