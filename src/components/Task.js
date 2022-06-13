import React, { useState, useRef, useEffect } from "react";

// Custom Hook
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value
  });
  return ref.current;
}

export default function Task(props) {
  // States
  const [isEditing, setIsEditing] = useState(false);  // view
  const [name, setName] = useState(''); // edit field value
  const editFieldRef = useRef(null);  // reference to edit field
  const editBtnRef = useRef(null);  // reference to edit button
  const wasEditing = usePrevious(isEditing);  // previous value of isEditing

  // 2 Different Views
  const editView = (
    <form className="stack-small"
          onSubmit={saveEdit}>
      <div className="form-group">
          <label className="todo-label" htmlFor={props.id}>
          New name for '{props.name}'
          </label>
          <input id={props.id}
                 className="todo-text"
                 type="text"
                 value={name}
                 onChange={e => setName(e.target.value)}
                 ref={editFieldRef}/>
      </div>
      <div className="btn-group">
          <button type="button"
                  className="btn todo-cancel"
                  onClick={cancelEdit}>
            Cancel
          </button>
          <button type="submit"
                  className="btn btn__primary todo-edit">
            Save
          </button>
      </div>
    </form>
  );
  const listView = (
    <form className="stack-small">
      <div className="c-cb">
          <input type="checkbox"
                 id={props.id}
                 defaultChecked={props.checked}
                 onChange={() => props.checkTask(props.id)} />
          <label className="todo-label" htmlFor={props.id}>
            Learn {props.name}
          </label>
        <button type="button"
                className="btn"
                onClick={() => setIsEditing(true)}
                ref={editBtnRef}>
          Edit
        </button>
        <button type="button"
                className="btn btn_danger"
                onClick={() => props.deleteTask(props.id)}>
          Delete
        </button>
      </div>
    </form>
  );

  function saveEdit(e) {
    e.preventDefault();
    if (name === "") {
      alert("Please provide a name for the selected task.")
    } else if (name === props.name) {
      alert("Name has to be different from current name of the task.")
      setName("");
    } else {
      props.editTask(props.id, name);
      setName("");
      setIsEditing(false);
    }
  }

  function cancelEdit() {
    setName("");
    setIsEditing(false);
  }

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editBtnRef.current.focus();
    }
  }, [wasEditing, isEditing]);  // change focus only when toggling between edit and list view

  return (
    <li className="todo stack-small">
      {isEditing ? editView : listView}
    </li>
  );
}
