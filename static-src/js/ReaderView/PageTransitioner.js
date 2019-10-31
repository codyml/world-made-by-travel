import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNamesBind from 'classnames/bind';

import style from 'styles/PageTransitioner.module.css';
import SectionContent from '../SectionContent';
import {
  EXPANDED_TOC,
  POSITIONS,
  PREPARE_TRANSITION,
  START_TRANSITION,
  FINISH_TRANSITION,
  ENABLE_TRANSITION_CSS,
} from '../constants';

const cx = classNamesBind.bind(style);

export default function PageTransitioner() {
  const canvasRef = useRef();
  const nextSlug = useSelector((state) => state.currentSectionSlug);
  const sectionMetaBySlug = useSelector((state) => ({
    [EXPANDED_TOC.slug]: EXPANDED_TOC,
    ...state.sectionMetaBySlug,
  }));

  const slugsByTransitionPosition = useSelector((state) => state.slugsByTransitionPosition);
  const currentTransitionPosition = useSelector((state) => state.currentTransitionPosition);
  const transitionPrepared = useSelector((state) => state.transitionPrepared);
  const transitionCssEnabled = useSelector((state) => state.transitionCssEnabled);
  const transitionStarted = useSelector((state) => state.transitionStarted);
  const dispatch = useDispatch();

  const currentSlug = slugsByTransitionPosition[POSITIONS.center];
  const nextSlugStartPosition = React.useMemo(() => {
    const currentIndex = currentSlug ? sectionMetaBySlug[currentSlug].index : -1;
    const nextIndex = sectionMetaBySlug[nextSlug].index;
    return nextIndex > currentIndex ? POSITIONS.right : POSITIONS.left;
  }, [currentSlug, nextSlug, sectionMetaBySlug]);

  //  If transition not already prepared and slug changed, prepare
  //  transition.
  useEffect(() => {
    if (!transitionPrepared && nextSlug !== currentSlug) {
      dispatch({ type: PREPARE_TRANSITION, nextSlug, nextSlugStartPosition });
    }
  }, [currentSlug, dispatch, nextSlug, nextSlugStartPosition, transitionPrepared]);

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
      dispatch({ type: START_TRANSITION, nextSlugStartPosition });
    }
  }, [
    dispatch,
    nextSlugStartPosition,
    transitionCssEnabled,
    transitionPrepared,
    transitionStarted,
  ]);

  //  Listen for transition end.
  useEffect(() => {
    const { current: canvas } = canvasRef;
    const handleTransitionEnd = (event) => {
      if (event.propertyName === 'left') {
        dispatch({ type: FINISH_TRANSITION, nextSlug });
      }
    };

    canvas.addEventListener('transitionend', handleTransitionEnd);
    return () => canvas.removeEventListener('transitionend', handleTransitionEnd);
  }, [dispatch, nextSlug]);

  return (
    <div className={style.PageTransitioner}>
      <div
        className={cx(style.canvas, { transitionCssEnabled })}
        data-current-position={currentTransitionPosition}
        ref={canvasRef}
      >
        {[POSITIONS.left, POSITIONS.center, POSITIONS.right].map(
          (position) => (
            <div
              className={cx(style.content, { active: position === currentTransitionPosition })}
              key={slugsByTransitionPosition[position] || position}
              data-position={position}
            >
              {slugsByTransitionPosition[position] ? (
                <SectionContent sectionSlug={slugsByTransitionPosition[position]} />
              ) : null}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
