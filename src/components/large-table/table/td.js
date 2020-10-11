import React from "react";
import classnames from "classnames";
import { useOuterCssSize } from "../../commons";

function getStyle(delta, width, height) {
  if (delta) {
    return { width: width - delta.width, height: height - delta.height };
  }
  return { width: width, height: height };
}

function Td({ children, width, height }) {
  const [tdEl, delta] = useOuterCssSize();

  return (
    <td
      className={classnames("react-large-table-td", { waiting: !delta })}
      ref={tdEl}
      style={getStyle(delta, width, height)}
    >
      {children}
    </td>
  );
}

export default React.memo(Td);
