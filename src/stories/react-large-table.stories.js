import React from "react";
import ReactLargeTable from "../react-large-table";
import generate from "./random-table-data";
import classnames from "classnames";
import "./custom-large-table.scss";

const __WIDTH__ = 50;
const __HEIGHT__ = 10000;

const data = generate(__WIDTH__, __HEIGHT__);

export function DefaultTable() {
  return (
    <>
      <p>
        A large table of {__WIDTH__} columns and {__HEIGHT__} rows,
        {__WIDTH__ * __HEIGHT__} cells.
      </p>
      <div className="default-table-container">
        <ReactLargeTable
          className="custom-large-table-theme"
          data={data}
          headerHeight={30}
          treeSize={true}
        />
      </div>
    </>
  );
}

function CustomCellRenderer({ cell, height }) {
  const { value, type } = cell;
  return (
    <span
      style={{ lineHeight: `${height}px` }}
      className={classnames("custom-cell-renderer", type)}
    >
      {value}
    </span>
  );
}

export function CustomCellTable() {
  return (
    <>
      <p>
        A large table of {__WIDTH__} columns and {__HEIGHT__} rows,
        {__WIDTH__ * __HEIGHT__} cells.
      </p>
      <div className="default-table-container">
        <ReactLargeTable
          className="custom-large-table-theme"
          data={data}
          headerHeight={30}
          cellRenderer={CustomCellRenderer}
        />
      </div>
    </>
  );
}

export default {
  title: "react-large-table",
  component: ReactLargeTable,
  argTypes: {},
};
