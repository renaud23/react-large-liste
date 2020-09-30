import React, { useRef, useReducer, useEffect, useCallback } from "react";
import classnames from "classnames";
import ContextTable from "./context-table";
import { HorizontalScrollbar, VerticalScrollbar } from "../../scrollbar";
import { RowContentDefaultRenderer } from "./row-num";
import Header from "./header";
import Body, { DefaultCellComponent } from "./body";
import * as ACTIONS from "./actions";
import { useResizeObserver } from "../../commons";
import reducer, { INITIAL_STATE, compose } from "./reducer";
import reducerKeyboard from "./reducer-keyboard";
import RowNum from "./row-num";
import "./table.scss";

const reducers = compose(reducer, reducerKeyboard);

function ReactLargeTable({
  data = [],
  rowHeight,
  headerHeight,
  className,
  cellComponent = DefaultCellComponent,
  rowNumComponent = RowContentDefaultRenderer,
}) {
  const tableEl = useRef();
  const [state, dispatch] = useReducer(reducers, INITIAL_STATE);
  const {
    idTable,
    maxWidth,
    maxHeight,
    horizontalScrollPercent,
    verticalScrollPercent,
    viewportWidth,
    diffWidth,
    diffHeight,
    verticalWheel,
    header,
    init,
  } = state;

  useEffect(
    function () {
      if (tableEl.current) {
        tableEl.current.scrollLeft = Math.trunc(diffWidth);
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
    dispatch(ACTIONS.onKeyDown(e.key));
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
            ariaMax={0}
            ariaMin={0}
            ariaNow={0}
            ariaControl={idTable}
            onScroll={onVerticalScrollCallback}
            parentWheel={verticalWheel}
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
          <table id={idTable} ref={tableEl} onWheel={onMouseWheelCallback}>
            <Header />
            <Body cellComponent={cellComponent} />
          </table>
        </div>
      </div>
    </ContextTable.Provider>
  );
}

export default React.memo(ReactLargeTable);
