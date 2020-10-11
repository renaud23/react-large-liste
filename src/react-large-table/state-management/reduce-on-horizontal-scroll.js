import { resolveScrollbar } from "./commons-reducer";

function getSize({ width }) {
  return width;
}

function reduce(state, action) {
  const { payload } = action;
  const { percent } = payload;
  const { horizontal, viewportWidth } = state;

  return {
    ...state,
    horizontal: resolveScrollbar(
      { ...horizontal, scrollPercent: percent },
      viewportWidth,
      getSize
    ),
  };
}
export default reduce;
