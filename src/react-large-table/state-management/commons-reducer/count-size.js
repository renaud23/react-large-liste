function count(cumTab, index, max) {
  if (index < cumTab.length - 1) {
    const start = cumTab[index];
    if (start < max) {
      return 1 + count(cumTab, index + 1, max);
    }
  }
  return 0;
}

export default count;
