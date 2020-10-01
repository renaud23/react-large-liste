/**
 *
 * @param {*} action
 * @param  {...any} what
 */
export function extractFromPayload(action, ...what) {
  return what.reduce(function (a, attr) {
    const { payload } = action;
    if (attr in payload) {
      return { ...a, [attr]: payload[attr] };
    }
    return { ...a, [attr]: undefined };
  }, {});
}

export default extractFromPayload;
