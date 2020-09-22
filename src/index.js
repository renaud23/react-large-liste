import React from "react";
import ReactDOM from "react-dom";
import { ReactLargeList } from "./components";
import "./app.scss";

const WORDS = [
  "sed",
  "ut",
  "perspiciatis",
  "unde",
  "omnis",
  "iste",
  "natus",
  "error",
  "sit",
  "voluptatem",
  "accusantium",
  "doloremque",
  "laudantium",
  "totam",
  "rem",
  "aperiam",
  "eaque",
  "ipsa",
  "quae",
  "ab",
  "illo",
  "inventore",
  "veritatis",
  "et",
  "quasi",
  "architecto",
  "beatae",
  "vitae",
  "dicta",
  "sunt",
  "explicabo",
];
function randomPos(length) {
  return Math.trunc(Math.random() * length);
}
function getSentences(sentence = "", current) {
  const next =
    randomPos(WORDS.length / 2) + current || randomPos(WORDS.length / 2);
  if (next < WORDS.length - 1) {
    return getSentences(`${sentence} ${WORDS[next]}`, next);
  }
  return sentence;
}

const elements = new Array(15000).fill(null).map(function (_, i) {
  return { id: `Element-${i}`, content: getSentences() };
});

function LiRenderer({ id, content }) {
  return (
    <div className="my-option">
      <span className="id">{`Option id : ${id}`}</span>
      <span className="content">{content}</span>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <div className="custom-list" tabIndex="0">
      <ReactLargeList
        elements={elements}
        start={0}
        rowHeight={20}
        maxWidth={800}
        component={LiRenderer}
      ></ReactLargeList>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
