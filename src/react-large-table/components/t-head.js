import React, { useContext } from "react";
import { TableContext } from "../state-management";
import { safeCss } from "../commons";

function THead({ children }) {
  const [state] = useContext(TableContext);
  const { horizontal, headerHeight } = state;
  const { margin } = horizontal;

  return (
    <thead
      className="react-large-table-thead-el"
      style={{ height: safeCss(headerHeight), marginLeft: safeCss(margin) }}
    >
      {children}
    </thead>
  );
}

export default THead;
