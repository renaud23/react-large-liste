import { extractFromPayload, calcSumColWidth } from "./tools";

function reduceOnResizeColumn(state, action) {
  const { index, delta } = extractFromPayload(action, "delta", "index");
  const { header } = state;
  const next = header.map(function (col, i) {
    if (i === index) {
      const { width } = col;
      const newWidth = Math.min(Math.max(30, width + delta), 500);
      return { ...col, width: newWidth };
    }
    return col;
  });
  const sumColWidth = calcSumColWidth(next);
  const maxWidth = sumColWidth[sumColWidth.length - 1];
  return {
    ...state,
    header: next,
    sumColWidth,
    maxWidth,
  };
}

export default reduceOnResizeColumn;
