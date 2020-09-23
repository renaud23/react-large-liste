import React from "react";
import ReactLargeTable from "../components/large-table";
import generate from "./random-table-data";

export function DefaultTable() {
  const data = generate(100, 1000);
  return (
    <div className="story-react-large-table">
      <ReactLargeTable data={data} rowHeight={20} />
    </div>
  );
}

export default {
  title: "react-large-table",
  component: ReactLargeTable,
  argTypes: {},
};
