function compute(scrollbar, viewportSize) {
  const { scrollPercent, maxSize } = scrollbar;
  if (maxSize && viewportSize) {
    return scrollPercent * (maxSize - viewportSize);
  }
  return 0;
}

export default compute;
