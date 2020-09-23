export const ON_INIT = "react-large-table/on-init";
export const onInit = ({ rowHeight, data }) => ({
  type: ON_INIT,
  payload: { rowHeight, data },
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

export const ON_REFRESH_COLUMNS = "react-large-table/on-columns";
export const onRefreshColumns = () => ({ type: ON_REFRESH_COLUMNS });
