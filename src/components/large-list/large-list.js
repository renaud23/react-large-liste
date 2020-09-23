import React, { useEffect, useRef, useCallback, useReducer } from "react";
// import ResizeObserver from "resize-observer-polyfill";
import classnames from "classnames";
import { VerticalScrollbar, HorizontalScrollbar } from "../scrollbar";
import * as ACTIONS from "./actions";
import reducer, { INITIAL_STATE } from "./reducer";
import "./large-list.scss";

function LargeList({
  elements = [],
  maxWidth,
  rowHeight,
  start,
  component: Component,
  className,
}) {
  const containerEl = useRef();
  const ulEl = useRef();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const {
    id,
    nbRows,
    wheelVertical,
    wheelHorizontal,
    startRow,
    maxHeight,
    startTop,
    ariaVertical,
    ariaHorizontal,
    scrollLeft,
  } = state;

  const { current } = containerEl;
  useEffect(
    function () {
      let observer;
      if (current) {
        observer = new ResizeObserver(function () {
          const { height, width } = current.getBoundingClientRect();
          dispatch(ACTIONS.onResize(width, height));
        });
        observer.observe(current);
      }

      return function () {
        if (observer) {
          observer.unobserve(current);
        }
      };
    },
    [current]
  );

  const { current: ulCurrent } = ulEl;
  useEffect(
    function () {
      if (ulCurrent) {
        ulCurrent.scrollLeft = scrollLeft;
      }
    },
    [ulCurrent, scrollLeft]
  );

  useEffect(
    function () {
      if (current) {
        const { length } = elements;
        dispatch(ACTIONS.onInit({ maxWidth, rowHeight, start, length }));
      }
    },
    [current, rowHeight, start, maxWidth, elements]
  );

  /* hook */
  const onChangeScrollVerticalPercent = useCallback(function (percent) {
    if (!isNaN(percent)) {
      dispatch(ACTIONS.onScrollVertical(percent));
    }
  }, []);

  const onChangeScrollHorizontalPercent = useCallback(function (percent) {
    if (!isNaN(percent)) {
      dispatch(ACTIONS.onScrollHorizontal(percent));
    }
  }, []);

  const keyDown = useCallback(
    function () {
      dispatch(ACTIONS.onWheelVertical(rowHeight));
    },
    [rowHeight]
  );

  const keyUp = useCallback(
    function () {
      dispatch(ACTIONS.onWheelVertical(-rowHeight));
    },
    [rowHeight]
  );

  const keyPageUp = useCallback(
    function () {
      dispatch(ACTIONS.onWheelVertical(-rowHeight * nbRows));
    },
    [nbRows, rowHeight]
  );

  const keyPageDown = useCallback(
    function () {
      dispatch(ACTIONS.onWheelVertical(rowHeight * nbRows));
    },
    [nbRows, rowHeight]
  );

  const li = new Array(nbRows).fill(null).map(function (_, i) {
    const element = elements[startRow + i];
    return (
      <li key={i} style={{ height: rowHeight, width: maxWidth }}>
        <Component {...element} index={i} />
      </li>
    );
  });

  return (
    <div
      className={classnames("react-large-list", className)}
      tabIndex="0"
      ref={containerEl}
      onWheel={function (e) {
        e.stopPropagation();
        dispatch(ACTIONS.onWheelVertical(e.deltaY));
      }}
      onKeyDown={function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.key === "ArrowDown") {
          keyDown();
        } else if (e.key === "ArrowUp") {
          keyUp();
        } else if (e.key === "PageUp") {
          keyPageUp();
        } else if (e.key === "PageDown") {
          keyPageDown();
        }
      }}
    >
      <VerticalScrollbar
        max={maxHeight}
        start={startTop}
        ariaMax={ariaVertical.max}
        ariaMin={ariaVertical.min}
        ariaNow={ariaVertical.now}
        ariaControl={ariaVertical.control}
        onScroll={onChangeScrollVerticalPercent}
        parentWheel={wheelVertical}
      />
      <HorizontalScrollbar
        max={maxWidth}
        start={0}
        ariaMax={ariaHorizontal.max}
        ariaMin={ariaHorizontal.min}
        ariaNow={ariaHorizontal.now}
        ariaControl={ariaHorizontal.control}
        onScroll={onChangeScrollHorizontalPercent}
        parentWheel={wheelHorizontal}
      />
      <ul ref={ulEl} id={id}>
        {li}
      </ul>
    </div>
  );
}

export default React.memo(LargeList);
