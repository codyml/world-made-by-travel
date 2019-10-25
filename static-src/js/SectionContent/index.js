import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import style from 'styles/SectionContent.module.css';
import useSectionContent from './useSectionContent';
import useHoverTitle from './useHoverTitle';
import useScrollToContent from './useScrollToContent';
import useHashScrolling from './useHashScrolling';
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

  //  Loads section content
  const [
    contentLoaded,
    currentSectionContext,
  ] = useSectionContent(sectionSlug);

  //  Sets title
  useSetTitle([currentSectionContext.title]);

  //  Enabled hovering title
  const [
    hoverTitleScrollHandler,
    hoverTitleVisible,
  ] = useHoverTitle(currentSectionContext.contentRefs);

  //  Enables scrolling to content items
  const scrollToContent = useScrollToContent(currentSectionContext.contentRefs);
  window.scrollToContent = scrollToContent;

  //  Enables navigating section content by hash and updating hash
  //  when navigating section content.
  const hashScrollHandler = useHashScrolling(scrollToContent, currentSectionContext, contentLoaded);

  const handleScroll = (e) => {
    hoverTitleScrollHandler(e);
    hashScrollHandler(e);
  };

  return (
    <div className={style.SectionContent}>
      <CurrentSectionContext.Provider value={currentSectionContext}>

        {/* Hovering section title block */}
        <HoverTitleBlock visible={hoverTitleVisible} {...sectionMeta} />

        {/* Start of "paper" content area */}
        <div
          className={style.contentArea}
          ref={currentSectionContext.contentRefs.contentAreaRef}
          onScroll={handleScroll}
        >

          {/* Introduction content above mobile/tablet Table of Contents */}
          {browserSize !== 'desktop' && currentSectionContext.isToc ? (
            <Block>
              <MarkdownContent className={style.instructions}>
                {instructionsMarkdown}
              </MarkdownContent>
            </Block>
          ) : null}

          {/* Section title block */}
          <TitleBlock />

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
                  {currentSectionContext.blocks
                    .filter((block) => !block.belowFootnotes)
                    .map((block) => (
                      <CustomBlock key={block.number} blockNumber={block.number} />
                    ))}

                  {/* Footnotes block */}
                  <FootnotesBlock />

                  {/* Post-Footnotes blocks */}
                  {currentSectionContext.blocks
                    .filter((block) => block.belowFootnotes)
                    .map((block) => (
                      <CustomBlock key={block.number} blockNumber={block.number} />
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
