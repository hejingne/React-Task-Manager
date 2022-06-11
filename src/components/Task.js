import React, {useState} from "react";

export default function Task(props) {
  /* View state */
  const [isEditing, setEditing] = useState(false);
  /* Edited task name state */
  const [editName, setEditName] = useState('');
  /* 2 Different Views */
  const editingView = (
    <form className="stack-small"
          onSubmit={handleEditSave}>
      <div className="form-group">
          <label className="todo-label" htmlFor={props.id}>
          New name for '{props.name}'
          </label>
          <input id={props.id}
                 className="todo-text"
                 type="text"
                 value={editName}
                 onChange={handleInputChange} />
      </div>
      <div className="btn-group">
          <button type="button"
                  className="btn todo-cancel"
                  onClick={() => setEditing(false)}>
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
                 onChange={() => props.toggleTaskChecked(props.id)} />
          <label className="todo-label" htmlFor={props.id}>
            Learn {props.name}
          </label>
        <button type="button"
                className="btn"
                onClick={() => setEditing(true)}>
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
  /* Function invoked by editing a task */
  function handleInputChange(e) {
    setEditName(e.target.value)
  }
  /* Function invoked by saving name change */
  function handleEditSave(e) {
    e.preventDefault();
    if (editName === "") {
      alert("Please provide a name for the selected task.")
    } else if (editName === props.name) {
      alert("Name has to be different from current name of the task.")
      setEditName("");
    } else {
      props.editTask(props.id, editName);
      setEditName("");
      setEditing(false);
    }
  }

  return (
    <li className="todo stack-small">
      {isEditing ? editingView : listView}
    </li>
  );
}
