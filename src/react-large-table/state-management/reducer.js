import * as actions from "./actions";
import reduceOnInit from "./reduce-on-init";
import reduceOnRefreshHeader from "./reduce-on-refresh-header";
import reduceOnHorizontalScroll from "./reduce-on-horizontal-scroll";
import reduceOnVerticalScroll from "./reduce-on-vertical-scroll";
import reduceOnResize from "./reduce-on-resize";
import reduceOnRefreshRows from "./reduce-on-refresh-rows";
import reduceOnResizColumn from "./reduce-on-resize-column";

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case actions.ON_INIT:
      return reduceOnInit(state, action);
    case actions.ON_REFRESH_HEADER:
      return reduceOnRefreshHeader(state, action);
    case actions.ON_HORIZONTAL_SCROLL:
      return reduceOnHorizontalScroll(state, action);
    case actions.ON_VERTICAL_SCROLL:
      return reduceOnVerticalScroll(state, action);
    case actions.ON_RESIZE:
      return reduceOnResize(state, action);
    case actions.ON_REFRESH_ROWS:
      return reduceOnRefreshRows(state, action);
    case actions.ON_RESIZE_COLUMN:
      return reduceOnResizColumn(state, action);
    default:
      return state;
  }
}

export default (state, action) => {
  const next = reducer(state, action);
  // console.log(action, state, next);
  return next;
};
