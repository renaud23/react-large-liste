import React, { useReducer, useEffect, useCallback } from "react";
import classnames from "classnames";
import ContextTable from "./context-table";
import { HorizontalScrollbar, VerticalScrollbar } from "../../scrollbar";
import { RowContentDefaultRenderer } from "./row-num";
import Header from "./header";
import Body, { DefaultCellComponent } from "./body";
import * as ACTIONS from "./actions";
import { useResizeObserver } from "../../commons";
import { INITIAL_STATE } from "./reducers";

import RowNum from "./row-num";
import reducers from "./reducers";
import "./table.scss";

function ReactLargeTable({
  data = [],
  rowHeight,
  headerHeight,
  className,
  cellComponent = DefaultCellComponent,
  rowNumComponent = RowContentDefaultRenderer,
}) {
  const [state, dispatch] = useReducer(reducers, INITIAL_STATE);
  const {
    idTable,
    maxWidth,
    maxHeight,
    horizontalScrollPercent,
    verticalScrollPercent,
    viewportWidth,
    verticalWheel,
    horizontalWheel,
    header,
    init,
    rowStart,
    colStart,
    maxRows,
    maxCols,
  } = state;

  useEffect(
    function () {
      if (init) {
        dispatch(ACTIONS.onInit({ data, rowHeight, headerHeight }));
      } else {
        dispatch(ACTIONS.onRefresh({ data, rowHeight, headerHeight }));
      }
    },
    [data, rowHeight, headerHeight, init]
  );

  useEffect(
    function () {
      dispatch(ACTIONS.onRefreshColumns());
    },
    [horizontalScrollPercent, viewportWidth, header]
  );

  useEffect(
    function () {
      dispatch(ACTIONS.onRefreshRows());
    },
    [verticalScrollPercent]
  );

  /* callbacks */
  const resizeCallback = useCallback(function (width, height) {
    dispatch(ACTIONS.onResize({ width, height }));
  }, []);

  const onHorizontalScrollCallback = useCallback(function (percent) {
    dispatch(ACTIONS.onHorizontalScroll(percent));
  }, []);

  const onVerticalScrollCallback = useCallback(function (percent) {
    dispatch(ACTIONS.onVerticalScroll(percent));
  }, []);

  const onMouseWheelCallback = useCallback(function (e) {
    e.stopPropagation();
    dispatch(ACTIONS.onVerticalWheel(e.deltaY));
  }, []);

  const onKeyDownCallback = useCallback(function (e) {
    if (e.key === "ArrowRight") {
      dispatch(ACTIONS.onHorizontalWheel(10));
    } else if (e.key === "ArrowLeft") {
      dispatch(ACTIONS.onHorizontalWheel(-10));
    } else dispatch(ACTIONS.onKeyDown(e.key));
  }, []);

  const containerEl = useResizeObserver(resizeCallback);

  return (
    <ContextTable.Provider value={[state, dispatch]}>
      <div
        className={classnames("react-large-table-container", className)}
        tabIndex="0"
        onKeyDown={onKeyDownCallback}
      >
        <RowNum rowNumComponent={rowNumComponent} />
        <div className={classnames("react-large-table")} ref={containerEl}>
          <VerticalScrollbar
            max={maxHeight}
            start={0}
            ariaMax={maxRows}
            ariaMin={0}
            ariaNow={rowStart + 1}
            ariaControl={idTable}
            onScroll={onVerticalScrollCallback}
            parentWheel={verticalWheel}
          />
          <HorizontalScrollbar
            max={maxWidth}
            start={0}
            ariaMax={maxCols}
            ariaMin={0}
            ariaNow={colStart + 1}
            ariaControl={idTable}
            onScroll={onHorizontalScrollCallback}
            parentWheel={horizontalWheel}
          />
          <table id={idTable} onWheel={onMouseWheelCallback}>
            <Header />
            <Body cellComponent={cellComponent} />
          </table>
        </div>
      </div>
    </ContextTable.Provider>
  );
}

export default React.memo(ReactLargeTable);
