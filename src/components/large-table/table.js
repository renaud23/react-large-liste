import React, { useRef, useReducer, useEffect, useCallback } from "react";
import classnames from "classnames";
import ContextTable from "./context-table";
import { HorizontalScrollbar, VerticalScrollbar } from "../scrollbar";
import Header from "./header";
import Body, { DefaultCellComponent } from "./body";
import * as ACTIONS from "./actions";
import { useResizeObserver } from "../commons";
import reducer, { INITIAL_STATE } from "./reducer";
import RowNum from "./row-num";
import "./table.scss";

function ReactLargeTable({
  data = [],
  rowHeight,
  headerHeight,
  className,
  cellComponent = DefaultCellComponent,
}) {
  const tableEl = useRef();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const {
    idTable,
    maxWidth,
    maxHeight,
    horizontalScrollPercent,
    verticalScrollPercent,
    viewportWidth,
    colStart,
    nbCols,
    rowStart,
    nbRows,
    diffWidth,
    diffHeight,
  } = state;
  const { header } = data;

  useEffect(
    function () {
      if (tableEl.current) {
        tableEl.current.scrollLeft = diffWidth;
      }
    },
    [diffWidth, tableEl]
  );

  useEffect(
    function () {
      if (tableEl.current) {
        tableEl.current.scrollTop = diffHeight;
      }
    },
    [diffHeight, tableEl]
  );

  useEffect(
    function () {
      dispatch(ACTIONS.onInit({ data, rowHeight, headerHeight }));
    },
    [data, rowHeight, headerHeight]
  );

  useEffect(
    function () {
      dispatch(ACTIONS.onRefreshColumns());
    },
    [horizontalScrollPercent, viewportWidth]
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

  const containerEl = useResizeObserver(resizeCallback);
  return (
    <ContextTable.Provider value={[state, dispatch]}>
      <div className="react-large-table-container">
        <RowNum />
        <div
          className={classnames("react-large-table", className)}
          ref={containerEl}
        >
          <VerticalScrollbar
            max={maxHeight}
            start={0}
            ariaMax={0}
            ariaMin={0}
            ariaNow={0}
            ariaControl={idTable}
            onScroll={onVerticalScrollCallback}
            parentWheel={0}
          />
          <HorizontalScrollbar
            max={maxWidth}
            start={0}
            ariaMax={0}
            ariaMin={0}
            ariaNow={0}
            ariaControl={idTable}
            onScroll={onHorizontalScrollCallback}
            parentWheel={0}
          />
          <table id={idTable} ref={tableEl}>
            <Header
              colStart={colStart}
              nbCols={nbCols}
              diffHeight={Math.trunc(diffHeight)}
              header={header}
              headerHeight={headerHeight}
            />
            <Body
              data={data}
              rowStart={rowStart}
              rowHeight={rowHeight}
              nbRows={nbRows}
              colStart={colStart}
              nbCols={nbCols}
              cellComponent={cellComponent}
            />
          </table>
        </div>
      </div>
    </ContextTable.Provider>
  );
}

export default React.memo(ReactLargeTable);
