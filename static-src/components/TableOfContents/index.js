import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import classNamesBind from 'classnames/bind';

import TOCItem from './TOCItem';
import style from '../../styles/TableOfContents.module.css';


export default function TableOfContents({
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
    <div className={cx(style.TableOfContents)}>
      {tableOfContents.map((slug) => (
        <TOCItem
          key={slug}
          cx={cx}
          expanded={expandedGroupSlug === slug}
          setExpanded={() => setExpandedGroupSlug(slug)}
          slug={slug}
          onLinkClick={onLinkClick}
        />
      ))}
    </div>
  );
}

TableOfContents.propTypes = {
  minimized: PropTypes.bool,
  white: PropTypes.bool,
  onLinkClick: PropTypes.func,
};

TableOfContents.defaultProps = {
  minimized: false,
  white: false,
  onLinkClick: null,
};
