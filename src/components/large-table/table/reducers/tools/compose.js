/**
 *
 * @param  {...any} reducers
 */
export function compose(...reducers) {
  return reducers.reduce(function (a, b) {
    return (state, action) => a(b(state, action), action);
  });
}

export default compose;
