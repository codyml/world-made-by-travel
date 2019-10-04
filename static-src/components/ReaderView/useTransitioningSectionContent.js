import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import SectionContent from '../SectionContent';
import { DURATIONS } from '../../styles';

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

    const TransitioningSectionContent = ({ slug }) => {
      const sectionIndex = slug ? sectionMetaBySlug[slug].index + 1 : 0;
      return (
        <StyledTransitioningSectionContent sectionIndex={sectionIndex}>
          {/* Placeholder for Table of Contents */}
          <StyledSectionContent />
          { sectionMetas.map((sectionMeta) => (
            <StyledSectionContent key={sectionMeta.slug}>
              <SectionContent
                slug={sectionMeta.slug}
                active={sectionMeta.slug === slug}
              />
            </StyledSectionContent>
          )) }
        </StyledTransitioningSectionContent>
      );
    };

    TransitioningSectionContent.propTypes = {
      slug: PropTypes.string,
    };

    TransitioningSectionContent.defaultProps = {
      slug: null,
    };

    return TransitioningSectionContent;
  }, [sectionMetaBySlug]);
}

const StyledTransitioningSectionContent = styled.div`
  position: absolute;
  top: 0;
  left: ${({ sectionIndex }) => sectionIndex * -110}%;
  width: 100%;
  transition: left ${DURATIONS.slide}ms;
  display: flex;
`;

const StyledSectionContent = styled.div`
  width: 100%;
  margin-right: 10%;
  flex-shrink: 0;
`;
