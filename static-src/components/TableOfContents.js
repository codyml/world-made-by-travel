import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function TableOfContents({ expanded }) {
  return (
    <div>
      Table of Contents:
      { expanded ? ' expanded' : ' collapsed' }
      <br />
      <Link to="/">Link to /</Link>
      <br />
      <Link to="/toc">Link to /toc</Link>
      <br />
      <Link to="/preface-and-acknowledgments">Link to /preface-and-acknowledgments</Link>
      <br />
      <Link to="/doesnt-exist">Link to /doesntexist</Link>
      <br />
      <Link to="/scholars-essays">Link to /scholars-essays</Link>
      <br />
      <Link to="/scholars-essays/doesnt-exist">Link to /scholars-essays/doesnt-exist</Link>
      <br />
      <Link to="/scholars-essays/sweet-who-traveled">Link to /scholars-essays/sweet-who-traveled</Link>
    </div>
  );
}

TableOfContents.propTypes = {
  expanded: PropTypes.bool,
};

TableOfContents.defaultProps = {
  expanded: false,
};
