function resolve(scrollbar, viewportSize) {
  const { maxSize, start, cumulsSize, margin } = scrollbar;
  const percent = (cumulsSize[start] - margin) / (maxSize - viewportSize);
  return { ...scrollbar, scrollPercent: percent, scrollRequest: { percent } };
}

export default resolve;
