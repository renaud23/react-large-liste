function compute(scrollbar, seuil) {
  const { start, cumulsSize } = scrollbar;
  if (cumulsSize) {
    const margin = cumulsSize[start] - seuil;
    return { ...scrollbar, margin };
  }
  return 0;
}

export default compute;
