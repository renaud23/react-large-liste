import React from "react";
import ReactLargeTable from "../components/large-table";
import classnames from "classnames";
import generate from "./random-table-data";

function CustomCell({ content, column, row }) {
  const { type, value } = content;
  return <span className={classnames("my-custom-cell", type)}>{value}</span>;
}

export function DefaultTable() {
  const data = generate(50, 4000);

  return (
    <div className="story-react-large-table">
      <ReactLargeTable
        className="my-custom-theme"
        data={data}
        rowHeight={25}
        headerHeight={30}
        cellComponent={CustomCell}
      />
    </div>
  );
}

export default {
  title: "react-large-table",
  component: ReactLargeTable,
  argTypes: {},
};
