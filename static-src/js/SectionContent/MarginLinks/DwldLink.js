import React from 'react';
import classNamesBind from 'classnames/bind';

import style from 'styles/MarginLinks.module.css';


const cx = classNamesBind.bind(style);

export default function DwldLink() {
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
