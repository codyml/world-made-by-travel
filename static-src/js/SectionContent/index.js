import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import style from 'styles/SectionContent.module.css';
import useSectionContent from '../useSectionContent';
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
import SectionContext from '../SectionContext';


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
    contentReady,
    imagesLoaded,
    sectionContext,
  ] = useSectionContent(sectionSlug);


  //  Sets title
  useSetTitle([sectionContext.title]);

  //  Enabled hovering title
  const hoverTitleVisible = useHoverTitle(sectionContext);

  //  Enables scrolling to content items
  const scrollToContent = useScrollToContent(sectionContext, contentReady, imagesLoaded);

  //  Enables navigating section content by hash and updating hash
  //  when navigating section content.
  useHashScrolling(scrollToContent, sectionContext);

  return (
    <div className={style.SectionContent}>
      <SectionContext.Provider value={sectionContext}>

        {/* Hovering section title block */}
        <HoverTitleBlock visible={hoverTitleVisible} {...sectionMeta} />

        {/* Start of "paper" content area */}
        <div
          className={style.contentArea}
          ref={sectionContext.contentRefs.contentAreaRef}
        >

          {/* Introduction content above mobile/tablet Table of Contents */}
          {browserSize !== 'desktop' && sectionContext.isToc ? (
            <Block>
              <MarkdownContent className={style.instructions}>
                {instructionsMarkdown}
              </MarkdownContent>
            </Block>
          ) : null}

          {/* Section title block */}
          <TitleBlock />

          {/* Expanded Table of Contents block */}
          {sectionContext.isToc ? (
            <Block isToc>
              <TableOfContents className={style.tocBlock} />
            </Block>
          ) : null}

          {/* Blocks for non-TOC sections with content received */}
          {!sectionContext.isToc ? (
            <>

              {contentReady ? (
                <>

                  {/* Main content block */}
                  <MainContentBlock />

                  {/* Pre-Footnotes blocks */}
                  {sectionContext.blocks
                    .filter((block) => !block.belowFootnotes)
                    .map((block) => (
                      <CustomBlock key={block.number} blockNumber={block.number} />
                    ))}

                  {/* Footnotes block */}
                  <FootnotesBlock />

                  {/* Post-Footnotes blocks */}
                  {sectionContext.blocks
                    .filter((block) => block.belowFootnotes)
                    .map((block) => (
                      <CustomBlock key={block.number} blockNumber={block.number} />
                    ))}

                </>
              ) : null}

              {/* Loading message */}
              <LoadingMessage visible={!contentReady} />

            </>
          ) : null}

        </div>
      </SectionContext.Provider>
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

export { Block };
