import React from "react";
import { safeCss } from "../commons";

function Td({ children, width }) {
  return (
    <td className="react-large-table-td-el" style={{ width: safeCss(width) }}>
      {children}
    </td>
  );
}

export default Td;
