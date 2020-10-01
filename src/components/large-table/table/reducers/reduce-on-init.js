import { extractFromPayload, calcSumColWidth } from "./tools";

let __TABLE_ID__ = 1;

/**
 *
 * @param {*} state
 * @param {*} action
 */
function reduceOnInit(state, action) {
  const { data, rowHeight, headerHeight } = extractFromPayload(
    action,
    "data",
    "rowHeight",
    "headerHeight"
  );
  const idTable = `react-large-table-id-${__TABLE_ID__++}`;
  const { header, rows } = data;
  const sumColWidth = calcSumColWidth(header);

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
    init: false,
  };
}

export default reduceOnInit;
