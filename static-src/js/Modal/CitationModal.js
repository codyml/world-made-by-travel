import React, { useRef, useState, useEffect } from 'react';

import style from 'styles/CitationModal.module.css';
import useCitation from './useCitation';
import { COPIED_TIMEOUT } from '../constants';


export default function CitationModalForeground() {
  const textAreaRef = useRef();
  const [copied, setCopied] = useState(false);
  const [
    jsxCitation,
    plainTextCitation,
    txtUrl,
    htmlUrl,
    mdUrl,
  ] = useCitation();

  const copyCitation = () => {
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
    <>
      <div className={style.title}>Citation</div>
      <div className={style.citation}>{jsxCitation}</div>
      <div className={style.copyLink} onClick={copyCitation}>
        {copied ? 'Copied!' : 'Click to copy'}
      </div>
      <textarea
        className={style.hiddenTextArea}
        ref={textAreaRef}
        value={plainTextCitation}
        readOnly
      />
      <div className={style.downloadLinks}>
        <span className={style.downloadAs}>Download as:</span>
        <a className={style.downloadLink} href={txtUrl} download="citation.txt">TXT</a>
        <a className={style.downloadLink} href={htmlUrl} download="citation.html">HTML</a>
        <a className={style.downloadLink} href={mdUrl} download="citation.md">Markdown</a>
      </div>
    </>
  );
}
