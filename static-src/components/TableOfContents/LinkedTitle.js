import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { SET_EXPLORER_OPEN, EXPANDED_TOC } from '../../constants';


export default function LinkedTitle({
  className,
  cx,
  slug,
  expanded,
  setExpanded,
  onLinkClick,
}) {
  const browserSize = useSelector((state) => state.browserSize);
  const explorerBaseUrl = useSelector((state) => state.config.explorerBaseUrl);
  const {
    path,
    title,
    sections,
    explorer_link: explorerLink,
  } = useSelector((state) => state.sectionMetaBySlug[slug] || state.sectionGroupMetaBySlug[slug]);

  const dispatch = useDispatch();

  let Component;
  let props;

  if (explorerLink) {
    if (browserSize === 'mobile') {
      Component = 'a';
      props = {
        href: explorerBaseUrl,
        target: 'explorer',
        onClick: onLinkClick,
      };
    } else {
      Component = 'a';
      props = {
        onClick: (event) => {
          dispatch({ type: SET_EXPLORER_OPEN, explorerOpen: true });
          if (onLinkClick) {
            onLinkClick(event);
          }
        },
      };
    }
  } else if (sections && setExpanded) {
    if (expanded) {
      Component = Link;
      props = { to: EXPANDED_TOC.path, onClick: onLinkClick };
    } else {
      Component = 'a';
      props = { onClick: setExpanded };
    }
  } else {
    Component = Link;
    props = { to: path, onClick: onLinkClick };
  }

  return <Component className={cx(className, { explorerLink })} {...props}>{title}</Component>;
}

LinkedTitle.propTypes = {
  className: PropTypes.string,
  cx: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
  setExpanded: PropTypes.func,
  onLinkClick: PropTypes.func,
};

LinkedTitle.defaultProps = {
  className: null,
  expanded: false,
  setExpanded: null,
  onLinkClick: null,
};
