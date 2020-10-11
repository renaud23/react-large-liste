import { extractFromPayload } from "./tools";

function reduceOnVerticalScroll(state, action) {
  const { percent } = extractFromPayload(action, "percent");
  return { ...state, verticalScrollPercent: percent };
}

export default reduceOnVerticalScroll;
