import React, { useCallback, useMemo } from "react";
import CellEditable from "./cell-editable";
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
  const onChangeCallback = useCallback(
    function (content, value, row, column) {
      // TODO
      const noobs = onChange(content, value, row, column);
      console.log(noobs);
    },
    [onChange]
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
      data={data}
      rowHeight={rowHeight}
      headerHeight={headerHeight}
      cellComponent={WrapperCell}
    />
  );
}

export default TableEditable;
