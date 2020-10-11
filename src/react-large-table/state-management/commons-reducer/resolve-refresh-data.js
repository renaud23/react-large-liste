import computeTreeSize from "./compute-tree-size";

function appendSize(cumuls, size) {
  const last = cumuls[cumuls.length - 1];
  return [...cumuls, size + last];
}

function cumulMaxSize(max, size) {
  return max + size;
}

function resolveCumuls(data, getSize) {
  return data.reduce(
    function ({ maxSize, cumulsSize }, o) {
      const size = getSize(o);
      return {
        maxSize: cumulMaxSize(maxSize, size),
        cumulsSize: appendSize(cumulsSize, size),
      };
    },
    {
      maxSize: 0,
      cumulsSize: [0],
    }
  );
}

function resolve(data, getSize, treeSize = false) {
  const { maxSize, cumulsSize } = resolveCumuls(data, getSize);
  if (treeSize) {
    return { maxSize, cumulsSize, treeSize: computeTreeSize(cumulsSize) };
  }
  return { maxSize, cumulsSize };
}

export default resolve;
