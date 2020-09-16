import React, { useEffect, useCallback, useReducer } from "react";
import "./scrollbar.scss";

/* *** */

const ON_WHEEL = "react-large-liste/on-wheel";
const onWheel = (delta) => ({ type: ON_WHEEL, payload: { delta } });

const ON_START_DRAG = "react-large-liste/on-start-drag";
const onStartDrag = (clientY) => ({
  type: ON_START_DRAG,
  payload: { clientY },
});

const ON_DRAG = "react-large-liste/on-drag";
const onDrag = (mouseY) => ({
  type: ON_DRAG,
  payload: { mouseY },
});

const ON_STOP_DRAG = "react-large-liste/on-stop-drag";
const onStopDrag = () => ({ type: ON_STOP_DRAG });

const ON_INIT = "react-large-liste/on-init";
const onInit = (start, height, max) => ({
  type: ON_INIT,
  payload: { start, height, max },
});

const ON_CHANGE_SCROLL = "react-large-liste/on-change-scroll";
const onChangeScroll = (percent) => ({
  type: ON_CHANGE_SCROLL,
  payload: { percent },
});

const INITIAL_STATE = {
  tTop: 0,
  tHeight: 0,
  pHeight: 0,
  drag: false,
  clientY: undefined,
  scrollPercent: 0,
};

/* ************************** */
function reduceOnWheel(state, action) {
  const { tTop, height, tHeight, max } = state;
  const {
    payload: { delta },
  } = action;
  if (delta !== 0) {
    const percent = delta / max;
    const next = Math.min(
      Math.max(tTop + height * percent, 0),
      height - tHeight
    );

    return { ...state, tTop: next };
  }
  return state;
}

function reduceOnInit(state, action) {
  const { payload } = action;
  const { height, max, start } = payload;
  const pHeight = Math.trunc((height / max) * height);
  const tHeight = Math.max(pHeight, 10);
  const tTop = 0;
  return { ...state, height, max, start, tTop, tHeight, pHeight };
}

function reduceOnStartDrag(state, action) {
  const { payload } = action;
  const { clientY } = payload;
  return { ...state, drag: true, clientY: clientY };
}

function reduceOnDrag(state, action) {
  const { payload } = action;
  const { mouseY } = payload;
  const { tTop, height, tHeight, clientY } = state;
  const delta = mouseY - clientY;
  const top = Math.min(Math.max(tTop + delta, 0), height - tHeight);

  return { ...state, clientY: mouseY, tTop: top };
}

function reduceOnStopDrag(state) {
  return { ...state, drag: false, clientY: undefined };
}

function reduceOnChangeScroll(state, action) {
  const { payload } = action;
  const { percent } = payload;
  return { ...state, scrollPercent: percent };
}

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case ON_WHEEL:
      return reduceOnWheel(state, action);
    case ON_INIT:
      return reduceOnInit(state, action);
    case ON_START_DRAG:
      return reduceOnStartDrag(state, action);
    case ON_DRAG:
      return reduceOnDrag(state, action);
    case ON_STOP_DRAG:
      return reduceOnStopDrag(state, action);
    case ON_CHANGE_SCROLL:
      return reduceOnChangeScroll(state, action);
    default:
      return state;
  }
}

function VerticalScrollBar({
  idParent,
  start,
  height,
  max,
  ariaNow,
  ariaMax,
  ariaMin,
  ariaControl,
  parentWheel,
  onScroll = () => null,
}) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { tTop, tHeight, pHeight, drag, scrollPercent } = state;

  useEffect(
    function () {
      if (parentWheel !== 0) {
        const { delta } = parentWheel;
        dispatch(onWheel(delta));
      }
    },
    [parentWheel]
  );

  useEffect(
    function () {
      if (height && max) {
        dispatch(onInit(start, height, max));
      }
    },
    [start, height, max]
  );

  useEffect(
    function () {
      const percent = tTop / (height + pHeight - tHeight);
      dispatch(onChangeScroll(percent));
    },
    [tTop, height, pHeight, tHeight]
  );

  useEffect(
    function () {
      onScroll(scrollPercent);
    },
    [scrollPercent, onScroll]
  );

  const mouseup = useCallback(
    function (e) {
      if (drag) {
        e.stopPropagation();
        dispatch(onStopDrag());
      }
    },
    [drag]
  );
  const mousemove = useCallback(
    function (e) {
      if (drag) {
        dispatch(onDrag(e.clientY));
      }
    },
    [drag]
  );

  useEffect(
    function () {
      window.addEventListener("mouseup", mouseup);
      window.addEventListener("mousemove", mousemove);
      return () => {
        window.removeEventListener("mouseup", mouseup);
        window.removeEventListener("mousemove", mousemove);
      };
    },
    [mouseup, mousemove]
  );

  if (!height || !tHeight || height >= max) {
    return null;
  }

  return (
    <div
      className="custom-vertical-scrollBar"
      aria-controls={ariaControl}
      aria-orientation="vertical"
      aria-valuemax={ariaMax}
      aria-valuemin={ariaMin}
      aria-valuenow={ariaNow}
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
            dispatch(onStartDrag(e.clientY));
          }
        }}
        onMouseUp={function (e) {
          if (e.button === 0) {
            e.stopPropagation();
            dispatch(onStopDrag());
          }
        }}
        onWheel={function (e) {
          e.stopPropagation();
          dispatch(onWheel(e.deltaY));
        }}
      ></div>
    </div>
  );
}

export default React.memo(VerticalScrollBar);
