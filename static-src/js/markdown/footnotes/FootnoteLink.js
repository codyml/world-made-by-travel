import React from 'react';
import PropTypes from 'prop-types';

import style from 'styles/footnotes.module.css';
import { GET_CONTENT_IDENTIFIER, REFERABLE_CONTENT_TYPES } from '../../constants';


const FootnoteLink = React.forwardRef(({ label, footnoteNumber }, ref) => {
  const footnoteId = GET_CONTENT_IDENTIFIER[REFERABLE_CONTENT_TYPES.footnote](footnoteNumber);
  return (
    <a
      ref={ref}
      href={`#${footnoteId}`}
      className={style.FootnoteLink}
    >
      <sup>{label}</sup>
    </a>
  );
});

FootnoteLink.displayName = 'FootnoteLink';

FootnoteLink.propTypes = {
  label: PropTypes.string.isRequired,
  footnoteNumber: PropTypes.number.isRequired,
};

export default FootnoteLink;
