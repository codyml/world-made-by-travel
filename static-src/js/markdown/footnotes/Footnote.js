import React from 'react';
import PropTypes from 'prop-types';

import style from 'styles/footnotes.module.css';
import { CONTENT_TYPE_HASH, REFERABLE_CONTENT_TYPES } from '../../constants';


export default function Footnote({ label, footnoteNumber, footnoteLinkNumber, children }) {
  const hash = CONTENT_TYPE_HASH[REFERABLE_CONTENT_TYPES.footnote].generate(footnoteNumber);
  const scrollToLink = () => {
    console.log(`Scrolling to footnote link ${footnoteLinkNumber}`);
  };

  return (
    <div className={style.Footnote} id={hash}>
      <a
        href="#???"
        onClick={scrollToLink}
        className={style.returnLink}
      >
        {label}
      </a>
      {children}
    </div>
  );
}

Footnote.propTypes = {
  label: PropTypes.string.isRequired,
  footnoteNumber: PropTypes.number.isRequired,
  footnoteLinkNumber: PropTypes.number.isRequired,
  children: PropTypes.node,
};

Footnote.defaultProps = {
  children: null,
};
