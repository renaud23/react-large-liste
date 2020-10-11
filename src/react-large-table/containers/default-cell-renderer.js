import React from "react";

function getValue(cell, column, row) {
  const type = typeof cell;
  if (type === undefined) {
    return "";
  } else if (type === "string" || type === "number") {
    return cell;
  } else if (type === "object") {
    const { value } = cell;
    return value;
  }
  return `cell[${column}, ${row}]`;
}

function CellRenderer({ column, row, cell, height }) {
  return (
    <span
      className="default-cell-renderer"
      style={{ lineHeight: `${height}px` }}
    >
      {getValue(cell, column, row)}
    </span>
  );
}

export default CellRenderer;
