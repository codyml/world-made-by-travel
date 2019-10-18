import React from 'react';
import PropTypes from 'prop-types';

import style from 'styles/links.module.css';


/*
* React element for rendering an external link.
*/

export default function ExternalLink({ href, children }) {
  return (
    <a className={style.Link} href={href}>
      {children}
      <span className={style.hoverTip}>
        <span>Link to </span>
        <strong>{href}</strong>
      </span>
    </a>
  );
}

ExternalLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
};

ExternalLink.defaultProps = {
  href: '',
  children: null,
};
