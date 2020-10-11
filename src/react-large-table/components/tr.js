import React from "react";
import { safeCss } from "../commons";

function Tr({ children, height }) {
  return (
    <tr className="react-large-table-tr-el" style={{ height: safeCss(height) }}>
      {children}
    </tr>
  );
}

export default Tr;
