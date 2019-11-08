import React from 'react';
import PropTypes from 'prop-types';
import classNamesBind from 'classnames/bind';

import style from 'styles/MarginLinks.module.css';
import { REFERABLE_CONTENT_TYPES } from '../constants';
import CiteLink from './CiteLink';
import LinkLink from './LinkLink';
import DwldLink from './DwldLink';
import ParaLink from './ParaLink';


const cx = classNamesBind.bind(style);

//  Margin link recipient types
const LINKS_BY_RECIPIENT_TYPE = {
  [REFERABLE_CONTENT_TYPES.section]: [CiteLink, LinkLink, DwldLink],
  [REFERABLE_CONTENT_TYPES.paragraph]: [ParaLink, CiteLink, LinkLink, DwldLink],
  [REFERABLE_CONTENT_TYPES.figure]: [CiteLink, LinkLink, DwldLink],
  [REFERABLE_CONTENT_TYPES.footnote]: [CiteLink, LinkLink],
  [REFERABLE_CONTENT_TYPES.block]: [DwldLink],
};


//  React component that renders the applicable links
export default function MarginLinks({ contentType, children, className, ...props }) {
  return (
    <div className={cx(className, style.MarginLinks, { [contentType]: true })}>
      <div className={style.links}>
        {LINKS_BY_RECIPIENT_TYPE[contentType].map((Component) => (
          <Component key={Component.name} {...{ contentType, ...props }} />
        ))}
      </div>
      {children}
    </div>
  );
}

MarginLinks.propTypes = {
  contentType: PropTypes.oneOf(Object.keys(LINKS_BY_RECIPIENT_TYPE)).isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

MarginLinks.defaultProps = {
  children: null,
  className: null,
};


//  React component that renders just a ParaLink for printing.
export function MarginParagraphNumber({ contentNumber, className }) {
  return (
    <span className={cx(className, style.links)}>
      <ParaLink contentNumber={contentNumber} />
    </span>
  );
}

MarginParagraphNumber.propTypes = {
  contentNumber: PropTypes.number.isRequired,
  className: PropTypes.string,
};

MarginParagraphNumber.defaultProps = {
  className: null,
};
