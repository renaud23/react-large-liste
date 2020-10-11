import React, { useContext } from "react";
import Td from "../components/td";
import { TableContext } from "../state-management";

function Content({ row, index, height, cellRenderer: CellRenderer }) {
  const [state] = useContext(TableContext);
  const { header, horizontal } = state;
  const { start: startColumn, nb: nbColumns } = horizontal;
  if (startColumn === undefined) {
    return null;
  }
  return new Array(nbColumns).fill(null).map(function (_, i) {
    const column = header[startColumn + i];
    const { width, path } = column;
    const cell = path in row ? row[path] : undefined;
    return (
      <Td key={i} width={width}>
        <CellRenderer
          column={startColumn + i}
          row={index}
          cell={cell}
          width={width}
          height={height}
        />
      </Td>
    );
  });
}

export default Content;
