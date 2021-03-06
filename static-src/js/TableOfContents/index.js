import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import classNamesBind from 'classnames/bind';

import style from 'styles/TableOfContents.module.css';
import TOCItem from './TOCItem';


export default function TableOfContents({
  className,
  onLinkClick,
  minimized,
  white,
}) {
  const [expandedGroupSlug, setExpandedGroupSlug] = useState(null);
  const tableOfContents = useSelector((state) => state.tableOfContents);

  //  Applies .minimized, .subsections and/or .white modules
  //  whenever cx invoked.
  const cx = useMemo(
    () => classNamesBind.bind(style, { minimized, white }),
    [minimized, white],
  );

  return (
    <div className={cx(className, style.TableOfContents)}>
      {tableOfContents.map((slug) => (
        <TOCItem
          key={slug}
          cx={cx}
          expanded={!minimized || expandedGroupSlug === slug}
          setExpanded={minimized ? () => setExpandedGroupSlug(slug) : null}
          slug={slug}
          onLinkClick={onLinkClick}
        />
      ))}
    </div>
  );
}

TableOfContents.propTypes = {
  className: PropTypes.string,
  minimized: PropTypes.bool,
  white: PropTypes.bool,
  onLinkClick: PropTypes.func,
};

TableOfContents.defaultProps = {
  className: null,
  minimized: false,
  white: false,
  onLinkClick: null,
};
