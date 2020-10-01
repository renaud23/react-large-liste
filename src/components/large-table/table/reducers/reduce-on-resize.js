import { extractFromPayload } from "./tools";

/**
 *
 * @param {*} state
 * @param {*} action
 */
function reduceOnResize(state, action) {
  const { width, height } = extractFromPayload(action, "width", "height");
  const { headerHeight, rowHeight } = state;
  const nbRows = Math.ceil((height - headerHeight) / rowHeight);
  return {
    ...state,
    viewportWidth: width,
    viewportHeight: height,
    nbRows,
  };
}

export default reduceOnResize;
