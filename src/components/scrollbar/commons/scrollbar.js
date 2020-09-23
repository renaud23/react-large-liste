import React, { useEffect, useCallback, useReducer, useRef } from "react";
// import ResizeObserver from "resize-observer-polyfill";
import * as ACTIONS from "./actions";
import classnames from "classnames";
import reducer, { INITIAL_STATE } from "./reducer";

function getOffsetSize(e) {
  //e.getBoundingClientRect();
  return { width: e.clientWidth, height: e.clientHeight - 0 };
}

function getStyle(vertical, state) {
  const { tPos, tSize } = state;
  if (vertical) {
    return { top: tPos, height: tSize };
  }
  return { left: tPos, width: tSize };
}

function ScrollBar({
  rootClassName,
  start,
  max,
  ariaNow,
  ariaMax,
  ariaMin,
  ariaControl,
  parentWheel,
  vertical = false,
  onScroll = () => null,
}) {
  const containerEl = useRef();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { drag, scrollPercent, refresh, size } = state;

  useEffect(
    function () {
      if (parentWheel) {
        const { delta } = parentWheel;
        dispatch(ACTIONS.onWheel(delta));
      }
    },
    [parentWheel]
  );

  useEffect(
    function () {
      if (containerEl.current && max) {
        const { width, height } = getOffsetSize(containerEl.current);
        getOffsetSize(containerEl.current);
        dispatch(ACTIONS.onInit(start, vertical ? height : width, max));
      }
    },
    [start, containerEl, max, vertical]
  );

  const { current } = containerEl;
  useEffect(
    function () {
      if (current) {
        const observer = new ResizeObserver(function () {
          const { width, height } = getOffsetSize(current); //current.getBoundingClientRect();
          dispatch(ACTIONS.onResize(vertical ? height : width));
        });
        observer.observe(current);
      }
    },
    [current, vertical]
  );

  useEffect(
    function () {
      if (refresh) {
        dispatch(ACTIONS.onChangeScroll());
      }
    },
    [refresh]
  );

  useEffect(
    function () {
      onScroll(scrollPercent);
    },
    [scrollPercent, onScroll]
  );

  const windowMouseup = useCallback(
    function (e) {
      if (drag) {
        e.stopPropagation();
        dispatch(ACTIONS.onStopDrag());
      }
    },
    [drag]
  );

  const windowMousemove = useCallback(
    function (e) {
      if (drag) {
        const { clientX, clientY } = e;
        dispatch(ACTIONS.onDrag(vertical ? clientY : clientX));
      }
    },
    [drag, vertical]
  );

  const onMouseDown = useCallback(
    function (e) {
      e.stopPropagation();
      const { left, top } = e.target.getBoundingClientRect();
      const clientPos = vertical ? e.clientY - top : e.clientX - left;
      dispatch(ACTIONS.onMouseDown(clientPos));
    },
    [vertical]
  );

  useEffect(
    function () {
      window.addEventListener("mouseup", windowMouseup);
      window.addEventListener("mousemove", windowMousemove);
      return () => {
        window.removeEventListener("mouseup", windowMouseup);
        window.removeEventListener("mousemove", windowMousemove);
      };
    },
    [windowMouseup, windowMousemove]
  );

  const hide = max <= size;
  return (
    <div
      className={classnames(rootClassName, { drag, hide })}
      role="scrollbar"
      aria-controls={ariaControl}
      aria-orientation="vertical"
      aria-valuemax={ariaMax}
      aria-valuemin={ariaMin}
      aria-valuenow={ariaNow}
      ref={containerEl}
      onMouseDown={onMouseDown}
    >
      {hide ? null : (
        <div
          className={`${rootClassName}-track`}
          style={getStyle(vertical, state)}
          draggable="false"
          onDragStart={(e) => {
            e.preventDefault();
            return false;
          }}
          onMouseDown={function (e) {
            e.stopPropagation();
            if (e.button === 0) {
              const { clientX, clientY } = e;
              dispatch(ACTIONS.onStartDrag(vertical ? clientY : clientX));
            }
          }}
          onMouseUp={function (e) {
            if (e.button === 0) {
              e.stopPropagation();
              dispatch(ACTIONS.onStopDrag());
            }
          }}
          onWheel={function (e) {
            e.stopPropagation();
            dispatch(ACTIONS.onWheel(vertical ? e.deltaY : e.deltaX));
          }}
        ></div>
      )}
    </div>
  );
}

export default React.memo(ScrollBar);
