import React from "react";
import { useOuterCssSize } from "../../commons";

function Td({ children, width, height }) {
  const [tdEl, delta] = useOuterCssSize();
  const { width: dw, height: dh } = delta;

  return (
    <td ref={tdEl} style={{ width: width - dw, height: height - dh }}>
      {children}
    </td>
  );
}

export default React.memo(Td);
