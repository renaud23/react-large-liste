function generate(nbCols, nbRows) {
  const header = new Array(nbCols).fill(null).map(function (_, i) {
    return { path: `column${i + 1}`, width: 20 };
  });
  const rows = new Array(nbRows).fill(null).map(function () {
    return header.reduce(function (a, { path }) {
      return { ...a, [path]: "" };
    }, {});
  });
  return { header, rows };
}

export default generate;
