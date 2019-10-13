import React, { useMemo, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import classNamesBind from 'classnames/bind';

import style from 'styles/links.module.css';
import useBrowserSize from '../useBrowserSize';
import {
  getHashReference,
  getExplorerLinkType,
  EXPANDED_TOC,
  COVER,
  SET_EXPLORER_URL,
} from '../constants';

const cx = classNamesBind(style);


/*
* Extends MarkdownIt to parse {explorer-link} and {book-link}.
*/

const SPECIAL_LINK_MARKER_TOKEN_TYPE = 'special_link_marker';
const SPECIAL_LINK_TAG = 'special_link_marker';
const EXPLORER_LINK_TYPE = 'EXPLORER_LINK_TYPE';
const BOOK_LINK_TYPE = 'BOOK_LINK_TYPE';
const SPECIAL_LINK_TYPES = [
  { type: EXPLORER_LINK_TYPE, prefix: '{explorer-link}' },
  { type: BOOK_LINK_TYPE, prefix: '{book-link}' },
];

export const SpecialLinksMarkdownItPlugin = (md) => {
  md.inline.ruler.push(SPECIAL_LINK_MARKER_TOKEN_TYPE, (state) => {
    let token;
    SPECIAL_LINK_TYPES.forEach(({ type, prefix }) => {
      if (!token && state.src.slice(state.pos, state.posMax).indexOf(prefix) === 0) {
        token = state.push(SPECIAL_LINK_MARKER_TOKEN_TYPE, SPECIAL_LINK_TAG, 0);
        token.attrSet('linkType', type);
        state.pos += prefix.length; // eslint-disable-line no-param-reassign
      }
    });

    if (token) {
      return true;
    }

    return false;
  });
};


/*
* React element for rendering external links.
*/

const ExternalLink = ({ href, children }) => (
  <a className={style.ExternalLink} href={href}>
    {children}
    <span className={style.hoverTip}>
      Link to
      <em>{href}</em>
    </span>
  </a>
);

ExternalLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
};

ExternalLink.defaultProps = {
  href: '',
  children: null,
};


/*
* React element for rendering Explorer links.
*/

const ExplorerLink = ({ href, explorerLinkType, children }) => {
  const highlightInvalid = useSelector((state) => state.config.highlightInvalidLinksAndFigures);
  const dispatch = useDispatch();
  const browserSize = useBrowserSize();
  const valid = !!explorerLinkType;
  const tipText = [];
  if (valid) {
    tipText.push('Link to ');
    const { page, list, entry, entryIndex } = explorerLinkType;
    if (page) {
      const capitalizedPage = page.charAt(0).toUpperCase() + page.slice(1);
      tipText.push(<strong>{capitalizedPage}</strong>, ' in ');
    }

    if (list) {
      tipText.push(' a ', <strong>List</strong>, ' in ');
    }

    if (entry) {
      tipText.push(
        <strong>
          Entry
          {entryIndex}
        </strong>,
        ' in ',
      );
    }

    tipText.push(<strong>The Grand Tour Explorer</strong>);
  } else {
    tipText.push(`Invalid Explorer link: ${href}`);
  }

  const handleClick = (event) => {
    if (valid && browserSize !== 'mobile') {
      event.preventDefault();
      dispatch({ type: SET_EXPLORER_URL, href });
    }
  };

  return (
    <a
      className={cx(ExplorerLink, { valid, highlightInvalid })}
      href={href}
      onClick={handleClick}
    >
      {children}
      <span className={style.hoverTip}>
        {tipText}
      </span>
    </a>
  );
};

ExplorerLink.propTypes = {
  href: PropTypes.string,
  explorerLinkType: PropTypes.shape({
    page: PropTypes.oneOf([
      'about',
      'search',
      'explore',
      'lists',
      'visualizations',
    ]),
    root: PropTypes.bool,
    list: PropTypes.bool,
    entry: PropTypes.bool,
    entryIndex: PropTypes.number,
  }),
  children: PropTypes.node,
};

ExplorerLink.defaultProps = {
  href: '',
  explorerLinkType: null,
  children: null,
};


/*
* React element for rendering book links.
*/

const BookLink = ExternalLink;


/*
* Custom hook allowing React components rendering ContentItems to
* handle Explorer links and book links, plus render popup tooltips
* for external links.  Returns a ContentItems extension.
*/

export const useSpecialLinks = () => {
  const nextLinkType = useRef();
  const sectionMetaBySlug = useSelector((state) => ({
    ...state.sectionMetaBySlug,
    [EXPANDED_TOC.slug]: EXPANDED_TOC,
    [COVER.slug]: COVER,
  }));

  const sectionSlugsByPath = useMemo(() => Object.assign(
    {},
    ...Object.values(sectionMetaBySlug).map(({ slug, path }) => ({ [path]: slug })),
  ), [sectionMetaBySlug]);

  const explorerBaseUrl = useSelector((state) => state.explorerBaseUrl);
  const bookBaseUrl = window.location.origin;

  return useCallback((item) => {
    const { tag, props, children } = item;
    switch (tag) {
      case SPECIAL_LINK_TAG: {
        nextLinkType.current = props.linkType;
        break;
      }

      case 'a': {
        const linkType = nextLinkType.current;
        nextLinkType.current = null;
        switch (linkType) {
          case EXPLORER_LINK_TYPE: {
            let { href } = props;
            let url;
            let explorerLinkType;
            try {
              if (!href || href.indexOf('http') !== 0) {
                href = `${explorerBaseUrl}${href}`;
              }
              url = new URL(href);
            } catch {
              url = null;
            }

            if (url) {
              explorerLinkType = getExplorerLinkType(url.hash.slice(1));
            }

            return {
              tag: ExplorerLink,
              props: {
                explorerLinkType,
                href: `${explorerBaseUrl}${url.pathname}${url.hash}`,
              },
              children,
            };
          }

          case BOOK_LINK_TYPE: {
            let { href } = props;
            let url;
            let slug;
            let hashType;
            let hashNumber;
            try {
              if (!href || href.indexOf('http') !== 0) {
                href = `${bookBaseUrl}${href}`;
              }
              url = new URL(href);
            } catch {
              url = null;
            }

            if (url) {
              slug = sectionSlugsByPath[url.pathname];
              [hashType, hashNumber] = getHashReference(url.hash.slice(1));
            }

            return {
              tag: BookLink,
              props: {
                slug,
                hashType,
                hashNumber,
                href: `${url.pathname}${url.hash}`,
                valid: !!(slug || (!slug && hashType)),
              },
              children,
            };
          }

          default: {
            return {
              tag: ExternalLink,
            };
          }
        }
      }

      default:
    }
    if (item.tag === SPECIAL_LINK_TAG) {
      return {
        tag: 'span',
        props: {},
        children: ['SPECIAL LINK'],
      };
    }

    return null;
  }, [sectionSlugsByPath, bookBaseUrl, explorerBaseUrl]);
};
