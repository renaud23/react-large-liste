import { useEffect, useRef, useState } from "react";
import { getCssOuterWidth, getCssOuterHeight } from "./add-css-value";

function useOuterCssSize() {
  const ref = useRef();
  const [delta, setDelta] = useState({ width: 0, height: 0 });
  useEffect(
    function () {
      const { current } = ref;
      if (current) {
        const styles = window.getComputedStyle(current);
        setDelta({
          width: getCssOuterWidth(styles),
          height: getCssOuterHeight(styles),
        });
      }
    },
    [ref]
  );
  return [ref, delta];
}

export default useOuterCssSize;
