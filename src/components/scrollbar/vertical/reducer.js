import * as ACTIONS from "./actions";

export const INITIAL_STATE = {
  tTop: 0,
  tHeight: 0,
  pHeight: 0,
  drag: false,
  clientY: undefined,
  scrollPercent: 0,
  refresh: false,
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

    return { ...state, tTop: next, refresh: true };
  }
  return state;
}

function reduceOnInit(state, action) {
  const { payload } = action;
  const { height, max, start } = payload;
  const pHeight = Math.trunc((height / max) * height);
  const tHeight = Math.max(pHeight, 10);
  const tTop = Math.min(
    Math.max(Math.trunc((start / max) * height), 0),
    height - tHeight
  );
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
  const delta = mouseY - (clientY || mouseY);
  const top = Math.min(Math.max(tTop + delta, 0), height - tHeight);

  return { ...state, clientY: mouseY, tTop: top, refresh: true };
}

function reduceOnStopDrag(state) {
  return { ...state, drag: false, clientY: undefined };
}

function reduceOnChangeScroll(state) {
  const { tTop, height, tHeight, pHeight } = state;
  const scrollPercent = tTop / (height + pHeight - tHeight);
  return { ...state, scrollPercent, refresh: false };
}

function reduceOnResize(state, action) {
  const { payload } = action;
  const { height } = payload;
  const { max, tTop: tOld, height: hOld } = state;
  const pHeight = Math.trunc((height / max) * height);
  const tHeight = Math.max(pHeight, 10);
  const tTop = Math.min((tOld / hOld) * height, height - tHeight);
  const scrollPercent = tTop / (height + pHeight - tHeight);
  return { ...state, height, pHeight, tHeight, tTop, scrollPercent };
}

function reduceOnMouseDown(state, action) {
  const { payload } = action;
  const { clientY } = payload;
  const { tHeight, height } = state;
  const tTop = Math.min(Math.min(clientY, height - tHeight));
  return { ...state, tTop };
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
