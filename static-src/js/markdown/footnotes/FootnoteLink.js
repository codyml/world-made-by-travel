import React from 'react';
import PropTypes from 'prop-types';

import style from 'styles/footnotes.module.css';


export default function FootnoteLink({ label, footnoteNumber }) {
  const scrollToFootnote = () => {
    console.log(`scrolling to footnote ${footnoteNumber}`);
  };

  return (
    <a
      href="#???"
      onClick={scrollToFootnote}
      className={style.FootnoteLink}
    >
      <sup>{label}</sup>
    </a>
  );
}

FootnoteLink.propTypes = {
  label: PropTypes.string.isRequired,
  footnoteNumber: PropTypes.number.isRequired,
};
