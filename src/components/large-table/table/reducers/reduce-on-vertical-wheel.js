import { extractFromPayload } from "./tools";

function reduceOnVerticalWheel(state, action) {
  const { delta } = extractFromPayload(action, "delta");
  return { ...state, verticalWheel: { delta } };
}

export default reduceOnVerticalWheel;
