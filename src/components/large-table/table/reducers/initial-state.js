/* INITIAL STATE */

export const INITIAL_STATE = {
  idTable: undefined,
  init: true,
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

  verticalWheel: undefined,
};

export default INITIAL_STATE;
