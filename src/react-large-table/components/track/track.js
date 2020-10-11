import React, { useEffect, useCallback, useState } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import "./track.scss";

function getStyle(vertical, pos) {
  if (vertical) {
    return { left: pos };
  }
  return { top: pos };
}

function Track({ onTrack, vertical, horizontal, right, left, top, bottom }) {
  const [track, setTrack] = useState(false);
  const [clientPos, setClientPos] = useState(undefined);
  const [currentPos, setCurrentPos] = useState(undefined);
  const onmousemove = useCallback(
    function (e) {
      if (track) {
        if (vertical) {
          setCurrentPos(e.clientX);
        } else {
          setCurrentPos(e.clientY);
        }
      }
    },
    [track, vertical]
  );
  const onmousedown = useCallback(
    function (e) {
      setTrack(true);
      e.stopPropagation();

      if (vertical) {
        setClientPos(e.clientX);
        setCurrentPos(e.clientX);
      } else {
        setClientPos(e.clientY);
        setCurrentPos(e.clientY);
      }
    },
    [vertical]
  );
  const onmouseup = useCallback(
    function (e) {
      if (track) {
        e.stopPropagation();
        setTrack(false);
        if (vertical) {
          onTrack(e.clientX - clientPos);
        } else {
          onTrack(e.clientY - clientPos);
        }
      }
    },
    [track, vertical, onTrack, clientPos]
  );

  useEffect(function () {
    window.addEventListener("mousemove", onmousemove);
    window.addEventListener("mouseup", onmouseup);
    return function () {
      window.removeEventListener("mousemove", onmousemove);
      window.removeEventListener("mouseup", onmouseup);
    };
  });

  const style = getStyle(vertical, currentPos);
  return (
    <div
      aria-hidden="true"
      className={classnames("react-large-table-track", {
        vertical,
        horizontal: horizontal,
        right,
        left,
        top,
        bottom,
      })}
      onMouseDown={onmousedown}
    >
      {track ? <div className="track-bar" style={style}></div> : null}
    </div>
  );
}

Track.propTypes = {
  onTrack: PropTypes.func.isRequired,
  vertical: PropTypes.bool,
  horizontal: PropTypes.bool,
  right: PropTypes.bool,
  left: PropTypes.bool,
};

Track.defaultProps = {
  vertical: true,
  right: true,
  left: false,
  horizontal: true,
};

export default Track;
