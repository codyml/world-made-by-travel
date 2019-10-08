import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import useAuthorLinks from './useAuthorLinks';
import { SET_EXPLORER_OPEN, EXPANDED_TOC } from '../constants';
import styles from '../styles/TableOfContents.module.css';

const cx = classNames.bind(styles);

/*
* Component that renders the table of contents, both the small ones
* and the expanded one.
*/

export default function TableOfContents() {
  const [expandedGroupSlug, setExpandedGroupSlug] = useState(null);
  const tableOfContents = useSelector((state) => state.tableOfContents);

  return (
    <div className={styles.TableOfContents}>
      {tableOfContents.map((slug) => (
        <TableOfContentsItem
          key={slug}
          expanded={expandedGroupSlug === slug}
          setExpanded={() => setExpandedGroupSlug(slug)}
          slug={slug}
        />
      ))}
    </div>
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

  const linkedAuthor = useAuthorLinks(author, styles.authorLink);
  const dispatch = useDispatch();

  let TitleComponent;
  let titleProps;

  if (explorerLink) {
    if (browserSize === 'mobile') {
      TitleComponent = 'a';
      titleProps = { href: explorerBaseUrl, target: 'explorer' };
    } else {
      TitleComponent = 'span';
      titleProps = { onClick: () => dispatch({ type: SET_EXPLORER_OPEN, explorerOpen: true }) };
    }
  } else if (sections && setExpanded) {
    if (expanded) {
      TitleComponent = Link;
      titleProps = { to: EXPANDED_TOC.path };
    } else {
      TitleComponent = 'span';
      titleProps = { onClick: setExpanded };
    }
  } else {
    TitleComponent = Link;
    titleProps = { to: path };
  }

  return (
    <div className={styles.item}>
      <TitleComponent className={styles.title} {...titleProps}>
        {title}
      </TitleComponent>
      {linkedAuthor ? <div className={styles.author}>{linkedAuthor}</div> : null}
      {sections ? (
        <div className={cx(styles.children, { expanded })}>
          {sections.map((childSlug) => <TableOfContentsItem key={childSlug} slug={childSlug} />)}
        </div>
      ) : null}
    </div>
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
