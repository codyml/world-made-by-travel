import React, { useState, useContext, useRef, useEffect } from 'react';

import PropTypes from 'prop-types';
import classNamesBind from 'classnames/bind';

import style from 'styles/MarginLinks.module.css';
import { REFERABLE_CONTENT_TYPES, GET_CONTENT_IDENTIFIER, COPIED_TIMEOUT } from '../constants';
import SectionContext from '../SectionContext';


const cx = classNamesBind.bind(style);

export default function LinkLink({ contentType, contentNumber }) {
  const textAreaRef = useRef();
  const [copied, setCopied] = useState(false);
  const { origin } = window.location;
  const { path: sectionPath } = useContext(SectionContext);
  const hash = GET_CONTENT_IDENTIFIER[contentType]
    ? `#${GET_CONTENT_IDENTIFIER[contentType](contentNumber)}`
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
    <span
      onClick={copyUrl}
      className={cx(style.marginLink, style.LinkLink)}
    >
      <span className={style.linkText}>Link</span>
      <span className={style.linkLinkTooltip}>
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
        <span className={style.linkLinkClickToCopy}>
          {copied ? 'Copied!' : 'Click to copy URL'}
        </span>
      </span>
    </span>
  );
}

LinkLink.propTypes = {
  contentType: PropTypes.oneOf(Object.values(REFERABLE_CONTENT_TYPES)).isRequired,
  contentNumber: PropTypes.number,
};

LinkLink.defaultProps = {
  contentNumber: null,
};
