import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import SectionContent from '../SectionContent';
import { DURATION } from '../../styles';

/*
* Custom hook that handles transitioning between different sections
* in the reader view.  Returns a component that accepts a section
* slug and smoothly transitions on slug change.
*/

export default function useTransitioningSectionContent() {
  const sectionMetaBySlug = useSelector((state) => state.sectionMetaBySlug);

  return useMemo(() => {
    const sectionMetas = Object.values(sectionMetaBySlug);
    sectionMetas.sort((a, b) => a.index - b.index);

    const TransitioningSectionContent = ({ sectionSlug }) => {
      const activeSectionIndex = sectionSlug ? sectionMetaBySlug[sectionSlug].index + 1 : 0;

      return (
        <StyledTransitioningSectionContent activeSectionIndex={activeSectionIndex}>
          <StyledSectionContentContainer>
            <SectionContent
              isTableOfContents
              isActive={!sectionSlug}
            />
          </StyledSectionContentContainer>
          { sectionMetas.map((sectionMeta) => (
            <StyledSectionContentContainer key={sectionMeta.slug}>
              <SectionContent
                sectionSlug={sectionMeta.slug}
                isActive={sectionMeta.slug === sectionSlug}
              />
            </StyledSectionContentContainer>
          )) }
        </StyledTransitioningSectionContent>
      );
    };

    TransitioningSectionContent.propTypes = {
      sectionSlug: PropTypes.string,
    };

    TransitioningSectionContent.defaultProps = {
      sectionSlug: null,
    };

    return TransitioningSectionContent;
  }, [sectionMetaBySlug]);
}

const StyledTransitioningSectionContent = styled.div`
  position: absolute;
  top: 0;
  left: ${({ activeSectionIndex }) => activeSectionIndex * -110}%;
  width: 100%;
  transition: left ${DURATION.slide}ms;
  display: flex;
`;

const StyledSectionContentContainer = styled.div`
  width: 100%;
  margin-right: 10%;
  flex-shrink: 0;
`;
