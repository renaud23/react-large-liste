import * as ACTIONS from "./actions";

export const INITIAL_STATE = {
  tPos: 0,
  tSize: 0,
  pSize: 0,
  drag: false,
  clientPos: undefined,
  scrollPercent: 0,
  refresh: false,
  first: true,
};

/* ************************** */

const __TRACK_MIN_WIDTH__ = 10;

function reduceOnInit(state, action) {
  const { payload } = action;
  const { size, max, start } = payload;
  const { scrollPercent, first } = state;
  const pSize = Math.trunc((size / max) * size);
  const tSize = Math.max(pSize, __TRACK_MIN_WIDTH__);
  if (first) {
    const tPos = Math.min(Math.trunc((start / max) * size), size - tSize);
    return { ...state, size, max, start, tPos, tSize, pSize, first: false };
  }
  const tPos = Math.max(
    Math.min(scrollPercent * (size - tSize), size - tSize),
    0
  );
  return { ...state, size, max, start, tPos, tSize, pSize };
}

function reduceOnResize(state, action) {
  const { payload } = action;
  const { size } = payload;
  const { max, scrollPercent } = state;
  const pSize = Math.ceil((size / max) * size);
  const tSize = Math.max(pSize, __TRACK_MIN_WIDTH__);
  const tPos = Math.max(
    Math.min(scrollPercent * (size - tSize), size - tSize),
    0
  );

  return {
    ...state,
    size,
    pSize,
    tSize,
    tPos,
  };
}

function reduceOnStartDrag(state, action) {
  const { payload } = action;
  const { clientPos } = payload;
  return { ...state, drag: true, clientPos };
}

function reduceOnDrag(state, action) {
  const { payload } = action;
  const { mousePos } = payload;
  const { tPos, size, tSize, clientPos } = state;
  const delta = mousePos - (clientPos || mousePos);
  const pos = Math.min(Math.max(tPos + delta, 0), size - tSize);
  return { ...state, clientPos: mousePos, tPos: pos, refresh: true };
}

function reduceOnWheel(state, action) {
  const { tPos, size, tSize, max } = state;
  const {
    payload: { delta },
  } = action;
  if (delta !== 0) {
    const percent = delta / max;
    const next = Math.min(Math.max(tPos + size * percent, 0), size - tSize);
    return { ...state, tPos: next, refresh: true };
  }
  return state;
}

function reduceOnStopDrag(state) {
  return { ...state, drag: false, clientPos: undefined };
}

function reduceOnChangeScroll(state) {
  const { tPos, size, tSize } = state;
  const scrollPercent = tPos / (size - tSize);
  return { ...state, scrollPercent, refresh: false };
}

function reduceOnMouseDown(state, action) {
  const { payload } = action;
  const { clientPos } = payload;
  const { tSize, size } = state;
  const tPos = Math.min(clientPos, size - tSize);
  return { ...state, tPos, refresh: true };
}

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case ACTIONS.ON_WHEEL:
      return reduceOnWheel(state, action);
    case ACTIONS.ON_INIT:
      return reduceOnInit(state, action);
    case ACTIONS.ON_START_DRAG:
      return reduceOnStartDrag(state, action);
    case ACTIONS.ON_DRAG:
      return reduceOnDrag(state, action);
    case ACTIONS.ON_STOP_DRAG:
      return reduceOnStopDrag(state, action);
    case ACTIONS.ON_CHANGE_SCROLL:
      return reduceOnChangeScroll(state, action);
    case ACTIONS.ON_RESIZE:
      return reduceOnResize(state, action);
    case ACTIONS.ON_MOUSE_DOWN:
      return reduceOnMouseDown(state, action);
    default:
      return state;
  }
}
export default reducer;
