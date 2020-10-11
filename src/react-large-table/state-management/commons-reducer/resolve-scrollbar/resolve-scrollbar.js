import computeSeuil from "./compute-seuil";
import resolveStart from "./resolve-start";
import resolveMargin from "./resolve-margin";
import resolveNb from "./resolve-nb";

function resolve(scrollbar, viewportSize, getSize) {
  const { maxSize } = scrollbar;
  if (maxSize && viewportSize) {
    const seuil = computeSeuil(scrollbar, viewportSize);
    return resolveNb(
      resolveMargin(resolveStart(scrollbar, seuil), seuil),
      viewportSize,
      seuil
    );
  }

  return scrollbar;
}

export default resolve;
