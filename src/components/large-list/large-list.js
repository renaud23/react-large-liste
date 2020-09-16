import React, { useEffect, useRef, useCallback, useReducer } from "react";
import { VerticalScrollbar } from "../scrollbar";
import "./large-list.scss";

let __LARGE_LIST_ID__ = 1;

const INITIAL_STATE = {
  viewportHeight: undefined,
  rowHeight: undefined,
  nbRows: 0,
  maxHeight: undefined,
  wheel: undefined,
  startRow: 0,
  startTop: 0,
  length: 0,
  aria: { control: undefined, min: undefined, max: undefined, now: undefined },
};

const ON_INIT = "react-large-liste/on-init";
const onInit = ({ height, rowHeight, start, length }) => ({
  type: ON_INIT,
  payload: { height, rowHeight, start, length },
});

const ON_WHEEL = "react-large-liste/on-wheel";
const onWheel = (delta) => ({
  type: ON_WHEEL,
  payload: { delta },
});

const ON_SCROLL = "react-large-liste/on-scroll";
const onScroll = (percent) => ({ type: ON_SCROLL, payload: { percent } });

const ON_RESIZE = "react-large-liste/on-resize";
const onResize = (height) => ({ type: ON_RESIZE, payload: { height } });
/* ************* */

function reduceOnInit(state, action) {
  const { payload } = action;
  const { rowHeight, start, length } = payload;
  if (rowHeight) {
    // const nbRows = Math.trunc(height / rowHeight);
    return {
      ...state,
      // viewportHeight: height,
      rowHeight,
      // nbRows,
      startRow: start,
      startTop: start * rowHeight,
      maxHeight: rowHeight * length,
      length,
      aria: {
        control: `large-list-${__LARGE_LIST_ID__++}`,
        min: 0,
        max: length,
        now: start,
      },
    };
  }
  return state;
}

function reduceOnWheel(state, action) {
  const { payload } = action;
  const { delta } = payload;
  const wheel = { delta };
  return { ...state, wheel };
}

function reduceOnScroll(state, action) {
  const { payload } = action;
  const { percent } = payload;
  const { nbRows, length, aria } = state;
  const startRow = Math.min(Math.ceil(percent * length), length - nbRows);
  if (startRow >= 0) {
    return { ...state, startRow, aria: { ...aria, now: startRow } };
  }
  return state;
}

function reduceOnResize(state, action) {
  const { payload } = action;
  const { height } = payload;
  const { rowHeight } = state;
  const nbRows = Math.trunc(height / rowHeight);
  return { ...state, viewportHeight: height, nbRows };
}

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case ON_INIT:
      return reduceOnInit(state, action);
    case ON_WHEEL:
      return reduceOnWheel(state, action);
    case ON_SCROLL:
      return reduceOnScroll(state, action);
    case ON_RESIZE:
      return reduceOnResize(state, action);
    default:
      return state;
  }
}

/* ************* */

function LargeList({ elements = [], rowHeight, start, component: Component }) {
  const containerEl = useRef();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { nbRows, wheel, startRow, maxHeight, startTop, aria } = state;

  // useEffect(
  //   function () {
  //     if (containerEl.current) {
  //       const observer = new ResizeObserver(function () {
  //         const { height } = containerEl.current.getBoundingClientRect();
  //         const { length } = elements;
  //         dispatch(onInit({ height, rowHeight, start, length }));
  //       });

  //       observer.observe(containerEl.current);
  //     }
  //   },
  //   [containerEl, rowHeight, start, elements]
  // );

  useEffect(
    function () {
      if (containerEl.current) {
        const observer = new ResizeObserver(function () {
          const { height } = containerEl.current.getBoundingClientRect();
          dispatch(onResize(height));
        });
        observer.observe(containerEl.current);
      }
    },
    [containerEl]
  );

  useEffect(
    function () {
      if (containerEl.current) {
        // const { height } = containerEl.current.getBoundingClientRect();
        const { length } = elements;
        dispatch(onInit({ rowHeight, start, length }));
      }
    },
    [containerEl, rowHeight, start, elements]
  );

  /* hook */
  const onChangeScrollPercent = useCallback(function (percent) {
    if (!isNaN(percent)) {
      dispatch(onScroll(percent));
    }
  }, []);

  const keyDown = useCallback(
    function () {
      dispatch(onWheel(rowHeight));
    },
    [rowHeight]
  );

  const keyUp = useCallback(
    function () {
      dispatch(onWheel(-rowHeight));
    },
    [rowHeight]
  );

  const keyPageUp = useCallback(
    function () {
      dispatch(onWheel(-rowHeight * nbRows));
    },
    [nbRows, rowHeight]
  );

  const keyPageDown = useCallback(
    function () {
      dispatch(onWheel(rowHeight * nbRows));
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
        dispatch(onWheel(e.deltaY));
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
