import React, { useCallback, useContext } from "react";
import { onResizeColumn } from "./actions";
import ContextTable from "./context-table";
import { useOuterCssSize } from "../../commons";
import Track from "../../track";
import classnames from "classnames";

function getStyle(delta, width, height) {
  if (delta) {
    return { width: width - delta.width, height: height - delta.height };
  }
  return { width: width, height: height };
}

function Th({ width, height, children, index }) {
  const [thEl, delta] = useOuterCssSize();
  const dispatch = useContext(ContextTable)[1];
  const onTrack = useCallback(
    function (delta) {
      dispatch(onResizeColumn(index, delta));
    },
    [index, dispatch]
  );

  return (
    <th
      ref={thEl}
      style={getStyle(delta, width, height)}
      className={classnames("react-large-table-th", { waiting: !delta })}
    >
      <Track vertical onTrack={onTrack} />
      {children}
    </th>
  );
}

export default Th;
