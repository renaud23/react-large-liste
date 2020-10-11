function reduceOnRefreshRows(state, action) {
  const { verticalScrollPercent, maxRows, nbRows } = state;
  const rowStart =
    Math.max(Math.trunc((maxRows - nbRows) * verticalScrollPercent), 0) || 0;
  return { ...state, rowStart };
}

export default reduceOnRefreshRows;
