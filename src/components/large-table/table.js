import React, { useState, useEffect, useRef } from "react";
import classnames from "classnames";
import { VerticalScrollbar } from "../scrollbar";
import "./table.scss";

function ReactLargeTable({ className }) {
  const containerEl = useRef();
  const [scrollTop, setScrollTop] = useState(undefined);
  const [viewportHeight, setViewportHeight] = useState(undefined);
  const [ariaVerticalScroll] = useState({
    controls: "table",
    max: 0,
    min: 0,
    now: 0,
  });
  useEffect(
    function () {
      console.log(scrollTop);
    },
    [scrollTop]
  );

  useEffect(
    function () {
      if (containerEl.current) {
        const bRect = containerEl.current.getBoundingClientRect();
        setViewportHeight(bRect.height);
      }
    },
    [containerEl]
  );
  return (
    <div
      className={classnames("react-large-table", className)}
      ref={containerEl}
    >
      <VerticalScrollbar
        height={viewportHeight}
        max={800}
        start={0}
        aria={ariaVerticalScroll}
        onScroll={function (top) {
          setScrollTop(top);
        }}
      />
      <table className="">
        <thead className=""></thead>
        <tbody className=""></tbody>
      </table>
    </div>
  );
}

export default ReactLargeTable;
