import { resolveScrollbar } from "./commons-reducer";

function getSize({ __height }) {
  return __height;
}

function reduce(state, action) {
  const { payload } = action;
  const { percent } = payload;
  const { vertical, viewportHeight, headerHeight } = state;

  return {
    ...state,
    vertical: resolveScrollbar(
      { ...vertical, scrollPercent: percent },
      viewportHeight - headerHeight,
      getSize
    ),
  };
}

export default reduce;
