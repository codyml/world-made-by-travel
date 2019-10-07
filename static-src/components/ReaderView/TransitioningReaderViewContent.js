import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import ReaderViewContent from '../ReaderViewContent';
import { DURATION, PAGE_GUTTER } from '../../styles';
import {
  EXPANDED_TOC,
  POSITIONS,
  PREPARE_TRANSITION,
  START_TRANSITION,
  FINISH_TRANSITION,
  ENABLE_TRANSITION_CSS,
} from '../../constants';

const POSITION_OFFSETS = {
  [POSITIONS.left]: 0,
  [POSITIONS.center]: 1,
  [POSITIONS.right]: 2,
};

export default function TransitioningReaderViewContent() {
  const nextSlug = useSelector((state) => state.currentSectionSlug);
  const sectionMetaBySlug = useSelector((state) => ({
    [EXPANDED_TOC.slug]: EXPANDED_TOC,
    ...state.sectionMetaBySlug,
  }));

  const {
    slugsByPosition,
    currentPosition,
    transitionPrepared,
    transitionCssEnabled,
    transitionStarted,
  } = useSelector((state) => state.readerViewTransition);

  const dispatch = useDispatch();

  //  If transition not already prepared and slug changed, prepare
  //  transition.
  useEffect(() => {
    if (!transitionPrepared && nextSlug !== slugsByPosition[POSITIONS.center]) {
      const [currentIndex, nextIndex] = [slugsByPosition[POSITIONS.center], nextSlug].map(
        (slug) => sectionMetaBySlug[slug].index,
      );

      const startPosition = nextIndex - currentIndex > 0 ? POSITIONS.left : POSITIONS.right;
      dispatch({ type: PREPARE_TRANSITION, startPosition, nextSlug });
    }
  }, [dispatch, nextSlug, sectionMetaBySlug, slugsByPosition, transitionPrepared]);

  //  If transition prepared but CSS not enabled, enable transition
  //  CSS.
  useEffect(() => {
    if (transitionPrepared && !transitionCssEnabled) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          dispatch({ type: ENABLE_TRANSITION_CSS });
        });
      });
    }
  }, [dispatch, transitionCssEnabled, transitionPrepared]);

  //  If transition prepared and CSS enabled but not already started,
  //  start transition and schedule transition finish
  useEffect(() => {
    if (transitionPrepared && transitionCssEnabled && !transitionStarted) {
      dispatch({ type: START_TRANSITION });
      setTimeout(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            dispatch({ type: FINISH_TRANSITION });
          });
        });
      }, DURATION.pageTransition);
    }
  }, [dispatch, transitionCssEnabled, transitionPrepared, transitionStarted]);

  return (
    <StyledTransitioningReaderViewContent>
      <StyledReaderViewContentCanvas
        transitionCssEnabled={transitionCssEnabled}
        currentPageOffset={POSITION_OFFSETS[currentPosition]}
      >
        {[POSITIONS.left, POSITIONS.center, POSITIONS.right].map(
          (position) => (slugsByPosition[position] ? (
            <StyledReaderViewContent
              key={slugsByPosition[position]}
              pageOffset={POSITION_OFFSETS[position]}
              contentSlug={slugsByPosition[position]}
              isActive={position === POSITIONS.center && (!transitionPrepared || transitionStarted)}
            />
          ) : null),
        )}
      </StyledReaderViewContentCanvas>
    </StyledTransitioningReaderViewContent>
  );
}

const StyledTransitioningReaderViewContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StyledReaderViewContentCanvas = React.memo(styled.div`
  position: absolute;
  top: 0;
  right: ${(p) => `calc(${p.currentPageOffset * 100}% + ${p.currentPageOffset * PAGE_GUTTER}px)`};
  width: 100%;
  height: 100%;
  transition: ${(p) => (p.transitionCssEnabled ? `right ${DURATION.pageTransition}ms` : 'none')};
`);

const StyledReaderViewContent = styled(ReaderViewContent)`
  position: absolute;
  top: 0;
  left: ${(p) => `calc(${p.pageOffset * 100}% + ${p.pageOffset * PAGE_GUTTER}px)`};
  width: 100%;
  height: 100%;
  transform: scale(${(p) => (p.isActive ? 1 : 0.95)});
  opacity: ${(p) => (p.isActive ? 1 : 0)};
  transition: transform ${DURATION.fade}ms, opacity ${DURATION.fade}ms;
`;
