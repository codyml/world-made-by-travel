import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { SET_MODAL_CONTENT, AUTHOR_MODAL } from '../constants';
import { bookAuthor, authorLink } from '../styles/typography.module.css';


/*
* Custom hook that returns a replaces [author-slug] references with
* links that open the respective author modal.
*/

export default function useAuthorLinks(authorString, authorLinkStyle) {
  const authorsBySlug = useSelector((state) => state.authorsBySlug);
  const dispatch = useDispatch();
  const openAuthorModal = useCallback((authorSlug) => dispatch({
    type: SET_MODAL_CONTENT,
    modalType: AUTHOR_MODAL,
    authorSlug,
  }), [dispatch]);

  return useMemo(() => (authorString ? (
    <div className={bookAuthor}>
      {authorString.split(/\[([\w-]+)\]/g).map((segment, index) => {
        const isAuthorSlug = index % 2 === 1;

        if (isAuthorSlug && authorsBySlug[segment]) {
          return (
            <span
              className={authorLinkStyle || authorLink}
              // eslint-disable-next-line react/no-array-index-key
              key={`${index}-${segment}`}
              onClick={() => openAuthorModal(segment)}
            >
              {authorsBySlug[segment].name}
            </span>
          );
        }

        // eslint-disable-next-line react/no-array-index-key
        return <span key={`${index}-${segment}`}>{segment}</span>;
      })}
    </div>
  ) : null), [authorLinkStyle, authorString, authorsBySlug, openAuthorModal]);
}
