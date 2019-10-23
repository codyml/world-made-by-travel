import React from 'react';
import PropTypes from 'prop-types';

import style from 'styles/figures.module.css';

const Figure = React.forwardRef(({ children }, ref) => (
  <figure ref={ref} className={style.Figure}>
    {children}
  </figure>
));

Figure.displayName = 'Figure';

Figure.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Figure;
