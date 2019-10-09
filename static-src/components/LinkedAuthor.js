import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { SET_MODAL_CONTENT, AUTHOR_MODAL } from '../constants';
import { bookAuthor, authorLink } from '../styles/typography.module.css';


export default function LinkedAuthor({
  className,
  linkClassName,
  onLinkClick,
  children,
}) {
  const authorsBySlug = useSelector((state) => state.authorsBySlug);
  const dispatch = useDispatch();

  const handleAuthorClick = (event, authorSlug) => {
    dispatch({
      type: SET_MODAL_CONTENT,
      modalType: AUTHOR_MODAL,
      authorSlug,
    });

    if (onLinkClick) {
      onLinkClick(event);
    }
  };

  const authorStringSegments = children ? children.split(/\[([\w-]+)\]/g).map((str, index) => ({
    index,
    str,
    authorName: index % 2 === 1 && authorsBySlug[str] && authorsBySlug[str].name,
  })) : [];

  return (
    <div className={className || bookAuthor}>
      {authorStringSegments.map(({ index, str, authorName }) => (authorName ? (
        //  eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          className={linkClassName || authorLink}
          key={`${index}-${str}`}
          onClick={(e) => handleAuthorClick(e, str)}
        >
          {authorName}
        </a>
      ) : (
        <span key={`${index}-${str}`}>{str}</span>
      )))}
    </div>
  );
}

LinkedAuthor.propTypes = {
  className: PropTypes.string,
  linkClassName: PropTypes.string,
  onLinkClick: PropTypes.func,
  children: PropTypes.string,
};

LinkedAuthor.defaultProps = {
  className: null,
  linkClassName: null,
  onLinkClick: null,
  children: null,
};
