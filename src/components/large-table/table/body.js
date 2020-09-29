import React, { useContext } from "react";
import ContextTable from "./context-table";
import { useOuterCssSize } from "../../commons";

export function DefaultCellComponent({ content, column, row }) {
  return <span title={`cell(${row}, ${column})`}>{content}</span>;
}

function Td({ children, width, height }) {
  const [tdEl, delta] = useOuterCssSize();

  return (
    <td
      ref={tdEl}
      style={{ width: width - delta.width, height: height - delta.height }}
    >
      {children}
    </td>
  );
}

function Row({
  cellComponent: Cell,
  nbCols,
  colStart,
  header,
  height,
  row,
  index,
}) {
  if (!row) {
    return null;
  }
  const td = new Array(nbCols).fill(null).map(function (_, j) {
    const { width, path } = header[j + colStart];
    const content = path in row ? row[path] : undefined;

    return (
      <Td key={j} width={width} height={height}>
        <Cell
          content={content}
          row={index}
          column={colStart + j}
          width={width}
          height={height}
        />
      </Td>
    );
  });

  return <tr style={{ height }}>{td}</tr>;
}

function Body({ cellComponent }) {
  const [state] = useContext(ContextTable);
  const { rowStart, nbRows, colStart, nbCols, rowHeight, rows, header } = state;
  if (nbRows && nbCols) {
    const tr = new Array(Math.min(nbRows, rows.length))
      .fill(null)
      .map(function (_, i) {
        const row = rows[rowStart + i];
        return (
          <Row
            key={i}
            index={rowStart + i}
            nbCols={nbCols}
            colStart={colStart}
            header={header}
            height={rowHeight}
            row={row}
            maxRows={rows.length}
            cellComponent={cellComponent}
          />
        );
      });
    return <tbody>{tr}</tbody>;
  }

  return <tbody></tbody>;
}

export default Body;
