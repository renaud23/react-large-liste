export const ON_INIT = "react-large-liste/on-init";
export const onInit = ({ height, rowHeight, start, length }) => ({
  type: ON_INIT,
  payload: { height, rowHeight, start, length },
});

export const ON_WHEEL = "react-large-liste/on-wheel";
export const onWheel = (delta) => ({
  type: ON_WHEEL,
  payload: { delta },
});

export const ON_SCROLL = "react-large-liste/on-scroll";
export const onScroll = (percent) => ({
  type: ON_SCROLL,
  payload: { percent },
});

export const ON_RESIZE = "react-large-liste/on-resize";
export const onResize = (height) => ({ type: ON_RESIZE, payload: { height } });
