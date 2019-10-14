import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import style from 'styles/SectionContent.module.css';
import useSectionContent from './useSectionContent';
import useSectionScroll from './useSectionScroll';
import Block from './Block';
import TitleBlock from './TitleBlock';
import HoverTitleBlock from './HoverTitleBlock';
import LoadingMessage from '../LoadingMessage';
import MainContentBlock from './MainContentBlock';
import FootnotesBlock from './FootnotesBlock';
import CustomBlock from './CustomBlock';
import TableOfContents from '../TableOfContents';
import { MarkdownContent } from '../markdown';
import useSetTitle from '../useSetTitle';
import { EXPANDED_TOC } from '../constants';
import CurrentSectionContext from '../CurrentSectionContext';


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
    currentSectionContext,
  ] = useSectionContent(sectionSlug);

  useSetTitle([currentSectionContext.title]);
  const [scrollHandler, {
    titleRef,
    hoverTitleRef,
  }, {
    hoverTitleVisible,
  }] = useSectionScroll();

  return (
    <div
      className={style.SectionContent}
      onScroll={scrollHandler}
    >
      <CurrentSectionContext.Provider value={currentSectionContext}>

        {/* Hovering section title block */}
        <HoverTitleBlock ref={hoverTitleRef} visible={hoverTitleVisible} {...sectionMeta} />

        {/* Start of "paper" */}
        <div className={style.paper}>

          {/* Introduction content above mobile/tablet Table of Contents */}
          {browserSize !== 'desktop' && currentSectionContext.isToc ? (
            <Block>
              <MarkdownContent className={style.instructions}>
                {instructionsMarkdown}
              </MarkdownContent>
            </Block>
          ) : null}

          {/* Section title block */}
          <TitleBlock ref={titleRef} />

          {/* Expanded Table of Contents block */}
          {currentSectionContext.isToc ? (
            <Block isToc>
              <TableOfContents className={style.tocBlock} />
            </Block>
          ) : null}

          {/* Blocks for non-TOC sections with content received */}
          {!currentSectionContext.isToc ? (
            <>

              {contentLoaded ? (
                <>

                  {/* Main content block */}
                  <MainContentBlock />

                  {/* Pre-Footnotes blocks */}
                  {currentSectionContext.preFootnotesBlocks.map((block) => (
                    <CustomBlock key={block.number} {...block} />
                  ))}

                  {/* Footnotes block */}
                  <FootnotesBlock />

                  {/* Post-Footnotes blocks */}
                  {currentSectionContext.postFootnotesBlocks.map((block) => (
                    <CustomBlock key={block.number} {...block} />
                  ))}

                </>
              ) : null}

              {/* Loading message */}
              <LoadingMessage visible={!contentLoaded} />

            </>
          ) : null}

        </div>
      </CurrentSectionContext.Provider>
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


export { useSectionContent };
