import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { bookAuthor, authorLink } from 'styles/typography.module.css';
import { SET_MODAL_CONTENT, AUTHOR_MODAL } from './constants';


/*
* Returns an array of string segment objects with each [author] reference
* that was successfully matched in the passed `authorsByReference`
* object linked within.
*/

export function useAuthorStringParser() {
  const authorsBySlug = useSelector((state) => state.authorsBySlug);

  return (authorString) => (
    authorString
      ? authorString.split(/\[([\w-]+)\]/g).map((str, index) => ({
        index,
        str,
        author: index % 2 === 1 ? authorsBySlug[str] : null,
      }))
      : []
  );
}


export default function LinkedAuthor({
  className,
  linkClassName,
  onLinkClick,
  children,
}) {
  const parseAuthorString = useAuthorStringParser();
  const sectionSlug = useSelector((state) => state.currentSectionSlug);
  const dispatch = useDispatch();

  const handleAuthorClick = (event, authorSlug) => {
    dispatch({
      type: SET_MODAL_CONTENT,
      modalContent: {
        modalType: AUTHOR_MODAL,
        sectionSlug,
        authorSlug,
      },
    });

    if (onLinkClick) {
      onLinkClick(event);
    }
  };

  const authorStringSegments = parseAuthorString(children);

  return (
    <div className={className || bookAuthor}>
      {authorStringSegments.map(({ index, str, author }) => (author ? (
        //  eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          className={linkClassName}
          key={`${index}-${str}`}
          onClick={(e) => handleAuthorClick(e, str)}
        >
          {author.name}
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
  linkClassName: authorLink,
  onLinkClick: null,
  children: null,
};
