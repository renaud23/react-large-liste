import { useEffect, useRef } from "react";
// import ResizeObserver from "resize-observer-polyfill";

function useResizeObserver(callback = () => null) {
  const ref = useRef();
  useEffect(
    function () {
      let observer;
      const { current } = ref;
      if (current) {
        observer = new ResizeObserver(function () {
          const { height, width } = current.getBoundingClientRect();
          callback(width, height);
        });
        observer.observe(current);
      }

      return function () {
        if (observer) {
          observer.unobserve(current);
        }
      };
    },
    [ref, callback]
  );

  return ref;
}

export default useResizeObserver;
