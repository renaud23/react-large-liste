import React from "react";
import classnames from "classnames";
import Th from "./th";

function Header({ colStart, nbCols, diffHeight, header, headerHeight }) {
  if (nbCols) {
    const th = new Array(nbCols).fill(null).map(function (_, i) {
      const { width, label } = header[i + colStart];
      return (
        <Th width={width} key={i}>
          {label}
        </Th>
      );
    });
    return (
      <thead
        className={classnames("react-large-table-thead")}
        style={{ height: headerHeight }}
      >
        <tr>{th}</tr>
      </thead>
    );
  }
  return null;
}

export default Header;
