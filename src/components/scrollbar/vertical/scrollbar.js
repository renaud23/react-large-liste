import React from "react";
import Scrollbar from "../commons";
import "./scrollbar.scss";

function VerticalScrollBar(props) {
  return (
    <Scrollbar rootClassName="custom-vertical-scrollBar" vertical {...props} />
  );
}

export default React.memo(VerticalScrollBar);
