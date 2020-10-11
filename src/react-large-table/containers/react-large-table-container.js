import React, { useCallback, useContext, useEffect } from "react";
import ReactScrollable from "react-scrollable-div";
import Table from "../components/table";
import THead from "../components/t-head";
import Tr from "../components/tr";
import TBody from "../components/t-body";
import BodyContent from "./body-content";
import HeaderContent from "./header-content";
import { TableContext, actions } from "../state-management";
import classnames from "classnames";

function ReactLargeTableContainer({ className, cellRenderer }) {
  const [state, dispatch] = useContext(TableContext);
  const { header, horizontal, vertical, rows, headerHeight } = state;

  const {
    maxSize: maxWidth,
    scrollRequest: horizontalScrollPercentRequest,
  } = horizontal;

  const {
    maxSize: maxHeight,
    scrollRequest: verticalScrollPercentRequest,
  } = vertical;

  const onHorizontalScrollCallback = useCallback(
    function (percent) {
      dispatch(actions.onHorizontalScroll(percent));
    },
    [dispatch]
  );

  const onVerticalScrollCallback = useCallback(
    function (percent) {
      dispatch(actions.onVerticalScroll(percent));
    },
    [dispatch]
  );

  const onResizeCallback = useCallback(
    function (width, height) {
      dispatch(actions.onResize(width, height));
    },
    [dispatch]
  );

  useEffect(
    function () {
      dispatch(actions.onRefreshHeader());
    },
    [header, dispatch]
  );

  useEffect(
    function () {
      dispatch(actions.onRefreshRows());
    },
    [rows, dispatch]
  );

  return (
    <div className={classnames("react-large-table", className)}>
      <ReactScrollable
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        onHorizontalScroll={onHorizontalScrollCallback}
        onVerticalScroll={onVerticalScrollCallback}
        verticalScrollPercentRequest={verticalScrollPercentRequest}
        horizontalScrollPercentRequest={horizontalScrollPercentRequest}
        onResize={onResizeCallback}
      >
        <Table>
          <THead>
            <Tr heigh={headerHeight}>
              <HeaderContent />
            </Tr>
          </THead>
          <TBody>
            <BodyContent cellRenderer={cellRenderer} />
          </TBody>
        </Table>
      </ReactScrollable>
    </div>
  );
}

export default ReactLargeTableContainer;
