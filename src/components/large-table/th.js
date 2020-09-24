import React from "react";
import { useOuterCssSize } from "../commons";
import classnames from "classnames";

function Th({ width, height, children }) {
  const [thEl, delta] = useOuterCssSize();
  return (
    <th
      ref={thEl}
      style={{ width: width - delta.width, height: height - delta.height }}
      className={classnames("react-large-table-th")}
    >
      {children}
    </th>
  );
}

export default Th;
