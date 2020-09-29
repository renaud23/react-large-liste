import React, { useEffect, useCallback, useState, useRef } from "react";
import "./cell-editable.scss";

function Edit({ onBlur, value: original }) {
  const inputEl = useRef();
  const [value, setValue] = useState(original);
  const onChangeCallback = useCallback(function (e) {
    e.stopPropagation();
    setValue(e.target.value);
  }, []);

  useEffect(
    function () {
      const { current } = inputEl;
      if (current) {
        current.focus();
      }
    },
    [inputEl]
  );

  return (
    <input
      className="react-large-table-cell-input"
      ref={inputEl}
      type="text"
      value={value}
      onBlur={() => onBlur(value)}
      onChange={onChangeCallback}
      onKeyDown={function (e) {
        e.stopPropagation();
        if (e.key === "Enter") {
          inputEl.current.blur();
          onBlur(value);
        } else if (e.key === "Escape") {
          setValue("");
        }
      }}
    />
  );
}

/**
 *
 * @param {*} param0
 */
function CellEditable({
  children,
  content,
  value,
  onChange = () => null,
  column,
  row,
  width,
  height,
}) {
  const [edit, setEdit] = useState(false);
  const onClickCallback = useCallback(
    function () {
      if (!edit) {
        setEdit(true);
      }
    },
    [edit]
  );

  const onBlurCallback = useCallback(
    function (newValue) {
      setEdit(false);
      onChange(content, newValue, row, column);
    },
    [row, column, onChange, content]
  );

  return (
    <div className="react-large-table-cell-editable" onClick={onClickCallback}>
      {edit ? (
        <Edit
          onBlur={onBlurCallback}
          value={value}
          width={width}
          height={height}
        />
      ) : (
        children
      )}
    </div>
  );
}

export default CellEditable;
