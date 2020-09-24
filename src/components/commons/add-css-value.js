function addCssValue(styles, ...values) {
  const [current, ...rest] = values;
  if (current) {
    const value = parseInt(styles.getPropertyValue(current));
    return value + addCssValue(styles, ...rest);
  }
  return 0;
}

const createGetCssValue = (...values) => (styles) => {
  const [current, ...rest] = values;
  if (current) {
    const value = parseInt(styles.getPropertyValue(current));
    return value + addCssValue(styles, ...rest);
  }
  return 0;
};

export const getCssOuterWidth_ = createGetCssValue(
  "border-left",
  "border-right",
  "margin-left",
  "margin-right",
  "padding-left",
  "padding-right"
);
export function getCssOuterWidth(styles, width) {
  return getCssOuterWidth_(styles);
}

export const getCssOuterHeight = createGetCssValue(
  "border-top",
  "border-bottom",
  "margin-top",
  "margin-bottom",
  "padding-top",
  "padding-bottom"
);

export default addCssValue;
