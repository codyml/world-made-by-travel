import React from 'react';
import PropTypes from 'prop-types';
import classNamesBind from 'classnames/bind';

import style from '../styles/Tabbed.module.css';

const cx = classNamesBind.bind(style);


/*
* Adds a pull tab to the relatively-positioned block element with
* a set background color that it's rendered inside of.
*/

const Tabbed = ({
  tabSide,
  isExpanded,
  triangleClassName,
  children,
}) => (
  <>
    {children}
    <div className={style.overlay} />
    <div className={cx(style.tab, { [tabSide]: true })} />
    <div className={cx(triangleClassName, style.triangle, { [tabSide]: true, isExpanded })}>▴</div>
  </>
);

Tabbed.propTypes = {
  tabSide: PropTypes.oneOf(['top', 'bottom']),
  isExpanded: PropTypes.bool,
  triangleClassName: PropTypes.string,
  children: PropTypes.node,
};

Tabbed.defaultProps = {
  tabSide: 'bottom',
  isExpanded: false,
  triangleClassName: '',
  children: null,
};

export default Tabbed;
