import React, { useContext } from "react";
import classnames from "classnames";
import ContextTable from "./context-table";
import Th from "./th";

function Header() {
  const [state] = useContext(ContextTable);
  const { colStart, nbCols, header, headerHeight, diffWidth } = state;

  if (nbCols) {
    const th = new Array(nbCols).fill(null).map(function (_, i) {
      const { width, label } = header[i + colStart];
      return (
        <Th width={width} height={headerHeight} key={i} index={colStart + i}>
          {label}
        </Th>
      );
    });
    return (
      <thead
        className={classnames("react-large-table-thead")}
        style={{ height: headerHeight }}
      >
        <tr style={{ marginLeft: `${-diffWidth}px` }}>{th}</tr>
      </thead>
    );
  }
  return null;
}

export default Header;
