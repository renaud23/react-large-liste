export const ON_INIT = "react-large-table/on-init";
export const onInit = ({ rowHeight, headerHeight, data }) => ({
  type: ON_INIT,
  payload: { rowHeight, headerHeight, data },
});

export const ON_RESIZE = "react-large-table/on-resize";
export const onResize = ({ width, height }) => ({
  type: ON_RESIZE,
  payload: { width, height },
});

export const ON_HORIZONTAL_SCROLL = "react-large-table/on-horizontal-scroll";
export const onHorizontalScroll = (percent) => ({
  type: ON_HORIZONTAL_SCROLL,
  payload: { percent },
});

export const ON_VERTICAL_SCROLL = "react-large-table/on-vertical-scroll";
export const onVerticalScroll = (percent) => ({
  type: ON_VERTICAL_SCROLL,
  payload: { percent },
});

export const ON_REFRESH_COLUMNS = "react-large-table/on-refresh-columns";
export const onRefreshColumns = () => ({ type: ON_REFRESH_COLUMNS });

export const ON_REFRESH_ROWS = "react-large-table/on-rows";
export const onRefreshRows = () => ({ type: ON_REFRESH_ROWS });

export const ON_VERTICAL_WHEEL = "react-large-table/on-vertical-wheel";
export const onVerticalWheel = (delta) => ({
  type: ON_VERTICAL_WHEEL,
  payload: { delta },
});

export const ON_KEYDOWN = "react-large-table/on-key-down";
export const onKeyDown = (key) => ({ type: ON_KEYDOWN, payload: { key } });

export const ON_RESIZE_COLUMN = "react-large-table/on-resize-column";
export const onResizeColumn = (index, delta) => ({
  type: ON_RESIZE_COLUMN,
  payload: { index, delta },
});
