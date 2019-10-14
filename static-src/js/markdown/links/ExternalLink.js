import React from 'react';
import PropTypes from 'prop-types';
import classNamesBind from 'classnames/bind';

import style from 'styles/Link.module.css';

const cx = classNamesBind.bind(style);

/*
* React element for rendering an external link.
*/

export default function ExternalLink({ href, children }) {
  return (
    <a className={cx(style.Link, style.valid)} href={href}>
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
