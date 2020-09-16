export const ON_WHEEL = "vertical-scrollbar/on-wheel";
export const onWheel = (delta) => ({ type: ON_WHEEL, payload: { delta } });

export const ON_START_DRAG = "vertical-scrollbar/on-start-drag";
export const onStartDrag = (clientY) => ({
  type: ON_START_DRAG,
  payload: { clientY },
});

export const ON_DRAG = "vertical-scrollbar/on-drag";
export const onDrag = (mouseY) => ({
  type: ON_DRAG,
  payload: { mouseY },
});

export const ON_STOP_DRAG = "vertical-scrollbar/on-stop-drag";
export const onStopDrag = () => ({ type: ON_STOP_DRAG });

export const ON_INIT = "vertical-scrollbar/on-init";
export const onInit = (start, height, max) => ({
  type: ON_INIT,
  payload: { start, height, max },
});

export const ON_CHANGE_SCROLL = "vertical-scrollbar/on-change-scroll";
export const onChangeScroll = (percent) => ({
  type: ON_CHANGE_SCROLL,
  payload: { percent },
});

export const ON_RESIZE = "vertical-scrollbar/on-resize";
export const onResize = (height) => ({ type: ON_RESIZE, payload: { height } });

export const ON_MOUSE_DOWN = "vertical-scrollbar/on-mouse-down";
export const onMouseDown = (clientY) => ({
  type: ON_MOUSE_DOWN,
  payload: { clientY },
});
