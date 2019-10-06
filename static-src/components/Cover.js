import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch, Link } from 'react-router-dom';
import styled from 'styled-components';

import HTMLContent from './HTMLContent';
import MarkdownContent from './MarkdownContent';
import { EXPANDED_TOC_PATH } from '../constants';
import {
  Z_INDEX,
  CONTAINER_PADDING,
  StyledFadingOverlay,
  BrowserSizeContext,
  FONTS,
  THEME_COLORS,
  StyledBookTitle,
  StyledSectionAuthor,
  StyledBookContent,
  DURATION,
  Triangle,
} from '../styles';

/*
* This component renders the cover of the book, visible when at the
* the root URL.
*/

export default function Cover() {
  const [copyrightCollapsed, setCopyrightCollapsed] = useState(true);
  const coverOpen = useRouteMatch('/').isExact;
  const browserSize = useContext(BrowserSizeContext);
  const enterPath = useSelector((state) => (
    state.currentSectionSlug
      ? state.sectionMetaBySlug[state.currentSectionSlug].path
      : EXPANDED_TOC_PATH
  ));

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

  const toggleCopyrightCollapsed = () => setCopyrightCollapsed(!copyrightCollapsed);

  return (
    <StyledCover
      visible={coverOpen}
      backgroundImageUrl={backgroundImageUrl}
      onClick={() => setCopyrightCollapsed(true)}
    >

      <StyledBookInformation>
        <StyledTitle>{coverTitle}</StyledTitle>
        <StyledSubtitle>{coverSubtitle}</StyledSubtitle>
        <StyledAuthor>{coverAuthor}</StyledAuthor>
        <StyledEnterButton to={enterPath}>Enter</StyledEnterButton>
      </StyledBookInformation>

      <StyledContent>
        <MarkdownContent>{coverContentMarkdown}</MarkdownContent>
        {browserSize === 'mobile' ? (
          <StyledImageAttribution>{backgroundImageAttribution}</StyledImageAttribution>
        ) : null}
      </StyledContent>

      {browserSize !== 'mobile' ? (
        <StyledImageAttribution>{backgroundImageAttribution}</StyledImageAttribution>
      ) : null}

      <StyledPublicationInformation
        onClick={(e) => e.stopPropagation()}
        collapsed={copyrightCollapsed}
      >
        <StyledCopyright onClick={toggleCopyrightCollapsed}>
          <StyledTrigger><StyledTriangle collapsed={copyrightCollapsed} /></StyledTrigger>
          <StyledStrong>Publication Information</StyledStrong>
          <HTMLContent>{coverCopyright}</HTMLContent>
        </StyledCopyright>
        <StyledNumbers>{coverNumbers}</StyledNumbers>
        <StyledCredits>
          {coverCredits.map((credit, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <StyledCredit href={credit.link} key={index}>
              <StyledCreditText>{credit.text}</StyledCreditText>
              <StyledCreditImage src={credit.image} />
            </StyledCredit>
          ))}
        </StyledCredits>
      </StyledPublicationInformation>

    </StyledCover>
  );
}

const StyledCover = styled(StyledFadingOverlay)`
  ${CONTAINER_PADDING}
  z-index: ${Z_INDEX.cover};
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("${(props) => props.backgroundImageUrl}");
  background-size: auto 115.8%;
  background-position: 35.37% 22.22%;
  background-repeat: no-repeat;
  padding-top: 1.5em;
  padding-bottom: 5em;
  color: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const StyledBookInformation = styled.div`
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 1em 0;
`;

const StyledTitle = styled(StyledBookTitle)`
  font-size: 2em;
  color: ${THEME_COLORS.coverTitle};
  margin-bottom: 0.1em;
`;

const StyledSubtitle = styled.div`
  font-family: ${FONTS.serif};
  font-weight: bold;
  font-style: italic;
  font-size: 1.2em;
  color: ${THEME_COLORS.coverSubtitle};
`;

const StyledAuthor = styled(StyledSectionAuthor)`
  font-size: 1.25em;
  color: ${THEME_COLORS.coverAuthor};
  margin: 1.65em 0;
`;

const StyledEnterButton = styled(Link)`
  font-size: 1.75em;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.15em;

  ::after {
    content: '▸';
    margin-left: 0.25em;
  }
`;

const StyledContent = styled(StyledBookContent)`
  position: relative;
  flex-grow: 1;
  overflow-y: scroll;
  font-size: 1.1em;
  padding-bottom: 3em;

  hr {
    border-top: 1px solid #bbb;
  }
`;

const StyledImageAttribution = styled(HTMLContent)`
  p {
    margin: 0.25em 0;
  }
`;

const StyledPublicationInformation = styled.div`
  ${CONTAINER_PADDING}
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: ${THEME_COLORS.coverPublicationInformationBackground};
  box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.5);
  z-index: 1;
  transform: translateY(${({ collapsed }) => (collapsed ? '-5rem' : '-100%')});
  transition: transform ${DURATION.slide}ms;
  padding-bottom: 1em;
  font-size: 1.25em;
  font-family: ${FONTS.serif};
`;

const StyledCopyright = styled.div`
  height: calc(5rem + 1px);
  background-color: ${THEME_COLORS.coverPublicationInformationBackground};
  cursor: pointer;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1rem;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  padding: 1.5em 0;
  border-bottom: 1px solid #bbb;
  margin-bottom: 1.5em;
`;

const StyledTrigger = styled.div`
  position: absolute;
  top: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
  background-color: ${THEME_COLORS.coverPublicationInformationBackground};
  width: 4rem;
  height: 4rem;
  border-radius: 2rem;
  box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.5);
  font-size: 1.5em;
  line-height: 0.7;
  display: flex;
  justify-content: center;
  padding-top: 0.4em;
`;

const StyledTriangle = styled(Triangle)`
  transform: rotate(${({ collapsed }) => (collapsed ? '0deg' : '180deg')});
  transition: transform ${DURATION.slide}ms;
`;

const StyledStrong = styled.strong`
  font-size: 1.25em;
  margin-top: -0.15em;
  margin-bottom: 0.15em;
  font-family: ${FONTS.sans};
`;

const StyledNumbers = styled(HTMLContent)`
  p {
    margin: 0.25em 0;
  }

  a {
    text-decoration: underline;
  }
`;

const StyledCredits = styled.div`
  margin: 1em 0;
  line-height: 1.5;
`;

const StyledCredit = styled.a`
  display: flex;
  align-items: center;
  margin: 0.75em 0;
`;

const StyledCreditText = styled(HTMLContent)``;
const StyledCreditImage = styled.img`
  width: 3em;
  margin-left: 1em;
`;
