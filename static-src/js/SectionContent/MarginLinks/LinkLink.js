import React, { useState } from 'react';
import classNamesBind from 'classnames/bind';

import style from 'styles/MarginLinks.module.css';


const COPIED_TIMEOUT = 5000;
const cx = classNamesBind.bind(style);

export default function LinkLink() {
  const [copied, setCopied] = useState(false);
  const url = (
    <span>http://localhost:12345....<strong>#lol</strong></span>
  );

  const copyUrl = () => {
    console.log('copying link');
    setCopied(true);
    setTimeout(() => setCopied(false), COPIED_TIMEOUT);
  };

  return (
    <div
      onClick={copyUrl}
      className={cx(style.marginLink, style.LinkLink)}
    >
      <span className={style.linkText}>Link</span>
      <div className={style.linkLinkTooltip}>
        <div className={style.linkLinkUrl}>{url}</div>
        <div className={style.linkLinkClickToCopy}>
          {copied ? 'Copied!' : 'Click to copy URL'}
        </div>
      </div>
    </div>
  );
}
