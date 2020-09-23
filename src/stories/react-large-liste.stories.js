import React from "react";
import { ReactLargeList } from "../components";
import OffsetChar from "./offset-char";
import generate from "./random-entities";
import "./app.scss";

function LiRenderer({ id, content }) {
  return (
    <div className="my-option">
      <span className="id">{`Option id : ${id}`}</span>
      <span className="content">{content}</span>
    </div>
  );
}

function ReactLargeListe({ elements, offsetChar, className }) {
  const maxWidth = elements.reduce(function (max, { id, content }) {
    const w = (id.length + content.length) * offsetChar;
    return Math.max(max, w);
  }, 0);
  return (
    <ReactLargeList
      elements={elements}
      start={0}
      rowHeight={20}
      maxWidth={maxWidth}
      component={LiRenderer}
      className={className}
    />
  );
}

export function CustomTheme() {
  const elements = generate(15000);
  return (
    <div className="custom-list" tabIndex="0">
      <OffsetChar>
        <ReactLargeListe elements={elements} className="custom-theme-winter" />
      </OffsetChar>
    </div>
  );
}

export function DefaultTheme() {
  const elements = generate(15000);
  return (
    <div className="custom-list" tabIndex="0">
      <OffsetChar>
        <ReactLargeListe elements={elements} />
      </OffsetChar>
    </div>
  );
}

export default {
  title: "react-large-liste",
  component: ReactLargeList,
  argTypes: {},
};
