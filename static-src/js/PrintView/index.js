import React from 'react';
import { useSelector } from 'react-redux';

import style from 'styles/PrintView.module.css';
import usePrintContent from './usePrintContent';
import { MarkdownContent } from '../markdown';
import useSectionContent from '../useSectionContent';
import SectionContext from '../SectionContext';
import LinkedAuthor from '../LinkedAuthor';


export default function PrintView() {
  const {
    printViewIntroductionMarkdown: introductionMarkdown,
    backgroundImageUrl,
    coverTitle: bookTitle,
    coverAuthor: bookAuthor,
  } = useSelector((state) => state.config);

  const sectionSlug = useSelector((state) => state.currentSectionSlug);
  const [contentReady, , sectionContext] = useSectionContent(sectionSlug);
  const {
    group: sectionGroupSlug,
    numeral: sectionNumeral,
    title: sectionTitle,
    author: sectionAuthor,
  } = sectionContext;

  const {
    numeral: sectionGroupNumeral,
    title: sectionGroupTitle,
    author: sectionGroupAuthor,
  } = useSelector(
    (state) => state.sectionGroupMetaBySlug[sectionGroupSlug] || {},
  );

  const printContent = usePrintContent(contentReady, sectionContext);

  return (
    <div className={style.PrintView}>
      <MarkdownContent className={style.introduction}>
        {introductionMarkdown}
      </MarkdownContent>
      {contentReady ? (
        <SectionContext.Provider value={sectionContext}>
          <div className={style.letterPage}>
            <div className={style.header}>
              <img
                className={style.headerImage}
                src={backgroundImageUrl}
                alt="Painting"
              />
              <div className={style.headerText}>
                <div className={style.bookTitle}>{bookTitle}</div>
                <div className={style.bookAuthor}>{bookAuthor}</div>
                {sectionGroupTitle ? (
                  <div className={style.sectionGroupTitle}>
                    {sectionGroupNumeral ? `${sectionGroupNumeral}. ` : ''}
                    {sectionGroupTitle}
                  </div>
                ) : null}
                {sectionGroupAuthor ? (
                  <LinkedAuthor
                    className={style.sectionGroupAuthor}
                    linkClassName={null}
                  >
                    {sectionGroupAuthor}
                  </LinkedAuthor>
                ) : null}
              </div>
            </div>
            <div className={style.printContent}>{printContent}</div>
            <div className={style.footer}>
              <div className={style.sectionTitle}>
                {sectionNumeral ? `${sectionNumeral}. ` : ''}
                {sectionTitle}
              </div>
              {sectionAuthor ? (
                <LinkedAuthor
                  className={style.sectionAuthor}
                  linkClassName={null}
                >
                  {sectionAuthor}
                </LinkedAuthor>
              ) : null}
            </div>
          </div>
        </SectionContext.Provider>
      ) : null}
    </div>
  );
}
