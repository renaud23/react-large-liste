import { randomInt } from "./random-entities";

const __MIN_WIDTH__ = 100;

function generate(nbCols, nbRows) {
  const header = new Array(nbCols).fill(null).map(function (_, i) {
    return {
      path: `column${i + 1}`,
      width: __MIN_WIDTH__ + randomInt(100),
      label: `column${i}`,
    };
  });
  const rows = new Array(nbRows).fill(null).map(function () {
    return header.reduce(function (a, { path }) {
      return { ...a, [path]: "" };
    }, {});
  });
  return { header, rows };
}

export default generate;
