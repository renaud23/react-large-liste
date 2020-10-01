/**
 *
 * @param {*} header
 */
function calcSumColWidth(header) {
  return header.reduce(
    function (a, { width }) {
      return [...a, a[a.length - 1] + width];
    },
    [0]
  );
}

export default calcSumColWidth;
