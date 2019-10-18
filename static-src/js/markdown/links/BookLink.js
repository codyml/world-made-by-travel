import React, { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNamesBind from 'classnames/bind';

import style from 'styles/links.module.css';
import { EXPANDED_TOC, COVER, REFERABLE_CONTENT_TYPES } from '../../constants';
import CurrentSectionContext from '../../CurrentSectionContext';

const cx = classNamesBind.bind(style);


/*
* Recognized URL hash types and regexes
*/

const HASH_TYPES = {
  [REFERABLE_CONTENT_TYPES.paragraph]: [/^paragraph-(\d+)$/, (n) => `Paragraph ${n}`],
  [REFERABLE_CONTENT_TYPES.figure]: [/^figure-(\d+)$/, (n) => `Figure ${n}`],
  [REFERABLE_CONTENT_TYPES.footnote]: [/^footnote-(\d+)$/, (n) => `Footnote ${n}`],
  [REFERABLE_CONTENT_TYPES.block]: [/^block-(\d+)$/, (n) => `Block ${n}`],
};


/*
* Returns a description of the hash content.
*/

const parseBookHash = (hash) => {
  for (const [regex, getDescription] of Object.values(HASH_TYPES)) {
    const match = hash.match(regex);
    if (match) {
      const [, number] = match;
      return getDescription(number);
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

  const { slug: currentSectionSlug } = useContext(CurrentSectionContext);
  const sectionSlugsByPath = useMemo(() => Object.assign(
    {},
    ...Object.values(sectionMetaBySlug).map(({ slug, path }) => ({ [path]: slug })),
  ), [sectionMetaBySlug]);

  const bookBaseUrl = window.location.origin;
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
