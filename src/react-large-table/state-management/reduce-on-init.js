function reduce(state, action) {
  const { payload } = action;
  const {
    headerHeight = 20,
    rows = [],
    header = [],
    treeSize = false,
  } = payload;

  return { ...state, headerHeight, rows, header, treeSize };
}

export default reduce;
