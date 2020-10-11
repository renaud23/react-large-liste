function safe(value) {
  return value !== undefined && !isNaN(value) ? value : 0;
}

export default safe;
