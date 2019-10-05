import React from 'react';
import PropTypes from 'prop-types';

export default function TableOfContents({ expanded }) {
  return (
    <div>
      Table of Contents:
      { expanded }
    </div>
  );
}

TableOfContents.propTypes = {
  expanded: PropTypes.bool,
};

TableOfContents.defaultProps = {
  expanded: false,
};
