function fetchData(colStart, colEnd, rowStart, rowEnd) {
  if (colStart <= colEnd && rowStart <= rowEnd) {
    const columns = new Array(colEnd - colStart + 1)
      .fill("")
      .map((_, i) => ({ name: `column ${i + 1}` }));
    const data = new Array(rowEnd - rowStart + 1).fill([]).map(function (_, i) {
      return new Array(colsName).fill("").map((_, j) => `value [${i}, ${j}]`);
    });
    return new Promise.resolve({ columns, data });
  }
  return new Promise.resolve({ columns: [], data: [] });
}

export default fetchData;
