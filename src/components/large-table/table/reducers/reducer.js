import * as ACTIONS from "../actions";
import { extractFromPayload } from "./tools";
import reduceOnRefresh from "./reduce-on-refresh";
import reduceOnInit from "./reduce-on-init";
import reduceOnResize from "./reduce-on-resize";
import reduceOnResizeColumn from "./reduce-on-resize-column";
import reduceOnRefreshColumns from "./reduce-on-refresh-columns";
import reduceOnRefreshRows from "./reduce-on-refresh-rows";
import reduceOnHorizontalScroll from "./reduce-on-horizontal-scroll";
import reduceOnVerticalScroll from "./reduce-on-vertical-scroll";
import reduceOnVerticalWheel from "./reduce-on-vertical-wheel";
import reduceOnHorizontalWheel from "./reduce-on-horizontal-wheel";

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case ACTIONS.ON_INIT:
      return reduceOnInit(state, action);
    case ACTIONS.ON_REFRESH:
      return reduceOnRefresh(state, action);
    case ACTIONS.ON_RESIZE:
      return reduceOnResize(state, action);
    case ACTIONS.ON_HORIZONTAL_SCROLL:
      return reduceOnHorizontalScroll(state, action);
    case ACTIONS.ON_REFRESH_COLUMNS:
      return reduceOnRefreshColumns(state, action);
    case ACTIONS.ON_REFRESH_ROWS:
      return reduceOnRefreshRows(state, action);
    case ACTIONS.ON_VERTICAL_SCROLL:
      return reduceOnVerticalScroll(state, action);
    case ACTIONS.ON_VERTICAL_WHEEL:
      return reduceOnVerticalWheel(state, action);
    case ACTIONS.ON_HORIZONTAL_WHEEL:
      return reduceOnHorizontalWheel(state, action);
    case ACTIONS.ON_RESIZE_COLUMN:
      return reduceOnResizeColumn(state, action);
    default:
      return state;
  }
}

export default reducer;
