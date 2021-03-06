import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import style from 'styles/TableOfContents.module.css';
import LinkedTitle from './LinkedTitle';
import LinkedAuthor from '../LinkedAuthor';


export default function TOCItem({
  cx,
  expanded,
  setExpanded,
  slug,
  onLinkClick,
}) {
  const { sections, author } = useSelector((state) => (
    state.sectionMetaBySlug[slug] || state.sectionGroupMetaBySlug[slug]
  ));

  const currentSectionMeta = useSelector((state) => (
    state.sectionMetaBySlug[state.currentSectionSlug]
  ));

  const current = (
    currentSectionMeta
    && (slug === currentSectionMeta.slug || slug === currentSectionMeta.group)
  );

  return (
    <div className={cx(style.item)}>
      <LinkedTitle
        className={cx(style.sectionTitle, { current })}
        cx={cx}
        slug={slug}
        expanded={expanded}
        setExpanded={setExpanded}
        onLinkClick={onLinkClick}
      />
      {author ? (
        <LinkedAuthor
          className={cx(style.sectionAuthor)}
          linkClassName={cx(style.authorLink)}
          onLinkClick={onLinkClick}
        >
          {author}
        </LinkedAuthor>
      ) : null}
      {sections ? (
        <div className={cx(style.children, { expanded })}>
          {sections.map((childSlug) => (
            <TOCItem key={childSlug} cx={cx} slug={childSlug} onLinkClick={onLinkClick} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

TOCItem.propTypes = {
  cx: PropTypes.func.isRequired,
  expanded: PropTypes.bool,
  setExpanded: PropTypes.func,
  slug: PropTypes.string.isRequired,
  onLinkClick: PropTypes.func,
};

TOCItem.defaultProps = {
  expanded: false,
  setExpanded: null,
  onLinkClick: null,
};
