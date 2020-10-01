import reducer from "./reducer";
import { compose } from "./tools";
import keyboardReducer from "./reducer-keyboard";

export default compose(reducer, keyboardReducer);
export { default as INITIAL_STATE } from "./initial-state";
