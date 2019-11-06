import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import classNamesBind from 'classnames/bind';

import style from 'styles/links.module.css';
import { SET_EXPLORER_PATH } from '../../constants';

const cx = classNamesBind.bind(style);


/*
* Recognized Explorer link types
*/

const ROOT = 'ROOT';
const PAGE = 'PAGE';
const LIST = 'LIST';
const ENTRY = 'ENTRY';
const EXPLORER_LINK_TYPES = {
  [ROOT]: [/^\/#\/$/, () => <strong>The Grand Tour Explorer</strong>],
  [PAGE]: [
    /^\/#\/(about|search|explore|lists(?=\/$)|visualizations)/,
    (page) => {
      const pageTitle = `${page.charAt(0).toUpperCase()}${page.slice(1)}`;
      return (
        <>Link to <strong>{pageTitle}</strong> in <strong>The Grand Tour Explorer</strong></>
      );
    },
  ],

  [LIST]: [
    /^\/#\/lists\/(\w+)/,
    () => (
      <>Link to a <strong>List</strong> in <strong>The Grand Tour Explorer</strong></>
    ),
  ],

  [ENTRY]: [
    /^\/#\/entries\/(\d+)/,
    (entryIndex) => (
      <>Link to <strong>Entry {entryIndex}</strong> in <strong>The Grand Tour Explorer</strong></>
    ),
  ],
};


/*
* Returns the Explorer link text if valid link.
*/

const parseExplorerPath = (path) => {
  for (const [regex, getLinkDescription] of Object.values(EXPLORER_LINK_TYPES)) {
    const match = path.match(regex);
    if (match) {
      const [, ...groups] = match;
      return getLinkDescription(...groups);
    }
  }

  return null;
};


/*
* React element for rendering Explorer links.
*/

export default function ExplorerLink({ href, children }) {
  const highlightInvalid = useSelector((state) => state.config.highlightInvalidLinksAndFigures);
  const browserSize = useSelector((state) => state.browserSize);
  const dispatch = useDispatch();
  const explorerBaseUrl = useSelector((state) => state.config.explorerBaseUrl);

  const [path, description] = useMemo(() => {
    let url;
    let linkDescription;
    try {
      if (!href) {
        url = null;
      } else if (!href.startsWith('http')) {
        url = new URL(`${explorerBaseUrl}${href}`);
      } else {
        url = new URL(href);
      }
    } catch {
      url = null;
    }

    if (url) {
      linkDescription = parseExplorerPath(`${url.pathname}${url.hash}`);
    }

    return [
      url ? `${url.pathname}${url.hash}` : '',
      linkDescription,
    ];
  }, [explorerBaseUrl, href]);

  const invalid = !description;

  const handleClick = (event) => {
    if (!invalid && browserSize !== 'mobile') {
      event.preventDefault();
      dispatch({ type: SET_EXPLORER_PATH, explorerPath: path });
    }
  };

  return (
    <a
      className={cx(style.ExplorerLink, { invalid, highlightInvalid })}
      href={`${explorerBaseUrl}${path}`}
      onClick={handleClick}
    >
      {children}
      <span className={style.hoverTip}>
        {invalid ? <strong>Invalid link</strong> : description}
      </span>
    </a>
  );
}

ExplorerLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node,
};

ExplorerLink.defaultProps = {
  children: null,
};
