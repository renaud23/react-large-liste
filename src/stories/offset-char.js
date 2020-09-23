import React, { useRef, useState, useEffect } from "react";

function OffsetChar({ children }) {
  const [offsetChar, setOffsetChar] = useState(undefined);
  const offsetEl = useRef(undefined);

  useEffect(
    function () {
      if (offsetEl.current) {
        const { width } = offsetEl.current.getBoundingClientRect();
        setOffsetChar(width);
      }
    },
    [offsetEl]
  );
  if (!offsetChar) {
    return <span ref={offsetEl}>M</span>;
  }
  return (
    <>
      {React.Children.map(children, (child, i) =>
        React.cloneElement(child, { offsetChar })
      )}
    </>
  );
}

export default OffsetChar;
