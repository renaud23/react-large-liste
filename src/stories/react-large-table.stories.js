import React from "react";
import ReactLargeTable, {
  ReactLargeTableEditable,
} from "../components/large-table";
import classnames from "classnames";
import generate from "./random-table-data";

const data = generate(50, 4000);

function CustomCell({ content, column, row }) {
  const { type, value } = content;
  return <span className={classnames("my-custom-cell", type)}>{value}</span>;
}

function CustomRowNum({ index, content }) {
  return <div className="custom-row-num">{index}</div>;
}

export function EditableTable() {
  return (
    <div className="story-react-large-table">
      <ReactLargeTableEditable
        className="my-custom-theme"
        data={data}
        rowHeight={25}
        headerHeight={30}
        cellComponent={CustomCell}
        rowNumComponent={CustomRowNum}
        getContent={({ value }) => value}
        onChange={(content, value) => ({ ...content, value })}
      />
    </div>
  );
}

export function CustomThemeTable() {
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

export function DefaultTable() {
  return (
    <div className="story-react-large-table">
      <ReactLargeTable
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
