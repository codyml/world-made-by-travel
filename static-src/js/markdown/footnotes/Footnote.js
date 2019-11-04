import React from 'react';
import PropTypes from 'prop-types';

import style from 'styles/footnotes.module.css';
import { GET_CONTENT_IDENTIFIER, REFERABLE_CONTENT_TYPES } from '../../constants';


const Footnote = React.forwardRef(({ label, footnoteLinkNumber, children }, ref) => {
  const footnoteLinkId = (
    GET_CONTENT_IDENTIFIER[REFERABLE_CONTENT_TYPES.footnoteLink](footnoteLinkNumber)
  );

  return (
    <div ref={ref} className={style.Footnote}>
      <a
        href={`#${footnoteLinkId}`}
        className={style.returnLink}
      >
        {label}
      </a>
      {children}
    </div>
  );
});

Footnote.displayName = 'Footnote';

Footnote.propTypes = {
  label: PropTypes.string.isRequired,
  footnoteLinkNumber: PropTypes.number.isRequired,
  children: PropTypes.node,
};

Footnote.defaultProps = {
  children: null,
};

export default Footnote;
