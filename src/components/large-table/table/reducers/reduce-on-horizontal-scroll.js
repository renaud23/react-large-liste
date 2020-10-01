import { extractFromPayload } from "./tools";

function reduceOnHorizontalScroll(state, action) {
  const { percent } = extractFromPayload(action, "percent");
  return { ...state, horizontalScrollPercent: percent };
}

export default reduceOnHorizontalScroll;
