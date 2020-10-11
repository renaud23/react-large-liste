import React, { useContext } from "react";
import Tr from "../components/tr";
import TrContent from "./tr-content";
import { TableContext } from "../state-management";

function BodyContent({ cellRenderer }) {
  const [state] = useContext(TableContext);
  const { vertical, rows } = state;
  const { nb, start } = vertical;
  if (nb) {
    return new Array(nb).fill(null).map(function (_, i) {
      const row = rows[start + i];
      const { __height } = row;
      return (
        <Tr key={i} height={__height}>
          <TrContent
            row={row}
            index={start + i}
            height={__height}
            cellRenderer={cellRenderer}
          />
        </Tr>
      );
    });
  }
  return null;
}

export default BodyContent;
