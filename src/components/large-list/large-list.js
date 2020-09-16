import React, { useEffect, useRef, useCallback, useReducer } from "react";
import { VerticalScrollbar } from "../scrollbar";
import * as ACTIONS from "./actions";
import reducer, { INITIAL_STATE } from "./reducer";
import "./large-list.scss";

function LargeList({ elements = [], rowHeight, start, component: Component }) {
  const containerEl = useRef();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { nbRows, wheel, startRow, maxHeight, startTop, aria } = state;

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
      if (containerEl.current) {
        const { length } = elements;
        dispatch(ACTIONS.onInit({ rowHeight, start, length }));
      }
    },
    [containerEl, rowHeight, start, elements]
  );

  /* hook */
  const onChangeScrollPercent = useCallback(function (percent) {
    if (!isNaN(percent)) {
      dispatch(ACTIONS.onScroll(percent));
    }
  }, []);

  const keyDown = useCallback(
    function () {
      dispatch(ACTIONS.onWheel(rowHeight));
    },
    [rowHeight]
  );

  const keyUp = useCallback(
    function () {
      dispatch(ACTIONS.onWheel(-rowHeight));
    },
    [rowHeight]
  );

  const keyPageUp = useCallback(
    function () {
      dispatch(ACTIONS.onWheel(-rowHeight * nbRows));
    },
    [nbRows, rowHeight]
  );

  const keyPageDown = useCallback(
    function () {
      dispatch(ACTIONS.onWheel(rowHeight * nbRows));
    },
    [nbRows, rowHeight]
  );

  const li = new Array(nbRows).fill(null).map(function (_, i) {
    const element = elements[startRow + i];
    return (
      <li id={aria.control} key={i} style={{ height: rowHeight }}>
        <Component {...element} index={i} />
      </li>
    );
  });

  return (
    <div
      className="react-large-list"
      tabIndex="0"
      ref={containerEl}
      onWheel={function (e) {
        e.stopPropagation();
        dispatch(ACTIONS.onWheel(e.deltaY));
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
        ariaMax={aria.max}
        ariaMin={aria.min}
        ariaNow={aria.now}
        ariaControl={aria.control}
        onScroll={onChangeScrollPercent}
        parentWheel={wheel}
      />
      <ul>{li}</ul>
    </div>
  );
}

export default React.memo(LargeList);
