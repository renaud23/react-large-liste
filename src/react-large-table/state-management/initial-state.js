function initializeScrollbar() {
  return {
    maxSize: 0,
    cumulsSize: undefined,
    treeSize: undefined,
    start: undefined,
    nb: undefined,
    margin: undefined,
    scrollPercent: 0,
    scrollRequest: undefined,
  };
}

const INITIAL_STATE = {
  header: [],
  rows: [],
  headerHeight: undefined,
  treeSize: false,

  viewportWidth: undefined,
  viewportHeight: undefined,

  horizontal: initializeScrollbar(),
  vertical: initializeScrollbar(),
};

export default INITIAL_STATE;
