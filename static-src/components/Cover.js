import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch, Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import HTMLContent from './HTMLContent';
import MarkdownContent from './MarkdownContent';
import { EXPANDED_TOC } from '../constants';
import styles from '../styles/Cover.module.css';

const cx = classNames.bind(styles);


/*
* This component renders the cover of the book, visible when at the
* the root URL.
*/

export default function Cover() {
  const [sliderCollapsed, setSliderCollapsed] = useState(true);
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
      ? () => setSliderCollapsed(!sliderCollapsed)
      : null
  );

  return (

    <div
      className={cx(styles.Cover, { visible })}
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
      onClick={() => setSliderCollapsed(true)}
      role="presentation"
    >

      <div className={styles.coverContent}>

        <div className={styles.bookInformation}>
          <div className={styles.title}>{coverTitle}</div>
          <div className={styles.subtitle}>{coverSubtitle}</div>
          <div className={styles.author}>{coverAuthor}</div>
          <Link className={styles.enter} to={enterPath}>Enter</Link>
        </div>

        <div className={styles.bookContent}>
          <MarkdownContent>{coverContentMarkdown}</MarkdownContent>
          {browserSize === 'mobile' ? (
            <HTMLContent className={styles.imgAttrib}>{backgroundImageAttribution}</HTMLContent>
          ) : null}
        </div>

        {browserSize !== 'mobile' ? (
          <HTMLContent className={styles.imgAttrib}>{backgroundImageAttribution}</HTMLContent>
        ) : null}

      </div>

      {browserSize === 'mobile' ? (

        <div
          className={cx(styles.infoSlider, { collapsed: sliderCollapsed })}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={styles.copyright}
            onClick={toggleSliderCollapsed}
          >
            <div className={styles.tab}>
              <div className={cx(styles.triangle, { collapsed: sliderCollapsed })} />
            </div>
            <strong className={styles.publInfo}>Publication Information</strong>
            <HTMLContent>{coverCopyright}</HTMLContent>
          </div>
          <HTMLContent className={styles.numbers}>{coverNumbers}</HTMLContent>
          <div className={styles.credits}>
            {coverCredits.map((credit, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <a href={credit.link} key={index}>
                <HTMLContent>{credit.text}</HTMLContent>
                <img src={credit.image} alt={credit.text} />
              </a>
            ))}
          </div>
        </div>

      ) : (

        <div className={styles.infoBar}>
          <div className={styles.leftColumn}>
            <div className={styles.copyright}>
              <HTMLContent>{coverCopyright}</HTMLContent>
            </div>
            <HTMLContent className={styles.numbers}>{coverNumbers}</HTMLContent>
          </div>
          <div className={styles.credits}>
            {coverCredits.map((credit, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <a href={credit.link} key={index}>
                <HTMLContent>{credit.text}</HTMLContent>
                <img src={credit.image} alt={credit.text} />
              </a>
            ))}
          </div>
        </div>

      ) }

    </div>
  );
}
