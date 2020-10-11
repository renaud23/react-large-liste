function reduceOnRefreshColumns(state) {
  const {
    sumColWidth,
    header,
    maxWidth,
    viewportWidth,
    horizontalScrollPercent,
  } = state;
  const minx = Math.trunc((maxWidth - viewportWidth) * horizontalScrollPercent);
  const maxx = minx + viewportWidth;

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

export default reduceOnRefreshColumns;
