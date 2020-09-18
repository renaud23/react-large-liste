import React from "react";
import ReactDOM from "react-dom";
import { ReactLargeList } from "./components";
import "./app.scss";

const elements = new Array(15).fill(null).map(function (_, i) {
  return { id: `Element-${i}` };
});

function LiRenderer({ id }) {
  return <span className="">{`Option id : ${id}`}</span>;
}

ReactDOM.render(
  <React.StrictMode>
    <div className="custom-list" tabIndex="0">
      <ReactLargeList
        elements={elements}
        start={0}
        rowHeight={20}
        component={LiRenderer}
      ></ReactLargeList>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
