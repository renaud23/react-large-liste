import * as ACTIONS from "./actions";

let __TABLE_ID__ = 1;

/* ******* */

export const INITIAL_STATE = {
  idTable: undefined,
  header: undefined,
  rowHeight: undefined,

  viewportWidth: undefined,
  viewportHeight: undefined,
  maxHeight: undefined,
  maxWidth: undefined,
  horizontalScrollPercent: 0,
  verticalScrollPercent: 0,

  colStart: undefined,
  nbCols: undefined,
  maxCols: undefined,
  diffWidth: 0,
  sumColWidth: [],

  rowStart: undefined,
  nbRows: undefined,
  maxRows: undefined,
};

/* **** */
function extractFromPayload(action, ...what) {
  return what.reduce(function (a, attr) {
    const { payload } = action;
    if (attr in payload) {
      return { ...a, [attr]: payload[attr] };
    }
    return { ...a, [attr]: undefined };
  }, {});
}

/* ******* */

function reduceOnInit(state, action) {
  const { data, rowHeight } = extractFromPayload(action, "data", "rowHeight");
  const idTable = `react-large-table-id-${__TABLE_ID__++}`;
  const { header, rows } = data;
  const sumColWidth = header.reduce(
    function (a, { width }) {
      return [...a, a[a.length - 1] + width];
    },
    [0]
  );

  const { maxWidth } = header.reduce(
    function ({ maxWidth }, { width }) {
      return { maxWidth: maxWidth + width };
    },
    { maxWidth: 0 }
  );

  return {
    ...state,
    idTable,
    rowHeight,
    maxRow: rows.length,
    maxWidth,
    header,
    sumColWidth,
  };
}

function reduceOnResize(state, action) {
  const { width, height } = extractFromPayload(action, "width", "height");
  return { ...state, viewportWidth: width, viewportHeight: height };
}

function reduceOnHorizontalScroll(state, action) {
  const { percent } = extractFromPayload(action, "percent");
  return { ...state, horizontalScrollPercent: percent };
}

function reduceOnRefreshColumns(state) {
  const {
    sumColWidth,
    header,
    maxWidth,
    viewportWidth,
    horizontalScrollPercent,
  } = state;
  const minx = (maxWidth - viewportWidth) * horizontalScrollPercent;
  const maxx = minx + viewportWidth;

  if (minx < maxx) {
    const { colStart, nbCols } = header.reduce(
      function ({ colStart, nbCols, x }, column, i) {
        const { width } = column;
        const nx = x + width;
        if (nx > minx && x < maxx) {
          return { colStart: Math.min(i, colStart), nbCols: nbCols + 1, x: nx };
        }

        return { colStart, nbCols, x: nx };
      },
      {
        colStart: Number.MAX_SAFE_INTEGER,
        nbCols: 0,
        x: 0,
      }
    );
    const diffWidth = minx - sumColWidth[colStart];
    return { ...state, colStart, nbCols, diffWidth };
  }

  return state;
}

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case ACTIONS.ON_INIT:
      return reduceOnInit(state, action);
    case ACTIONS.ON_RESIZE:
      return reduceOnResize(state, action);
    case ACTIONS.ON_HORIZONTAL_SCROLL:
      return reduceOnHorizontalScroll(state, action);
    case ACTIONS.ON_REFRESH_COLUMNS:
      return reduceOnRefreshColumns(state, action);
    default:
      return state;
  }
}

export default reducer;
