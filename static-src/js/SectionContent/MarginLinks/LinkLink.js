import React, { useState, useContext, useRef, useEffect } from 'react';

import PropTypes from 'prop-types';
import classNamesBind from 'classnames/bind';

import style from 'styles/MarginLinks.module.css';
import { REFERABLE_CONTENT_TYPES, CONTENT_TYPE_HASH } from '../../constants';
import SectionContext from '../../SectionContext';


const COPIED_TIMEOUT = 5000;
const cx = classNamesBind.bind(style);

export default function LinkLink({ contentType, contentNumber }) {
  const textAreaRef = useRef();
  const [copied, setCopied] = useState(false);
  const { origin } = window.location;
  const { path: sectionPath } = useContext(SectionContext);
  const hash = CONTENT_TYPE_HASH[contentType]
    ? `#${CONTENT_TYPE_HASH[contentType].generate(contentNumber)}`
    : '';

  const url = [
    origin,
    sectionPath,
    hash,
  ].join('');

  const copyUrl = () => {
    textAreaRef.current.select();
    document.execCommand('copy');
    setCopied(true);
  };

  const copiedTimeoutId = useRef();
  useEffect(() => {
    if (copied) {
      copiedTimeoutId.current = setTimeout(() => setCopied(false), COPIED_TIMEOUT);
    }

    return () => clearTimeout(copiedTimeoutId.current);
  }, [copied]);

  return (
    <div
      onClick={copyUrl}
      className={cx(style.marginLink, style.LinkLink)}
    >
      <span className={style.linkText}>Link</span>
      <div className={style.linkLinkTooltip}>
        <textarea
          className={style.linkLinkHiddenTextArea}
          ref={textAreaRef}
          value={url}
          readOnly
        />
        <a href={url} className={style.linkLinkUrl}>
          {origin}
          {sectionPath}
          <strong>{hash}</strong>
        </a>
        <div className={style.linkLinkClickToCopy}>
          {copied ? 'Copied!' : 'Click to copy URL'}
        </div>
      </div>
    </div>
  );
}

LinkLink.propTypes = {
  contentType: PropTypes.oneOf(Object.values(REFERABLE_CONTENT_TYPES)).isRequired,
  contentNumber: PropTypes.number,
};

LinkLink.defaultProps = {
  contentNumber: null,
};
