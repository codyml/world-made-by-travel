import React from 'react';
import classNamesBind from 'classnames/bind';

import style from 'styles/MarginLinks.module.css';


const cx = classNamesBind.bind(style);

export default function ParaLink() {
  return (
    <div className={cx(style.marginLink, style.ParaLink)}>
      <span className={style.linkText}>Para</span>
      <span className={style.paragraphNumber}>?</span>
    </div>
  );
}
