import {
  resolveRefreshData,
  resolveScrollPercent,
  computeSeuil,
  resolveNb,
} from "./commons-reducer";

function getWidth({ width }) {
  return width;
}

function reduce(state) {
  const { horizontal, header, treeSize, viewportWidth } = state;
  const { start } = horizontal;

  if (start !== undefined) {
    const next = resolveScrollPercent(
      { ...horizontal, ...resolveRefreshData(header, getWidth, treeSize) },
      viewportWidth
    );
    const seuil = computeSeuil(next, viewportWidth);
    return {
      ...state,
      horizontal: resolveNb(next, viewportWidth, seuil),
    };
  }

  return {
    ...state,
    horizontal: {
      ...horizontal,
      ...resolveRefreshData(header, getWidth, treeSize),
    },
  };
}

export default reduce;
