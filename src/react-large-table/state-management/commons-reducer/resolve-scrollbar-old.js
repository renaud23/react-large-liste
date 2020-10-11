import countSize from "./count-size";
import { findCumulsSize, findInTreeSize } from "./compute-tree-size";

function resolveStart(scrollbar, seuil) {
  const { cumulsSize, treeSize } = scrollbar;
  if (treeSize) {
    return findInTreeSize(treeSize, seuil);
  }
  return findCumulsSize(cumulsSize, seuil);
}

function resolve(scrollbar, data, viewportSize, getSize) {
  const { scrollPercent, maxSize, cumulsSize } = scrollbar;
  if (maxSize && viewportSize) {
    const seuil = scrollPercent * (maxSize - viewportSize);
    const start = resolveStart(scrollbar, seuil);
    const margin = cumulsSize[start] - seuil;
    const nb = countSize(cumulsSize, start, seuil + viewportSize);
    return { ...scrollbar, start, margin, nb };
  }

  return scrollbar;
}

export default resolve;
