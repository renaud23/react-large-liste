import React from "react";
import ReactLargeTable from "../components/large-table";
import generate from "./random-table-data";

export function DefaultTable() {
  const data = generate(30, 10000);

  return (
    <div className="story-react-large-table">
      <ReactLargeTable data={data} rowHeight={20} headerHeight={25} />
    </div>
  );
}

export default {
  title: "react-large-table",
  component: ReactLargeTable,
  argTypes: {},
};
