import React from 'react';
import PropTypes from 'prop-types';
import classNamesBind from 'classnames/bind';

import style from 'styles/MarginLinks.module.css';


const cx = classNamesBind.bind(style);

export default function DwldLink({ downloadLink }) {
  if (!downloadLink) {
    return null;
  }

  return (
    <a
      href={downloadLink}
      download
      className={cx(style.marginLink, style.DwldLink)}
    >
      <span className={style.linkText}>Dwld</span>
    </a>
  );
}

DwldLink.propTypes = {
  downloadLink: PropTypes.string,
};

DwldLink.defaultProps = {
  downloadLink: null,
};
