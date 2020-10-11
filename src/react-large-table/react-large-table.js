import React, { useReducer, useEffect } from "react";
import {
  TableContext,
  reducer,
  INITIAL_STATE,
  actions,
} from "./state-management";
import { ReactLargeTableContainer } from "./containers";
import { DefaultCellRenderer } from "./containers";
import PropTypes from "prop-types";
import "./react-large-table.scss";

function ReactLargeTable({
  data = {},
  headerHeight,
  className,
  treeSize = false,
  cellRenderer,
}) {
  const [state, dispatch] = useReducer(reducer, { ...INITIAL_STATE });
  const { rows, header } = data;

  useEffect(
    function () {
      dispatch(actions.onInit({ rows, header, headerHeight, treeSize }));
    },
    [rows, header, headerHeight, treeSize]
  );

  return (
    <TableContext.Provider value={[state, dispatch]}>
      <ReactLargeTableContainer
        className={className}
        cellRenderer={cellRenderer}
      />
    </TableContext.Provider>
  );
}

ReactLargeTable.prototype = {
  data: PropTypes.shape({
    header: PropTypes.arrayOf(
      PropTypes.shape({
        width: PropTypes.number.isRequired,
        label: PropTypes.string,
      }).isRequired
    ),
    rows: PropTypes.arrayOf(
      PropTypes.shape({
        __height: PropTypes.number.isRequired,
        value: PropTypes.oneOf([
          PropTypes.string,
          PropTypes.string,
          PropTypes.bool,
        ]),
      })
    ),
  }).isRequired,
  headerHeight: PropTypes.number,
  className: PropTypes.string,
  treeSize: PropTypes.bool,
  cellRenderer: PropTypes.func,
};

ReactLargeTable.defaultProps = {
  headerHeight: 30,
  className: undefined,
  treeSize: false,
  cellRenderer: DefaultCellRenderer,
};

export default ReactLargeTable;
