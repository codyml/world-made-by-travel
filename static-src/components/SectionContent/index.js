import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import c from 'classnames';

import useSectionScroll from './useSectionScroll';
import TitleBlock from './TitleBlock';
import LoadingBlock from './LoadingBlock';
import MainContentBlock from './MainContentBlock';
import FootnotesBlock from './FootnotesBlock';
import Block from './Block';
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
    state.sectionMetaBySlug[sectionSlug] || EXPANDED_TOC.title
  ));

  const sectionContent = useSelector((state) => (
    state.sectionContentBySlug[sectionSlug]
  ));

  const dispatch = useDispatch();
  useSetTitle([sectionMeta.title]);
  const [sectionContentRef, sectionContentClassName] = useSectionScroll(sectionSlug);


  //  Initiates download of section content
  useEffect(() => {
    if (sectionSlug !== EXPANDED_TOC.slug && !sectionContent) {
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
  }, [dispatch, sectionContent, sectionSlug]);

  return (
    <div ref={sectionContentRef} className={c(style.SectionContent, sectionContentClassName)}>

      {/* Introduction content above mobile/tablet Table of Contents */}
      {browserSize !== 'desktop' && sectionMeta === EXPANDED_TOC ? (
        <MarkdownContent className={style.instructions}>{instructionsMarkdown}</MarkdownContent>
      ) : null}

      {/* Section title block */}
      <div className={style.title}>
        <TitleBlock slug={sectionSlug} />
      </div>

      {/* Expanded Table of Contents block */}
      {sectionMeta === EXPANDED_TOC && <TableOfContents />}

      {/* Non-TOC blocks */}
      {!sectionMeta === EXPANDED_TOC && (

        sectionContent && sectionContent !== REQUESTED ? (

          <>

            {/* Main content block */}
            <MainContentBlock slug={sectionSlug} />

            {/* Pre-Footnotes blocks */}
            {sectionContent.blocks
              .filter((block) => block.beforeFootnotes)
              .map((block) => (
                <Block slug={sectionSlug} {...block} />
              ))}

            {/* Footnotes block */}
            <FootnotesBlock slug={sectionSlug} />

            {/* Post-Footnotes blocks */}
            {sectionContent.blocks
              .filter((block) => !block.beforeFootnotes)
              .map((block) => (
                <Block slug={sectionSlug} {...block} />
              ))}

          </>

        //  Loading message block
        ) : <LoadingBlock />
      )}
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
