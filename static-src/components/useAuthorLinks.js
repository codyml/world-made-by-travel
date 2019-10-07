import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { SET_MODAL_CONTENT, AUTHOR_MODAL } from '../constants';
import { FONTS, THEME_COLORS } from '../styles';


/*
* Custom hook that returns a replaces [author-slug] references with
* links that open the respective author modal.
*/

export default function useAuthorLinks(authorString) {
  const authorsBySlug = useSelector((state) => state.authorsBySlug);
  const dispatch = useDispatch();
  const openAuthorModal = useCallback((authorSlug) => dispatch({
    type: SET_MODAL_CONTENT,
    modalType: AUTHOR_MODAL,
    authorSlug,
  }), [dispatch]);

  return useMemo(() => (authorString ? (
    <StyledAuthorText>
      {authorString.split(/\[([\w-]+)\]/g).map((segment, index) => {
        const isAuthorSlug = index % 2 === 1;

        if (isAuthorSlug && authorsBySlug[segment]) {
          return (
            <StyledAuthorLink
              // eslint-disable-next-line react/no-array-index-key
              key={`${index}-${segment}`}
              onClick={() => openAuthorModal(segment)}
            >
              {authorsBySlug[segment].name}
            </StyledAuthorLink>
          );
        }

        // eslint-disable-next-line react/no-array-index-key
        return <span key={`${index}-${segment}`}>{segment}</span>;
      })}
    </StyledAuthorText>
  ) : null), [authorString, authorsBySlug, openAuthorModal]);
}

const StyledAuthorText = styled.div`
  font-family: ${FONTS.serif};
  font-style: italic;
`;

export const StyledAuthorLink = styled.a`
  color: ${THEME_COLORS.authorLink};

  :hover {
    text-decoration: underline;
  }
`;
