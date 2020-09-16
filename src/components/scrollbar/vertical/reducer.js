import * as ACTIONS from "./actions";

export const INITIAL_STATE = {
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
  const delta = mouseY - (clientY || 1);
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
    default:
      return state;
  }
}
export default reducer;
