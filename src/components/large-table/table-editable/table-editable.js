import React, { useCallback, useMemo, useState, useEffect } from "react";
import CellEditable from "./cell-editable";
import updateData from "./update-data";
import Table from "../table";

function createCellWrapper({ onChange, getContent, cellComponent: Cell }) {
  return function CellWrapper({ content, column, row }) {
    return (
      <CellEditable
        onChange={onChange}
        column={column}
        row={row}
        content={content}
        value={getContent(content)}
      >
        <Cell content={content} column={column} row={row} />
      </CellEditable>
    );
  };
}

function TableEditable({
  className,
  data,
  rowHeight,
  headerHeight,
  cellComponent,
  getContent,
  onChange,
}) {
  const [editable, setEditable] = useState(data);

  useEffect(
    function () {
      setEditable(data);
    },
    [data]
  );

  const onChangeCallback = useCallback(
    function (content, value, row, col) {
      const oldValue = getContent(content);
      if (oldValue !== value) {
        const newContent = onChange(content, value, row, col);
        const newEditable = updateData(editable, newContent, row, col);
        setEditable(newEditable);
      }
    },
    [onChange, getContent, editable]
  );

  const WrapperCell = useMemo(
    () =>
      createCellWrapper({
        onChange: onChangeCallback,
        getContent,
        cellComponent,
      }),
    [onChangeCallback, getContent, cellComponent]
  );

  return (
    <Table
      className={className}
      data={editable}
      rowHeight={rowHeight}
      headerHeight={headerHeight}
      cellComponent={WrapperCell}
    />
  );
}

export default TableEditable;
