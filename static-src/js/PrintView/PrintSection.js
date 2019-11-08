import React, { useContext } from 'react';

import style from 'styles/PrintView.module.css';
import sectionContentStyle from 'styles/SectionContent.module.css';
import PrintBlock from './PrintBlock';
import usePrintMarginLinks from './usePrintMarginLinks';
import SectionContext from '../SectionContext';
import { Block, useContentRefs } from '../SectionContent';
import TableOfContents from '../TableOfContents';
import { PARAGRAPH_TAG, Content } from '../markdown';


export default function PrintSection() {
  const {
    numeral,
    title,
    author,
    isToc,
    blocks,
    mainContent: { contentNodes, footnotesByNumber },
    contentRefs: { paragraphRefs },
  } = useContext(SectionContext);

  const printMarginLinksExtension = usePrintMarginLinks();
  const paragraphRefsExtension = useContentRefs(PARAGRAPH_TAG, paragraphRefs);
  const footnotes = Object.values(footnotesByNumber);
  if (!footnotes.length) {
    return null;
  }

  footnotes.sort((a, b) => a - b);

  return (
    <>
      {/* Title */}
      <Block
        title={`${numeral ? `${numeral}. ` : ''}${title}`}
        author={author}
        isToc={isToc}
        print
      />

      {/* Expanded Table of Contents block */}
      {isToc ? (
        <Block isToc print>
          <TableOfContents className={sectionContentStyle.tocBlock} />
        </Block>
      ) : null}

      {/* Non-TOC content */}
      {!isToc ? (
        <>

          {/* Main section content */}
          <Block contentClassName={style.content} print>
            <Content
              nodes={contentNodes}
              extensions={[
                printMarginLinksExtension,
                paragraphRefsExtension,
              ]}
            />
          </Block>

          {/* Pre-Footnotes blocks */}
          {blocks
            .filter((block) => !block.belowFootnotes)
            .map((block) => (
              <PrintBlock key={block.number} number={block.number} />
            ))}

          <Block title="Footnotes" print>
            <Content nodes={footnotes} />
          </Block>

          {/* Post-Footnotes blocks */}
          {blocks
            .filter((block) => block.belowFootnotes)
            .map((block) => (
              <PrintBlock key={block.number} number={block.number} />
            ))}

        </>
      ) : null}
    </>
  );
}
