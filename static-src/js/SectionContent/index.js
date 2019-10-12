import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import style from 'styles/SectionContent.module.css';
import useSectionContent from './useSectionContent';
import useSectionScroll from './useSectionScroll';
import Block from './Block';
import TitleBlock from './TitleBlock';
import HoverTitleBlock from './HoverTitleBlock';
import LoadingBlock from './LoadingBlock';
import MainContentBlock from './MainContentBlock';
import FootnotesBlock from './FootnotesBlock';
import CustomBlock from './CustomBlock';
import TableOfContents from '../TableOfContents';
import MarkdownContent from '../MarkdownContent';
import useSetTitle from '../useSetTitle';
import { EXPANDED_TOC } from '../constants';


/*
* This component renders a reader view "page" of the book.
*/

export default function SectionContent({ sectionSlug }) {
  const browserSize = useSelector((state) => state.browserSize);
  const { instructionsMarkdown } = useSelector((state) => state.config);
  const sectionMeta = useSelector((state) => (
    state.sectionMetaBySlug[sectionSlug] || EXPANDED_TOC
  ));

  const [
    contentLoaded,
    { preFootnotesBlocks, postFootnotesBlocks },
  ] = useSectionContent();

  useSetTitle([sectionMeta.title]);
  const [scrollHandler, {
    titleRef,
    hoverTitleRef,
  }, {
    hoverTitleVisible,
  }] = useSectionScroll();

  const isToc = sectionMeta.slug === EXPANDED_TOC.slug;

  return (
    <div
      className={style.SectionContent}
      onScroll={scrollHandler}
    >

      {/* Hovering section title block */}
      <HoverTitleBlock ref={hoverTitleRef} visible={hoverTitleVisible} {...sectionMeta} />

      {/* Start of "paper" */}
      <div className={style.paper}>

        {/* Introduction content above mobile/tablet Table of Contents */}
        {browserSize !== 'desktop' && isToc ? (
          <Block>
            <MarkdownContent className={style.instructions}>{instructionsMarkdown}</MarkdownContent>
          </Block>
        ) : null}

        {/* Section title block */}
        <TitleBlock ref={titleRef} {...sectionMeta} />

        {/* Expanded Table of Contents block */}
        {isToc ? (
          <Block isToc>
            <TableOfContents className={style.tocBlock} />
          </Block>
        ) : null}

        {/* Blocks for non-TOC sections with content received */}
        {!isToc && contentLoaded ? (
          <>

            {/* Main content block */}
            <MainContentBlock slug={sectionSlug} />

            {/* Pre-Footnotes blocks */}
            {preFootnotesBlocks.map((block) => (
              <CustomBlock key={block.index} {...block} />
            ))}

            {/* Footnotes block */}
            <FootnotesBlock />

            {/* Post-Footnotes blocks */}
            {postFootnotesBlocks.map((block) => (
              <CustomBlock key={block.index} {...block} />
            ))}

          </>
        ) : null}

        {/* If loading */}
        {!isToc && !contentLoaded ? <LoadingBlock /> : null}

      </div>
    </div>
  );
}

SectionContent.propTypes = {
  sectionSlug: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

SectionContent.defaultProps = {
  isActive: false,
};
