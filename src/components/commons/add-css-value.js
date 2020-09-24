function addCssValue(styles, ...values) {
  const [current, ...rest] = values;
  if (current) {
    const value = parseInt(styles.getPropertyValue(current));
    return value + addCssValue(styles, ...rest);
  }
  return 0;
}

export default addCssValue;
