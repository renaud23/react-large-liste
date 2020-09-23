import React, { useReducer, useEffect, useCallback } from "react";
import * as ACTIONS from "./actions";
import { useResizeObserver } from "../commons";
import reducer, { INITIAL_STATE } from "./reducer";
import "./table.scss";

function ReactLargeTable({ data = [], rowHeight }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const { idTable } = state;

  useEffect(
    function () {
      dispatch(ACTIONS.onInit({ data, rowHeight }));
    },
    [data, rowHeight]
  );

  const resizeCallback = useCallback(function (width, height) {
    console.log("resize", { width, height });
  }, []);

  const containerEl = useResizeObserver(resizeCallback);
  return (
    <div className="react-large-table" ref={containerEl}>
      <table id={idTable}></table>
    </div>
  );
}

export default React.memo(ReactLargeTable);
