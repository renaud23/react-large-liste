import React, { useState, useEffect, useRef, useCallback } from "react";
import { VerticalScrollbar } from "../scrollbar";
import "./large-list.scss";

let __LARGE_LIST_ID__ = 1;

function LargeList({ elements = [], rowHeight, start, component: Component }) {
  const containerEl = useRef();
  const [wheel, setWheel] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(undefined);
  const [startScrollTop, setStartScrollTop] = useState(start);
  const [nbRows, setNbRows] = useState(0);
  const [startRow, setStartRow] = useState(start || 0);
  const [maxHeight] = useState(elements.length * rowHeight);
  const [viewportHeight, setViewportHeight] = useState(undefined);
  const [ariaControl] = useState(`large-list-${__LARGE_LIST_ID__++}`);
  const [ariaNow, setAriaNow] = useState(start);
  const [ariaMin] = useState(0);

  const keyDown = useCallback(
    function () {
      const next = Math.min(startRow + 1, elements.length - nbRows - 1);
      setStartRow(next);
    },
    [startRow, nbRows, elements]
  );

  const onChangeScrollPercent = useCallback(function (percent) {
    if (!isNaN(percent)) setScrollPercent(percent);
  }, []);

  const keyUp = useCallback(
    function () {
      const next = Math.max(startRow - 1, 0);
      setStartRow(next);
    },
    [startRow]
  );

  useEffect(
    function () {
      if (start !== undefined && nbRows) {
        const ref = Math.min(start, elements.length - nbRows);
        setStartScrollTop(ref);
      }
    },
    [start, nbRows, elements]
  );

  useEffect(
    function () {
      if (containerEl.current) {
        const bRect = containerEl.current.getBoundingClientRect();
        setViewportHeight(bRect.height);
        const observer = new ResizeObserver(function () {
          setRefresh(true);
        });

        observer.observe(containerEl.current);
      }
    },
    [containerEl]
  );
  useEffect(
    function () {
      if (viewportHeight && rowHeight) {
        setNbRows(Math.trunc(viewportHeight / rowHeight));
      }
    },
    [rowHeight, viewportHeight]
  );
  useEffect(
    function () {
      const now = Math.min(
        Math.ceil(scrollPercent * elements.length),
        elements.length - nbRows
      );
      if (now >= 0) {
        setStartRow(now);
        setAriaNow(now);
      }
    },
    [scrollPercent, nbRows, elements, maxHeight]
  );
  useEffect(
    function () {
      if (refresh) {
        const bRect = containerEl.current.getBoundingClientRect();
        setViewportHeight(bRect.height);
        setRefresh(false);
      }
    },
    [refresh]
  );

  const li = new Array(nbRows).fill(null).map(function (_, i) {
    const element = elements[startRow + i];
    return (
      <li key={i} style={{ height: rowHeight }}>
        <Component {...element} index={i} />
      </li>
    );
  });

  return (
    <div
      className="react-large-list"
      tabIndex="0"
      ref={containerEl}
      onWheel={function (e) {
        e.stopPropagation();
        setWheel({ delta: e.deltaY });
      }}
      onKeyDown={function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.key === "ArrowDown") {
          keyDown();
        } else if (e.key === "ArrowUp") {
          keyUp();
        }
      }}
    >
      <VerticalScrollbar
        height={viewportHeight}
        max={maxHeight}
        start={startScrollTop}
        ariaMax={elements.length}
        ariaMin={ariaMin}
        ariaNow={ariaNow}
        ariaControl={ariaControl}
        onScroll={onChangeScrollPercent}
        parentWheel={wheel}
      />
      <ul>{li}</ul>
    </div>
  );
}

export default React.memo(LargeList);
