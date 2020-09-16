export const ON_WHEEL = "react-large-liste/on-wheel";
export const onWheel = (delta) => ({ type: ON_WHEEL, payload: { delta } });

export const ON_START_DRAG = "react-large-liste/on-start-drag";
export const onStartDrag = (clientY) => ({
  type: ON_START_DRAG,
  payload: { clientY },
});

export const ON_DRAG = "react-large-liste/on-drag";
export const onDrag = (mouseY) => ({
  type: ON_DRAG,
  payload: { mouseY },
});

export const ON_STOP_DRAG = "react-large-liste/on-stop-drag";
export const onStopDrag = () => ({ type: ON_STOP_DRAG });

export const ON_INIT = "react-large-liste/on-init";
export const onInit = (start, height, max) => ({
  type: ON_INIT,
  payload: { start, height, max },
});

export const ON_CHANGE_SCROLL = "react-large-liste/on-change-scroll";
export const onChangeScroll = (percent) => ({
  type: ON_CHANGE_SCROLL,
  payload: { percent },
});

export const ON_RESIZE = "vertical-scrollbar/on-resize";
export const onResize = (height) => ({ type: ON_RESIZE, payload: { height } });
