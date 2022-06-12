import React, {useState} from "react";

export default function Form(props) {
  const [name, setName] = useState('');

  function handleBtnSubmit(e) {
    e.preventDefault();
    if (name !== "") {
      props.addTask(name);
      setName("");
    } else {
      alert("Please provide a task");
    }
  }

  return (
    <form>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label_lg">
          What is the task that needs to be done?
          </label>
      </h2>

      <input type="text"
             id="new-todo-input"
             className="input input_lg"
             name="text"
             autoComplete="off"
             value={name}
             onChange={e => setName(e.target.value)}/>

      <button type="submit"
              className="btn btn__primary btn__lg"
              onClick={handleBtnSubmit}>
        Add Task
      </button>
    </form>
  );
}
