import {
  resolveScrollbar,
  resolveNb,
  resolveScrollPercent,
  computeSeuil,
} from "./commons-reducer";

function getWidth({ width }) {
  return width;
}

function getHeight({ __height }) {
  return __height;
}

function reduceWidth(state, width) {
  const { viewportWidth, horizontal } = state;
  if (viewportWidth === undefined) {
    return {
      ...state,
      viewportWidth: width,
      horizontal: resolveScrollbar(horizontal, width, getWidth),
    };
  }
  const next = resolveScrollPercent(horizontal, width);
  const seuil = computeSeuil(next, width);

  return {
    ...state,
    viewportWidth: width,
    horizontal: resolveNb(next, width, seuil),
  };
}

function reduceHeight(state, height) {
  const { viewportHeight, vertical, headerHeight } = state;
  if (viewportHeight === undefined) {
    return {
      ...state,
      viewportHeight: height,
      vertical: resolveScrollbar(vertical, height - headerHeight, getHeight),
    };
  }
  const next = resolveScrollPercent(vertical, height - headerHeight);
  const seuil = computeSeuil(next, height - headerHeight);
  return {
    ...state,
    viewportHeight: height,
    vertical: resolveNb(next, height - headerHeight, seuil),
  };
}

function reduceBoth(state, width, height) {
  return reduceHeight(reduceWidth(state, width), height);
}

function reduce(state, action) {
  const { payload } = action;
  const { width, height } = payload;
  const { viewportWidth, viewportHeight } = state;

  if (viewportWidth !== width && viewportHeight !== height) {
    return reduceBoth(state, width, height);
  }
  if (viewportWidth !== width) {
    return reduceWidth(state, width);
  }
  if (viewportHeight !== height) {
    return reduceHeight(state, height);
  }
  return state;
}

export default reduce;
