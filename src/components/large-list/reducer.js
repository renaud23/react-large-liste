import * as ACTIONS from "./actions";

let __LARGE_LIST_ID__ = 1;

export const INITIAL_STATE = {
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

/* ************* */

function reduceOnInit(state, action) {
  const { payload } = action;
  const { rowHeight, start, length } = payload;
  if (rowHeight) {
    return {
      ...state,
      rowHeight,
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
  const nbRows = Math.ceil(height / rowHeight);
  return { ...state, viewportHeight: height, nbRows };
}

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case ACTIONS.ON_INIT:
      return reduceOnInit(state, action);
    case ACTIONS.ON_WHEEL:
      return reduceOnWheel(state, action);
    case ACTIONS.ON_SCROLL:
      return reduceOnScroll(state, action);
    case ACTIONS.ON_RESIZE:
      return reduceOnResize(state, action);
    default:
      return state;
  }
}

export default reducer;
