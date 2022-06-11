import React from "react";

export default function FilterBtn(props) {
  return (
    <button type="button"
            className="btn btn_toggle"
            aria-pressed={props.isPressed}
            onClick={() => props.setFilter(props.name)}>
      <span classname="visually_hidden">
        Show {props.name} Tasks
      </span>
    </button>
  );
}
