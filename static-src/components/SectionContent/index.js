import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

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
import {
  EXPANDED_TOC,
  SECTION_CONTENT_REQUESTED,
  SECTION_CONTENT_RECEIVED,
  REQUESTED,
} from '../../constants';
import style from '../../styles/SectionContent.module.css';


/*
* This component renders a reader view "page" of the book.
*/

export default function SectionContent({ sectionSlug }) {
  const browserSize = useSelector((state) => state.browserSize);
  const { instructionsMarkdown } = useSelector((state) => state.config);
  const sectionMeta = useSelector((state) => (
    state.sectionMetaBySlug[sectionSlug] || EXPANDED_TOC
  ));

  const sectionContent = useSelector((state) => (
    state.sectionContentBySlug[sectionSlug]
  ));

  const dispatch = useDispatch();
  useSetTitle([sectionMeta.title]);
  const [scrollHandler, {
    titleRef,
    hoverTitleRef,
  }, {
    hoverTitleVisible,
  }] = useSectionScroll(sectionMeta, sectionContent);

  const isToc = sectionMeta.slug === EXPANDED_TOC.slug;
  const isRequested = sectionContent === REQUESTED;
  const isReceived = sectionContent && !isRequested;

  //  Initiates download of section content
  useEffect(() => {
    if (!isToc && !isRequested && !isReceived) {
      const fetchSectionContent = async () => {
        dispatch({ type: SECTION_CONTENT_REQUESTED, sectionSlug });
        const response = await fetch(`/wp-json/wmt/section-content?slug=${sectionSlug}`);
        if (response.ok) {
          const parsedResponse = await response.json();
          dispatch({
            type: SECTION_CONTENT_RECEIVED,
            sectionSlug,
            sectionContent: parsedResponse,
          });
        }
      };

      fetchSectionContent();
    }
  }, [dispatch, isReceived, isRequested, isToc, sectionSlug]);

  return (
    <div
      className={style.SectionContent}
      onScroll={scrollHandler}
    >

      {/* Hovering section title block */}
      <HoverTitleBlock ref={hoverTitleRef} visible={hoverTitleVisible} {...sectionMeta} />

      {/* Start of paper */}
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
        {isToc && (
          <Block isToc>
            <TableOfContents className={style.tocBlock} />
          </Block>
        )}

        {/* Blocks for non-TOC sections */}
        {!isToc && (

          //  If content received
          isReceived ? (
            <>

              {/* Main content block */}
              <MainContentBlock {...sectionMeta} />

              {/* Pre-Footnotes blocks */}
              {sectionContent.blocks
                .filter((block) => block.beforeFootnotes)
                .map((block) => (
                  <CustomBlock
                    key={block.index}
                    sectionSlug={sectionSlug}
                    {...block}
                  />
                ))}

              {/* Footnotes block */}
              <FootnotesBlock {...sectionMeta} />

              {/* Post-Footnotes blocks */}
              {sectionContent.blocks
                .filter((block) => !block.beforeFootnotes)
                .map((block) => (
                  <CustomBlock
                    key={block.index}
                    sectionSlug={sectionSlug}
                    {...block}
                  />
                ))}

            </>

          //  If loading
          ) : <LoadingBlock />

        )}
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
