function refillContent(object, path, content) {
  return Object.entries(object).reduce(
    function (a, [p, c]) {
      if (p === path) {
        return { ...a, [path]: content };
      }
      return a;
    },
    { ...object }
  );
}

function update(data, content, row, col) {
  const { header, rows } = data;
  const { path } = header[col];
  const nextRows = rows.map(function (r, i) {
    if (i === row) {
      return refillContent(r, path, content);
    }
    return r;
  });

  return { header, rows: nextRows };
}

export default update;
