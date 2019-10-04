import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import classNames from 'classnames';

import { DURATIONS } from '../../styles';

const DIRECTIONS = { left: -1, right: 1 };

/*
* Custom hook that handles transitioning between different sections
* in the reader view.  Tracks previously-viewed section and expanded
* TOC state and returns a component that should be rendered with
* a child of function that returns a section content view given a
* section slug.
*/

export default function useSectionTransitions(
  nextTableOfContentsExpanded,
  nextSectionSlug,
) {
  const [tableOfContentsExpanded, setTableOfContentsExpanded] = useState(true);
  const [sectionSlug, setSectionSlug] = useState(null);
  const [transitionDirection, setTransitionDirection] = useState(null);
  const [transitionReady, setTransitionReady] = useState(false);
  const [transitioned, setTransitioned] = useState(false);
  const sectionMetaBySlug = useSelector((state) => state.sectionMetaBySlug);

  useEffect(() => {
    setTableOfContentsExpanded(nextTableOfContentsExpanded);
  }, [nextTableOfContentsExpanded]);

  //  Prepares transition
  useEffect(() => {
    let direction = null;

    //  If Table of Contents expanding, transition right
    if (!tableOfContentsExpanded && nextTableOfContentsExpanded) {
      direction = DIRECTIONS.right;
    }

    //  If Table of Contents collapsing, transition left
    if (tableOfContentsExpanded && !nextTableOfContentsExpanded) {
      direction = DIRECTIONS.left;
    }

    //  If switching between sections, transition in the "direction"
    //  of the destination section according to their relative order.
    if (sectionSlug && nextSectionSlug && sectionSlug !== nextSectionSlug) {
      direction = Math.sign(
        sectionMetaBySlug[sectionSlug].index - sectionMetaBySlug[nextSectionSlug].index,
      );
    }

    if (direction) {
      setTransitionDirection(direction);
      setTransitionReady(true);
      console.log(`transition ready: ${direction === 1 ? 'right' : 'left'} from ${sectionSlug} to ${nextSectionSlug}`);
    }
  }, [
    tableOfContentsExpanded,
    nextTableOfContentsExpanded,
    sectionSlug,
    nextSectionSlug,
    sectionMetaBySlug,
  ]);

  useEffect(() => {
    if (transitionReady && !transitioned) {
      //  Start transition
      console.log(`starting transition: ${transitionDirection === 1 ? 'right' : 'left'} from ${sectionSlug} to ${nextSectionSlug}`);
      setTransitionReady(false);
      setTransitioned(true);

      //  Reset transition
      setTimeout(() => {
        console.log(`finished transition: ${transitionDirection === 1 ? 'right' : 'left'} from ${sectionSlug} to ${nextSectionSlug}`);
        setTransitioned(false);
        setSectionSlug(nextSectionSlug);
      }, DURATIONS.slide);
    }
  }, [transitionReady, nextSectionSlug, transitionDirection, sectionSlug, tableOfContentsExpanded, nextTableOfContentsExpanded, transitioned]);

  //  Returns a component that renders the new section and the old
  //  section and transitions between them.
  const SectionTransitionContainer = ({ children }) => {
    const getSectionContentElement = children;
    console.log('render: transitioned:', transitioned, 'transitionDirection:', transitionDirection);
    return (
      <>

        {/* The current section */}
        { sectionSlug ? (
          <StyledSectionContainer
            className={transitionReady || transitioned ? classNames({ [transitionDirection === 1 ? 'right' : 'left']: transitioned }) : null}
            key={sectionSlug}
            ref={(ref) => console.log(ref)}
          >
            { getSectionContentElement(sectionSlug + ' current') }
          </StyledSectionContainer>
        ) : null }

        {/* The incoming section */}
        { nextSectionSlug && nextSectionSlug !== sectionSlug ? (
          <StyledSectionContainer
            className={transitionReady || transitioned ? classNames({ [-transitionDirection === 1 ? 'right' : 'left']: !transitioned }) : null}
            key={nextSectionSlug}
          >
            { getSectionContentElement(nextSectionSlug + ' next') }
          </StyledSectionContainer>
        ) : null }

      </>
    );
  };

  SectionTransitionContainer.propTypes = {
    children: PropTypes.func.isRequired,
  };

  return SectionTransitionContainer;
}

const StyledSectionContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  transition: left ${DURATIONS.slide}ms, right ${DURATIONS.slide}ms;

  &.left {
    left: auto;
    right: 100%;
  }

  &.right {
    left: 100%;
    right: auto;
  }
`;
