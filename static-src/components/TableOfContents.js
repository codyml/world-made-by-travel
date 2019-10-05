import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { SET_EXPLORER_OPEN, SET_MODAL_CONTENT, AUTHOR_MODAL } from '../constants';

export default function TableOfContents({ expanded }) {
  const dispatch = useDispatch();
  const openExplorer = () => dispatch({ type: SET_EXPLORER_OPEN, explorerOpen: true });
  const closeExplorer = () => dispatch({ type: SET_EXPLORER_OPEN, explorerOpen: false });
  const openModal = () => dispatch({
    type: SET_MODAL_CONTENT,
    modalType: AUTHOR_MODAL,
    authorSlug: 'giovanna-ceserani',
  });

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
      <Link to="/doesnt-exist">Link to /doesnt-exist</Link>
      <br />
      <Link to="/scholars-essays">Link to /scholars-essays</Link>
      <br />
      <Link to="/scholars-essays/sweet-who-traveled">Link to /scholars-essays/sweet-who-traveled</Link>
      <br />
      <Link to="/scholars-essays/doesnt-exist">Link to /scholars-essays/doesnt-exist</Link>
      <br />
      <button type="button" onClick={openExplorer}>openExplorer</button>
      <br />
      <button type="button" onClick={closeExplorer}>closeExplorer</button>
      <br />
      <button type="button" onClick={openModal}>openModal</button>
    </div>
  );
}

TableOfContents.propTypes = {
  expanded: PropTypes.bool,
};

TableOfContents.defaultProps = {
  expanded: false,
};
