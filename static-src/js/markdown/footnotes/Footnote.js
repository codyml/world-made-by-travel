import React from 'react';
import PropTypes from 'prop-types';

import style from 'styles/footnotes.module.css';


export default function Footnote({ label, footnoteLinkNumber, children }) {
  const scrollToLink = () => {
    console.log(`Scrolling to footnote link ${footnoteLinkNumber}`);
  };

  return (
    <div className={style.Footnote}>
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
  footnoteLinkNumber: PropTypes.number.isRequired,
  children: PropTypes.node,
};

Footnote.defaultProps = {
  children: null,
};
