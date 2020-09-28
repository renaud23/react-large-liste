import * as ACTIONS from "./actions";
import { extractFromPayload } from "./reducer";

const KEY_MAPPING = {
  arrowUp: "ArrowUp",
  arrowDown: "ArrowDown",
  pageUp: "PageUp",
  pageDown: "PageDown",
};

function reduceOnRowUp(state, action) {
  const { rowStart } = state;
  const next = Math.max(rowStart - 1, 0);
  return { ...state, rowStart: next };
}

function reduceOnRowDown(state, action) {
  const { rowStart, rows, nbRows } = state;
  const next = Math.min(rowStart + 1, rows.length - nbRows);
  return { ...state, rowStart: next };
}

function reduceOnPageUp(state, action) {
  const { rowStart, nbRows } = state;
  const next = Math.max(rowStart - nbRows, 0);
  return { ...state, rowStart: next };
}

function reduceOnPageDown(state, action) {
  const { rowStart, rows, nbRows } = state;
  const next = Math.min(rowStart + nbRows, rows.length - nbRows);
  return { ...state, rowStart: next };
}

function reduceOnVerticalWheel(state, action) {
  const { key } = extractFromPayload(action, "key");
  switch (key) {
    case KEY_MAPPING.arrowDown:
      return reduceOnRowDown(state, action);
    case KEY_MAPPING.arrowUp:
      return reduceOnRowUp(state, action);
    case KEY_MAPPING.pageUp:
      return reduceOnPageUp(state, action);
    case KEY_MAPPING.pageDown:
      return reduceOnPageDown(state, action);
    default:
      return state;
  }
}

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case ACTIONS.ON_KEYDOWN:
      return reduceOnVerticalWheel(state, action);
    default:
      return state;
  }
}

export default reducer;
