import React from "react";

function Td({ children, width, height }) {
  // TODO check delta
  return <td style={{ width, height }}>{children}</td>;
}

function Row({ nbCols, colStart, header, height, row }) {
  const td = new Array(nbCols).fill(null).map(function (_, j) {
    const { width, path } = header[j + colStart];
    const content = path in row ? row[path] : "";
    return (
      <Td key={j} width={width} height={height}>
        {content}
      </Td>
    );
  });

  return <tr style={{ height }}>{td}</tr>;
}

function Body({ data, rowStart, nbRows, colStart, nbCols, rowHeight }) {
  const { header, rows } = data;

  if (nbRows && nbCols) {
    const tr = new Array(nbRows).fill(null).map(function (_, i) {
      const row = rows[rowStart + i];
      return (
        <Row
          key={i}
          nbCols={nbCols}
          colStart={colStart}
          header={header}
          height={rowHeight}
          row={row}
        />
      );
    });
    return <tbody>{tr}</tbody>;
  }

  return <tbody></tbody>;
}

export default Body;
