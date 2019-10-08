import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';

import ReaderViewContent from './ReaderViewContent';
import {
  EXPANDED_TOC,
  POSITIONS,
  PREPARE_TRANSITION,
  START_TRANSITION,
  FINISH_TRANSITION,
  ENABLE_TRANSITION_CSS,
} from '../../constants';

import styles from '../../styles/TransitioningReaderViewContent.module.css';

const cx = classNames.bind(styles);

export default function TransitioningReaderViewContent() {
  const canvasRef = useRef();
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
  //  start transition.
  useEffect(() => {
    if (transitionPrepared && transitionCssEnabled && !transitionStarted) {
      dispatch({ type: START_TRANSITION });
    }
  }, [dispatch, transitionCssEnabled, transitionPrepared, transitionStarted]);

  //  Listen for transition end.
  useEffect(() => {
    const { current: canvas } = canvasRef;
    const handleTransitionEnd = (event) => {
      if (event.propertyName === 'right') {
        dispatch({ type: FINISH_TRANSITION });
      }
    };

    canvas.addEventListener('transitionend', handleTransitionEnd);
    return () => canvas.removeEventListener('transitionend', handleTransitionEnd);
  }, [dispatch]);

  return (
    <div className={styles.TransitioningReaderViewContent}>
      <div
        className={cx(styles.canvas, { transitionCssEnabled })}
        data-current-position={currentPosition}
        ref={canvasRef}
      >
        {[POSITIONS.left, POSITIONS.center, POSITIONS.right].map(
          (position) => (slugsByPosition[position] ? (
            <ReaderViewContent
              className={cx(styles.content, {
                active: (
                  position === POSITIONS.center && (!transitionPrepared || transitionStarted)
                ),
              })}
              key={slugsByPosition[position]}
              data-position={position}
              contentSlug={slugsByPosition[position]}
              isActive={position === POSITIONS.center}
            />
          ) : null),
        )}
      </div>
    </div>
  );
}
