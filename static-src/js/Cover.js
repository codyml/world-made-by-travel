import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch, Link } from 'react-router-dom';
import classNamesBind from 'classnames/bind';

import style from 'styles/Cover.module.css';
import Overlay from './Overlay';
import HTMLContent from './HTMLContent';
import { MarkdownContent } from './markdown';
import Tabbed from './Tabbed';
import { EXPANDED_TOC } from './constants';

const cx = classNamesBind.bind(style);


/*
* This component renders the cover of the book, visible when at the
* the root URL.
*/

export default function Cover() {
  const [mobileSliderCollapsed, setMobileSliderCollapsed] = useState(true);
  const visible = useRouteMatch('/').isExact;
  const browserSize = useSelector((state) => state.browserSize);
  const enterPath = useSelector((state) => ({
    [EXPANDED_TOC.slug]: EXPANDED_TOC,
    ...state.sectionMetaBySlug,
  })[state.currentSectionSlug].path);

  const {
    coverTitle,
    coverSubtitle,
    coverAuthor,
    coverContentMarkdown,
    coverCopyright,
    coverNumbers,
    coverCredits,
    backgroundImageUrl,
    backgroundImageAttribution,
  } = useSelector((state) => state.config);

  const toggleSliderCollapsed = (
    browserSize === 'mobile'
      ? () => setMobileSliderCollapsed(!mobileSliderCollapsed)
      : null
  );

  return (

    <Overlay
      visible={visible}
      className={style.Cover}
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
      onClick={() => setMobileSliderCollapsed(true)}
    >

      <div className={style.coverContent}>
        <div className={style.coverContentContainer}>

          {/* Book meta info */}
          <div className={style.bookInformation}>
            <div className={style.title}>{coverTitle}</div>
            <div className={style.subtitle}>{coverSubtitle}</div>
            <div className={style.bookAuthor}>{coverAuthor}</div>
            <Link className={style.enter} to={enterPath}>Enter</Link>
          </div>

          {/* Book introduction */}
          <div className={style.content}>
            <MarkdownContent>{coverContentMarkdown}</MarkdownContent>
            {browserSize === 'mobile' ? (
              <HTMLContent className={style.imgAttrib}>{backgroundImageAttribution}</HTMLContent>
            ) : null}
          </div>

          {browserSize !== 'mobile' ? (
            <HTMLContent className={style.imgAttrib}>{backgroundImageAttribution}</HTMLContent>
          ) : null}

        </div>
      </div>

      {/* Publication information */}
      <div
        className={cx(style.publicationInformation, {
          tablet: browserSize !== 'mobile',
          mobileSliderCollapsed,
        })}
        onClick={(e) => e.stopPropagation()}
      >

        {/* Mobile expandable tab */}
        <div
          className={style.mobileTabContainer}
          onClick={toggleSliderCollapsed}
        >
          <Tabbed isExpanded={!mobileSliderCollapsed} tabSide="top">
            <div className={style.publInfoTitle}>Publication Information</div>
            <HTMLContent>{coverCopyright}</HTMLContent>
          </Tabbed>
        </div>

        {/* Publication information content */}
        <div className={style.publicationInformationContainer}>
          <div className={style.copyrightAndNumbers}>
            <HTMLContent className={style.copyright}>{coverCopyright}</HTMLContent>
            <HTMLContent className={style.numbers}>{coverNumbers}</HTMLContent>
          </div>
          <div className={style.credits}>
            {coverCredits.map((credit, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <a href={credit.link} key={index}>
                <HTMLContent>{credit.text}</HTMLContent>
                <img src={credit.image} alt={credit.text} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </Overlay>
  );
}
