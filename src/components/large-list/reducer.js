import * as ACTIONS from "./actions";

let __LARGE_LIST_ID__ = 1;

export const INITIAL_STATE = {
  viewportHeight: undefined,
  viewportWidth: undefined,
  rowHeight: undefined,
  nbRows: 0,
  maxHeight: undefined,
  maxWidth: undefined,
  scrollLeft: 0,
  scrollHorizontal: 0,
  wheelHorizontal: undefined,
  wheelVertical: undefined,
  startRow: 0,
  startTop: 0,
  length: 0,
  ariaVertical: {
    control: undefined,
    min: undefined,
    max: undefined,
    now: undefined,
  },
  ariaHorizontal: {
    control: undefined,
    min: undefined,
    max: undefined,
    now: undefined,
  },
};

/* ************* */

function reduceOnInit(state, action) {
  const { payload } = action;
  const { maxWidth, rowHeight, start, length } = payload;
  const id = `large-list-${__LARGE_LIST_ID__++}`;
  if (rowHeight) {
    return {
      ...state,
      id,
      rowHeight,
      startRow: start,
      startTop: start * rowHeight,
      maxHeight: rowHeight * length,
      maxWidth,
      length,
      ariaVertical: {
        control: id,
        min: 0,
        max: length,
        now: start,
      },
      ariaHorizontal: {
        control: id,
        min: 0,
        max: 0,
        now: 0,
      },
    };
  }
  return state;
}

function reduceOnWheelVertical(state, action) {
  const { payload } = action;
  const { delta } = payload;
  const wheel = { delta };
  return { ...state, wheelVertical: wheel };
}

function reduceOnScrollVertical(state, action) {
  const { payload } = action;
  const { percent } = payload;
  const { nbRows, length, ariaVertical } = state;
  const startRow = Math.ceil(percent * (length - nbRows));
  if (startRow >= 0) {
    return {
      ...state,
      startRow,
      ariaVertical: { ...ariaVertical, now: startRow },
    };
  }
  return state;
}

function reduceOnScrollHorizontal(state, action) {
  const { payload } = action;
  const { percent } = payload;
  const { maxWidth, viewportWidth } = state;
  const scrollLeft = Math.trunc((maxWidth - viewportWidth) * percent) || 0;

  return { ...state, scrollLeft };
}

function reduceOnResize(state, action) {
  const { payload } = action;
  const { height, width } = payload;
  const { rowHeight, startRow, length } = state;
  const nbRows = Math.min(Math.ceil(height / rowHeight), length);
  if (startRow + nbRows > length - 1) {
    return {
      ...state,
      viewportHeight: height,
      viewportWidth: width,
      nbRows,
      startRow: Math.max(length - nbRows, 0),
    };
  }

  return { ...state, viewportHeight: height, viewportWidth: width, nbRows };
}

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case ACTIONS.ON_INIT:
      return reduceOnInit(state, action);
    case ACTIONS.ON_WHEEL_VERTICAL:
      return reduceOnWheelVertical(state, action);
    case ACTIONS.ON_SCROLL_VERTICAL:
      return reduceOnScrollVertical(state, action);
    case ACTIONS.ON_SCROLL_HORIZONTAL:
      return reduceOnScrollHorizontal(state, action);
    case ACTIONS.ON_RESIZE:
      return reduceOnResize(state, action);
    default:
      return state;
  }
}

export default reducer;
