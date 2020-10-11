import React, { useCallback, useContext } from "react";
import { actions } from "../state-management";
import { Track } from "../components";
import { TableContext } from "../state-management";
import { safeCss } from "../commons";

function Th({ children, width, height, index }) {
  const [state, dispatch] = useContext(TableContext);
  const { header } = state;
  const column = header[index];
  const { resizable = false } = column;

  const onTrackCallback = useCallback(
    function (delta) {
      dispatch(actions.onResizeColumn(index, delta));
    },
    [dispatch, index]
  );

  return (
    <th
      className="react-large-table-th-el"
      style={{ width: safeCss(width), height: safeCss(height) }}
    >
      {resizable ? <Track onTrack={onTrackCallback} vertical right /> : null}
      {children}
    </th>
  );
}

export default Th;
