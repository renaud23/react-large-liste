import React from "react";
import Scrollbar from "../commons";
import "./scrollbar.scss";

function HorizontalScrollBar(props) {
  return <Scrollbar rootClassName="custom-horizontal-scrollBar" {...props} />;
}

export default React.memo(HorizontalScrollBar);
