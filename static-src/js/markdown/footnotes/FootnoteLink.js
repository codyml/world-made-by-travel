import React from 'react';
import PropTypes from 'prop-types';

import style from 'styles/footnotes.module.css';
import { CONTENT_TYPE_HASH, REFERABLE_CONTENT_TYPES } from '../../constants';


export default function FootnoteLink({ label, footnoteNumber }) {
  const hash = CONTENT_TYPE_HASH[REFERABLE_CONTENT_TYPES.footnote].generate(footnoteNumber);

  return (
    <a
      href={`#${hash}`}
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
