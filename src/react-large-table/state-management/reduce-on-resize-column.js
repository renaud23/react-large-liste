const __COLUMN_MIN_WIDTH__ = 20;
const __COLUMN_MAX_WIDTH__ = 800;

function refillHeader(header, delta, index) {
  const next = [...header];
  const column = header[index];
  const { width } = column || __COLUMN_MIN_WIDTH__;
  next[index] = {
    ...column,
    width: Math.max(
      Math.min(width + delta, __COLUMN_MAX_WIDTH__),
      __COLUMN_MIN_WIDTH__
    ),
  };
  return next;
}

function reduce(state, action) {
  const { payload } = action;
  const { delta, index } = payload;
  const { header } = state;

  return { ...state, header: refillHeader(header, delta, index) };
}

export default reduce;
