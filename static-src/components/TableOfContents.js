import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import useAuthorLinks, { StyledAuthorLink } from './useAuthorLinks';
import { SET_EXPLORER_OPEN, EXPANDED_TOC } from '../constants';
import { FONTS, DURATION } from '../styles';


/*
* Component that renders the table of contents, both the small ones
* and the expanded one.
*/

export default function TableOfContents() {
  const [expandedGroupSlug, setExpandedGroupSlug] = useState(null);
  const tableOfContents = useSelector((state) => state.tableOfContents);

  return (
    <StyledTableOfContents>
      {tableOfContents.map((slug) => (
        <TableOfContentsItem
          key={slug}
          expanded={expandedGroupSlug === slug}
          setExpanded={() => setExpandedGroupSlug(slug)}
          slug={slug}
        />
      ))}
    </StyledTableOfContents>
  );
}


/*
* A single TOC item.
*/

const TableOfContentsItem = ({ expanded, setExpanded, slug }) => {
  const browserSize = useSelector((state) => state.browserSize);
  const explorerBaseUrl = useSelector((state) => state.config.explorerBaseUrl);
  const {
    path,
    title,
    author,
    sections,
    explorer_link: explorerLink,
  } = useSelector((state) => state.sectionMetaBySlug[slug] || state.sectionGroupMetaBySlug[slug]);

  const linkedAuthor = useAuthorLinks(author);
  const dispatch = useDispatch();

  let titleAs;
  let titleHref;
  let titleTo;
  let titleOnClick;

  if (explorerLink) {
    if (browserSize === 'mobile') {
      titleAs = 'a';
      titleHref = explorerBaseUrl;
    } else {
      titleOnClick = () => dispatch({ type: SET_EXPLORER_OPEN, explorerOpen: true });
    }
  } else if (sections && setExpanded) {
    if (expanded) {
      titleAs = Link;
      titleTo = EXPANDED_TOC.path;
    } else {
      titleOnClick = setExpanded;
    }
  } else {
    titleAs = Link;
    titleTo = path;
  }

  return (
    <StyledTableOfContentsItem>
      <StyledTitle
        as={titleAs}
        href={titleHref}
        target={titleHref ? 'explorer' : null}
        to={titleTo}
        onClick={titleOnClick}
      >
        {title}
      </StyledTitle>
      {linkedAuthor ? <StyledAuthor>{linkedAuthor}</StyledAuthor> : null}
      {sections ? (
        <StyledChildren isExpanded={expanded}>
          {sections.map((childSlug) => <TableOfContentsItem key={childSlug} slug={childSlug} />)}
        </StyledChildren>
      ) : null}
    </StyledTableOfContentsItem>
  );
};

TableOfContentsItem.propTypes = {
  expanded: PropTypes.bool,
  setExpanded: PropTypes.func,
  slug: PropTypes.string.isRequired,
};

TableOfContentsItem.defaultProps = {
  expanded: false,
  setExpanded: null,
};

const StyledTableOfContents = styled.div`
  font-size: 1.15em;
  font-family: ${FONTS.serif};
  font-weight: 400;
  line-height: 1.4;
`;

const StyledTableOfContentsItem = styled.div`
  margin: 1em 0;
`;

const StyledTitle = styled.span``;
const StyledAuthor = styled.div`
  font-size: 0.9em;
  margin-top: 0.15em;
  font-weight: 300;

  ${StyledAuthorLink} {
    color: white;
    font-weight: 400;
  }
`;

const StyledChildren = styled.div`
  max-height: ${(p) => (p.isExpanded ? '300px' : 0)};
  overflow-y: scroll;
  transition: max-height ${DURATION.slide}ms;
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  padding-left: 1em;
  margin: 0.75em 0;

  ${StyledTableOfContentsItem} {
    margin: 0.85em 0;

    :first-child {
      margin-top: 0.25em;
    }

    :last-child {
      margin-bottom: 0.25em;
    }
  }
`;
