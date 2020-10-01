import { extractFromPayload } from "./tools";

/**
 *
 * @param {*} state
 * @param {*} action
 */
function reduceOnRefresh(state, action) {
  const { data, rowHeight, headerHeight } = extractFromPayload(
    action,
    "data",
    "rowHeight",
    "headerHeight"
  );
  const { header, rows } = data;
  return { ...state, rowHeight, headerHeight, header, rows };
}

export default reduceOnRefresh;
