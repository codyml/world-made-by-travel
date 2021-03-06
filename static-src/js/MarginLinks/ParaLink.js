import React from 'react';
import PropTypes from 'prop-types';
import classNamesBind from 'classnames/bind';

import style from 'styles/MarginLinks.module.css';


const cx = classNamesBind.bind(style);

export default function ParaLink({ contentNumber }) {
  return (
    <span className={cx(style.marginLink, style.ParaLink)}>
      <span className={style.linkText}>Para</span>
      <span className={style.paragraphNumber}>{contentNumber}</span>
    </span>
  );
}

ParaLink.propTypes = {
  contentNumber: PropTypes.number.isRequired,
};
