import React, { useEffect, useCallback, useReducer, useRef } from "react";
import * as ACTIONS from "./actions";
import classnames from "classnames";
import reducer, { INITIAL_STATE } from "./reducer";
import "./scrollbar.scss";

function VerticalScrollBar({
  start,
  max,
  ariaNow,
  ariaMax,
  ariaMin,
  ariaControl,
  parentWheel,
  onScroll = () => null,
}) {
  const containerEl = useRef();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { tTop, tHeight, pHeight, drag, scrollPercent, height } = state;

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
        const { height } = containerEl.current.getBoundingClientRect();
        dispatch(ACTIONS.onInit(start, height, max));
      }
    },
    [start, containerEl, max]
  );

  useEffect(
    function () {
      if (containerEl.current) {
        const observer = new ResizeObserver(function () {
          const { height } = containerEl.current.getBoundingClientRect();
          dispatch(ACTIONS.onResize(height));
        });
        observer.observe(containerEl.current);
      }
    },
    [containerEl]
  );

  useEffect(
    function () {
      const percent = tTop / (height + pHeight - tHeight);
      dispatch(ACTIONS.onChangeScroll(percent));
    },
    [tTop, height, pHeight, tHeight]
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
        dispatch(ACTIONS.onDrag(e.clientY));
      }
    },
    [drag]
  );

  const onMouseDown = useCallback(function (e) {
    e.stopPropagation();
    const { top } = e.target.getBoundingClientRect();
    const clientY = e.clientY - top;
    dispatch(ACTIONS.onMouseDown(clientY));
  }, []);

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

  return (
    <div
      className={classnames("custom-vertical-scrollBar", { drag })}
      role="scrollbar"
      aria-controls={ariaControl}
      aria-orientation="vertical"
      aria-valuemax={ariaMax}
      aria-valuemin={ariaMin}
      aria-valuenow={ariaNow}
      ref={containerEl}
      onMouseDown={onMouseDown}
    >
      <div
        className="custom-vertical-scrollBar-track"
        style={{ top: tTop, height: tHeight }}
        draggable="false"
        onDragStart={(e) => {
          e.preventDefault();
          return false;
        }}
        onMouseDown={function (e) {
          e.stopPropagation();
          if (e.button === 0) {
            dispatch(ACTIONS.onStartDrag(e.clientY));
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
          dispatch(ACTIONS.onWheel(e.deltaY));
        }}
      ></div>
    </div>
  );
}

export default React.memo(VerticalScrollBar);
