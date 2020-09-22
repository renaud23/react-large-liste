export const ON_INIT = "react-large-liste/on-init";
export const onInit = ({ height, rowHeight, start, length, maxWidth }) => ({
  type: ON_INIT,
  payload: { height, rowHeight, start, length, maxWidth },
});

export const ON_WHEEL_VERTICAL = "react-large-liste/on-wheel-vertical";
export const onWheelVertical = (delta) => ({
  type: ON_WHEEL_VERTICAL,
  payload: { delta },
});

export const ON_SCROLL_VERTICAL = "react-large-liste/on-scroll-vertical";
export const onScrollVertical = (percent) => ({
  type: ON_SCROLL_VERTICAL,
  payload: { percent },
});

export const ON_SCROLL_HORIZONTAL = "react-large-liste/on-scroll-horizontal";
export const onScrollHorizontal = (percent) => ({
  type: ON_SCROLL_HORIZONTAL,
  payload: { percent },
});

export const ON_RESIZE = "react-large-liste/on-resize";
export const onResize = (width, height) => ({
  type: ON_RESIZE,
  payload: { height, width },
});
