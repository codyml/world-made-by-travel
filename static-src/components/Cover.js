import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch, Link } from 'react-router-dom';
import styled from 'styled-components';

import HTMLContent from './HTMLContent';
import MarkdownContent from './MarkdownContent';
import { EXPANDED_TOC } from '../constants';
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
  atSize,
} from '../styles';

/*
* This component renders the cover of the book, visible when at the
* the root URL.
*/

export default function Cover() {
  const [copyrightCollapsed, setCopyrightCollapsed] = useState(true);
  const coverOpen = useRouteMatch('/').isExact;
  const browserSize = useContext(BrowserSizeContext);
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

  const toggleCopyrightCollapsed = (
    browserSize === 'mobile'
      ? () => setCopyrightCollapsed(!copyrightCollapsed)
      : null
  );

  return (
    <StyledCover
      visible={coverOpen}
      backgroundImageUrl={backgroundImageUrl}
      onClick={() => setCopyrightCollapsed(true)}
    >

      <StyledCoverContent>

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

      </StyledCoverContent>

      {browserSize === 'mobile' ? (
        <StyledPublicationInformationSlider
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
        </StyledPublicationInformationSlider>
      ) : (
        <StyledPublicationInformationBar>
          <StyledLeftColumn>
            <StyledCopyright>
              <HTMLContent>{coverCopyright}</HTMLContent>
            </StyledCopyright>
            <StyledNumbers>{coverNumbers}</StyledNumbers>
          </StyledLeftColumn>
          <StyledCredits>
            {coverCredits.map((credit, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <StyledCredit href={credit.link} key={index}>
                <StyledCreditText>{credit.text}</StyledCreditText>
                <StyledCreditImage src={credit.image} />
              </StyledCredit>
            ))}
          </StyledCredits>
        </StyledPublicationInformationBar>
      ) }

    </StyledCover>
  );
}

const StyledCover = styled(StyledFadingOverlay)`
  z-index: ${Z_INDEX.cover};
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.backgroundImageUrl}),
    linear-gradient(white, white);
  background-size: auto 115.8%;
  background-position: 35.37% 22.22%;
  background-repeat: no-repeat;
  color: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media only screen and (max-height: 450px) {
    background-size: cover;
  }

  ${atSize.tablet(`
    @media only screen and (max-height: 670px) {
      background-size: cover;
    }
  `)}

  ${atSize.desktop(`
    background-size: auto 145%;
    background-position: center;

    @media only screen and (max-height: 605px) {
      background-size: cover;
    }

    @media only screen and (min-width: 1200px) and (max-height: 705px) {
      background-size: cover;
    }

    @media only screen and (min-width: 1400px) and (max-height: 805px) {
      background-size: cover;
    }

    @media only screen and (min-width: 1600px) and (max-height: 905px) {
      background-size: cover;
    }

    @media only screen and (min-width: 1800px) {
      background-size: cover;
    }
  `)}
`;

const StyledCoverContent = styled.div`
  ${CONTAINER_PADDING}
  padding-top: 1.5em;
  padding-bottom: 5em;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  ${atSize.tablet(`
    padding-top: 6em;
    padding-bottom: 1.5em;
  `)}

  ${atSize.desktop(`
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 1.75rem;
  `)}
`;

const StyledBookInformation = styled.div`
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 1em 0;
  ${atSize.tablet(`
    margin: 0;
    margin-bottom: 1rem;
    text-align: right;
    font-size: 1.25em;
  `)}

  ${atSize.desktop(`
    order: 2;
  `)}
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
  ${atSize.tablet(`
    font-size: 1.5em;
  `)}
`;

const StyledAuthor = styled(StyledSectionAuthor)`
  font-size: 1.25em;
  color: ${THEME_COLORS.coverAuthor};
  margin: 1.65em 0;
  ${atSize.tablet(`
    margin-top: 0.75em;
  `)}
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

  ${atSize.tablet(`
    width: 75%;
    font-size: 1.25em;
    padding-bottom: 0;
  `)}

  ${atSize.desktop(`
    order: 1;
    width: 50%;
    flex-basis: 100%;
  `)}
`;

const StyledImageAttribution = styled(HTMLContent)`
  font-weight: 300;

  p {
    margin: 0.25em 0;
  }

  ${atSize.tablet(`
    text-align: right;
    margin-top: 2em;
    font-size: 1.1em;
  `)}

  ${atSize.desktop(`
    order: 3;
  `)}
`;

const StyledPublicationInformationSlider = styled.div`
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
  ${atSize.tablet(`
    padding: 0;
    border: none;
    margin-bottom: 1em;
    height: auto;
    font-size: 1em;
    cursor: default;
  `)}
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
  ${atSize.tablet(`
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `)}
`;

const StyledCredit = styled.a`
  display: flex;
  align-items: center;
  margin: 0.75em 0;
  ${atSize.tablet(`
    justify-content: flex-end;
    align-items: flex-start;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  `)}
`;

const StyledCreditText = styled(HTMLContent)``;
const StyledCreditImage = styled.img`
  width: 3em;
  margin-left: 1em;
`;

const StyledPublicationInformationBar = styled.div`
  ${CONTAINER_PADDING}
  background-color: ${THEME_COLORS.coverPublicationInformationBackground};
  box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding-top: 1em;
  padding-bottom: 1em;
  font-family: ${FONTS.serif};
  font-size: 1.15em;

  & > * {
    max-width: 50%;
    line-height: 1.5;

    &:nth-child(2n + 1) {
      padding-right: 1em;
      text-align: left;
    }

    &:nth-child(2n) {
      padding-left: 1em;
      text-align: right;
    }
  }

  ${atSize.desktop(`
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  `)}
`;

const StyledLeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
