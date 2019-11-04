import React, { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNamesBind from 'classnames/bind';

import style from 'styles/links.module.css';
import {
  EXPANDED_TOC,
  COVER,
  MATCH_CONTENT_IDENTIFIER,
  GET_CONTENT_DESCRIPTION,
} from '../../constants';
import SectionContext from '../../SectionContext';

const cx = classNamesBind.bind(style);


/*
* Returns a description of the hash content.
*/

const parseBookHash = (hash) => {
  for (const [contentType, regex] of Object.entries(MATCH_CONTENT_IDENTIFIER)) {
    const match = hash.match(regex);
    if (match) {
      const [, number] = match;
      return GET_CONTENT_DESCRIPTION[contentType](number);
    }
  }

  return null;
};


/*
* React element for rendering a book link.
*/

export default function BookLink({ href, children }) {
  const highlightInvalid = useSelector((state) => state.config.highlightInvalidLinksAndFigures);
  const sectionMetaBySlug = useSelector((state) => ({
    ...state.sectionMetaBySlug,
    [EXPANDED_TOC.slug]: EXPANDED_TOC,
    [COVER.slug]: COVER,
  }));

  const { slug: currentSectionSlug } = useContext(SectionContext);
  const sectionSlugsByPath = useMemo(() => Object.assign(
    {},
    ...Object.values(sectionMetaBySlug).map(({ slug, path }) => ({ [path]: slug })),
  ), [sectionMetaBySlug]);

  const { origin: bookBaseUrl } = window.location;
  const [path, slug, hashDescription] = useMemo(() => {
    let url;
    let linkHashDescription;
    let linkSlug;
    try {
      if (!href) {
        url = null;
      } else if (!href.startsWith('http')) {
        if (href.startsWith('#')) {
          url = new URL(`${bookBaseUrl}${sectionMetaBySlug[currentSectionSlug].path}${href}`);
        } else {
          url = new URL(`${bookBaseUrl}${href}`);
        }
      } else {
        url = new URL(href);
      }
    } catch {
      url = null;
    }

    if (url) {
      linkSlug = sectionSlugsByPath[url.pathname];
      linkHashDescription = parseBookHash(url.hash.slice(1));
    }

    return [
      url ? `${url.pathname}${url.hash}` : '',
      linkSlug,
      linkHashDescription,
    ];
  }, [bookBaseUrl, currentSectionSlug, href, sectionMetaBySlug, sectionSlugsByPath]);

  const invalid = !slug;
  let tipText;
  if (invalid) {
    tipText = <strong>Invalid link</strong>;
  } else {
    tipText = (
      <>
        <span>Link to </span>
        {hashDescription ? (
          <><strong>{hashDescription}</strong> in </>
        ) : null}
        {slug === currentSectionSlug ? (
          <strong>this section</strong>
        ) : (
          <>section <strong>{sectionMetaBySlug[slug].title}</strong></>
        )}
      </>
    );
  }

  return (
    <Link
      className={cx(style.BookLink, { invalid, highlightInvalid })}
      to={path}
    >
      {children}
      <span className={style.hoverTip}>
        {tipText}
      </span>
    </Link>
  );
}

BookLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node,
};

BookLink.defaultProps = {
  children: null,
};
