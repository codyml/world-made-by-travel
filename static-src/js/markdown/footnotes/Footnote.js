import React from 'react';
import PropTypes from 'prop-types';

import style from 'styles/footnotes.module.css';
import { CONTENT_TYPE_HASH, REFERABLE_CONTENT_TYPES } from '../../constants';


const Footnote = React.forwardRef(({ label, footnoteLinkNumber, children }, ref) => {
  const footnoteLinkId = (
    CONTENT_TYPE_HASH[REFERABLE_CONTENT_TYPES.footnoteLink].generate(footnoteLinkNumber)
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
