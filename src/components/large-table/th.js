import React, { useState, useRef, useEffect } from "react";
import { addCssValue } from "../commons";
import classnames from "classnames";

function Th({ width, children }) {
  const thEl = useRef();
  const [delta, setDelta] = useState(0);
  useEffect(
    function () {
      const { current } = thEl;
      if (current) {
        const styles = window.getComputedStyle(current);
        setDelta(
          addCssValue(
            styles,
            "margin-left",
            "margin-right",
            "padding-left",
            "padding-right"
          )
        );
      }
    },
    [thEl]
  );

  return (
    <th
      ref={thEl}
      style={{ width: width - delta }}
      className={classnames("react-large-table-th")}
    >
      {children}
    </th>
  );
}

export default Th;
