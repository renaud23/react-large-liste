import React, {
  useRef,
  useReducer,
  useEffect,
  useCallback,
  useState,
} from "react";
import { HorizontalScrollbar } from "../scrollbar";
import * as ACTIONS from "./actions";
import { useResizeObserver } from "../commons";
import classnames from "classnames";
import reducer, { INITIAL_STATE } from "./reducer";
import "./table.scss";

function Th({ width, children }) {
  const thEl = useRef();
  const [delta, setDelta] = useState(0);
  useEffect(
    function () {
      const { current } = thEl;
      if (current) {
        const styles = window.getComputedStyle(current);

        const marginLeft = parseInt(styles.getPropertyValue("margin-left"));
        const marginRight = parseInt(styles.getPropertyValue("margin-right"));
        const paddingLeft = parseInt(styles.getPropertyValue("padding-left"));
        const paddingRight = parseInt(styles.getPropertyValue("padding-right"));
        setDelta(marginLeft + marginRight + paddingLeft + paddingRight);
      }
    },
    [thEl]
  );

  return (
    <th
      ref={thEl}
      style={{ width: width - delta }}
      className={classnames("react-large-table-th")}
    >
      {children}
    </th>
  );
}

function Header({ colStart, nbCols, diffWidth, header }) {
  if (nbCols) {
    const th = new Array(nbCols).fill(null).map(function (_, i) {
      const { width, label } = header[i + colStart];
      return (
        <Th width={width} key={i}>
          {label}
        </Th>
      );
    });
    return (
      <thead className={classnames("react-large-table-thead")}>
        <tr>{th}</tr>
      </thead>
    );
  }
  return null;
}

function ReactLargeTable({ data = [], rowHeight }) {
  const tableEl = useRef();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const {
    idTable,
    header,
    maxWidth,
    horizontalScrollPercent,
    viewportWidth,
    colStart,
    nbCols,
    diffWidth,
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
      dispatch(ACTIONS.onInit({ data, rowHeight }));
    },
    [data, rowHeight]
  );

  useEffect(
    function () {
      dispatch(ACTIONS.onRefreshColumns());
    },
    [horizontalScrollPercent, viewportWidth]
  );

  /* callbacks */
  const resizeCallback = useCallback(function (width, height) {
    dispatch(ACTIONS.onResize({ width, height }));
  }, []);

  const onHorizontalScrollCallback = useCallback(function (percent) {
    dispatch(ACTIONS.onHorizontalScroll(percent));
  }, []);

  const containerEl = useResizeObserver(resizeCallback);
  return (
    <div className="react-large-table" ref={containerEl}>
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
          diffWidth={diffWidth}
          header={header}
        />
      </table>
    </div>
  );
}

export default React.memo(ReactLargeTable);
