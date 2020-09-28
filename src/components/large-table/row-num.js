import React, { useContext } from "react";
import ContextTable from "./context-table";
import { useOuterCssSize } from "../commons";

export function RowContentDefaultRenderer({ index }) {
  return index;
}

function Row({ children, height }) {
  const [thEl, delta] = useOuterCssSize();
  return (
    <div ref={thEl} className="num" style={{ height: height - delta.height }}>
      {children}
    </div>
  );
}

function RowNum({ rowNumComponent: RowRenderer }) {
  const [state] = useContext(ContextTable);
  const { headerHeight, nbRows, rowStart, maxRows, rowHeight, rows } = state;
  const nb = Math.min(nbRows, maxRows - rowStart);

  if (nb && rows.length) {
    const nums = new Array(nb).fill(null).map(function (_, i) {
      return (
        <Row key={i} height={rowHeight}>
          <RowRenderer index={rowStart + i + 1} content={rows[i + rowStart]} />
        </Row>
      );
    });
    return (
      <div className="react-large-table-row-num">
        <div className="angle" style={{ height: headerHeight }}></div> {nums}
      </div>
    );
  }
  return <div className="react-large-table-row-num" />;
}

export default RowNum;
