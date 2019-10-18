import React from 'react';
import PropTypes from 'prop-types';
import classNamesBind from 'classnames/bind';

import style from 'styles/MarginLinks.module.css';
import CiteLink from './CiteLink';
import LinkLink from './LinkLink';
import DwldLink from './DwldLink';
import ParaLink from './ParaLink';


const cx = classNamesBind.bind(style);

//  Margin link recipient types
export const SECTION = 'SECTION';
export const PARAGRAPH = 'PARAGRAPH';
export const FIGURE = 'FIGURE';
export const FOOTNOTE = 'FOOTNOTE';
export const BLOCK = 'BLOCK';
const LINKS_BY_RECIPIENT_TYPE = {
  [SECTION]: [CiteLink, LinkLink, DwldLink],
  [PARAGRAPH]: [ParaLink, CiteLink, LinkLink, DwldLink],
  [FIGURE]: [CiteLink, LinkLink, DwldLink],
  [FOOTNOTE]: [CiteLink, LinkLink],
  [BLOCK]: [DwldLink],
};


//  React component that renders the applicable links
export default function MarginLinks({ recipientType, insideBlock, children, ...props }) {
  return (
    <div className={cx(style.MarginLinks, { insideBlock })}>
      <div className={style.links}>
        {LINKS_BY_RECIPIENT_TYPE[recipientType].map((Component) => (
          <Component key={Component.name} {...props} />
        ))}
      </div>
      {children}
    </div>
  );
}

MarginLinks.propTypes = {
  recipientType: PropTypes.oneOf(Object.keys(LINKS_BY_RECIPIENT_TYPE)).isRequired,
  insideBlock: PropTypes.bool,
  children: PropTypes.node,
};

MarginLinks.defaultProps = {
  insideBlock: false,
  children: null,
};
