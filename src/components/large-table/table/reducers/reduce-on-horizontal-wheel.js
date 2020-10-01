import { extractFromPayload } from "./tools";

function reduceOnHorizontalWheel(state, action) {
  const { delta } = extractFromPayload(action, "delta");
  return { ...state, horizontalWheel: { delta } };
}

export default reduceOnHorizontalWheel;
