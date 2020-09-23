import * as ACTIONS from "./actions";

let __TABLE_ID__ = 1;

/* ******* */

export const INITIAL_STATE = {
  idTable: undefined,
  nbRows: undefined,
  maxRows: undefined,
  rowHeight: undefined,
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
  return { ...state, idTable, rowHeight, maxRow: rows.length };
}

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case ACTIONS.ON_INIT:
      return reduceOnInit(state, action);
    default:
      return state;
  }
}

export default reducer;
