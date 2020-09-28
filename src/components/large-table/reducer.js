import * as ACTIONS from "./actions";

let __TABLE_ID__ = 1;

/* ******* */

export const INITIAL_STATE = {
  idTable: undefined,
  header: undefined,
  rowHeight: undefined,
  headerHeight: undefined,

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
  diffHeight: 0,
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

/* *** */
export function countColumns(min, max, table) {
  const [a, b, ...rest] = table;
  if (a !== undefined && b !== undefined && max >= a && min < b) {
    return 1 + countColumns(min, max, [b, ...rest]);
  }
  return 0;
}

/* ******* */

function reduceOnInit(state, action) {
  const { data, rowHeight, headerHeight } = extractFromPayload(
    action,
    "data",
    "rowHeight",
    "headerHeight"
  );
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
    headerHeight,

    maxWidth,
    header,
    sumColWidth,

    rows,
    rowStart: 0,
    maxRows: rows.length,
    maxHeight: rows.length * rowHeight,
  };
}

function reduceOnResize(state, action) {
  const { width, height } = extractFromPayload(action, "width", "height");
  const { headerHeight, rowHeight } = state;
  const nbRows = Math.ceil((height - headerHeight) / rowHeight);
  return {
    ...state,
    viewportWidth: width,
    viewportHeight: height,
    nbRows,
  };
}

function reduceOnHorizontalScroll(state, action) {
  const { percent } = extractFromPayload(action, "percent");
  return { ...state, horizontalScrollPercent: percent };
}

function reduceOnVerticalScroll(state, action) {
  const { percent } = extractFromPayload(action, "percent");
  return { ...state, verticalScrollPercent: percent };
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

function reduceOnRefreshRows(state, action) {
  const { verticalScrollPercent, maxRows, nbRows } = state;
  const rowStart =
    Math.max(Math.trunc((maxRows - nbRows) * verticalScrollPercent), 0) || 0;
  return { ...state, rowStart };
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
    case ACTIONS.ON_REFRESH_ROWS:
      return reduceOnRefreshRows(state, action);
    case ACTIONS.ON_VERTICAL_SCROLL:
      return reduceOnVerticalScroll(state, action);
    default:
      return state;
  }
}

export default reducer;
