import React, { useState, useRef, useEffect } from "react";
import Task from "./components/Task";
import Form from "./components/Form";
import FilterBtn from "./components/FilterBtn";

// Custom Hook
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.checked,
  Completed: task => task.checked
}

function App(props) {
  // States
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');
  const headingRef = useRef(null);
  const prevTasklength = usePrevious(tasks.length);

  // Dynamic list of tasks
  const taskList = tasks
                   .filter(FILTER_MAP[filter])
                   .map(task => <Task name={task.name}
                                      id={task.id}
                                      key={task.id}
                                      checked={task.checked}
                                      checkTask={checkTask}
                                      editTask={editTask}
                                      deleteTask={deleteTask} />);
  // Dynamic heading message
  const tasksNoun = taskList.length <= 1 ? 'task' : 'tasks';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  // Static filter buttons
  const filterBtnList = Object.keys(FILTER_MAP)
                              .map(keyword => <FilterBtn name={keyword}
                                                         key={keyword}
                                                         isPressed={keyword === filter}
                                                         setFilter={setFilter} />);

  // Actions
  function addTask(name) {
    const newId = `todo-${tasks.length + 1}`;
    const newTask = {
      name: name,
      id: newId,
      key: newId,
      checked: false
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
  }

  function checkTask(id) {
    const updatedTasks = tasks.map(task => (task.id === id)
                                      ? {...task, checked: !task.checked}
                                      : task);
    setTasks(updatedTasks);
  }

  function editTask(id, newName) {
    const updatedTasks = tasks.map(task => (task.id === id)
                                      ? {...task, name: newName}
                                      : task);
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => task.id !== id);
    setTasks(remainingTasks);
  }

  useEffect(() => {
    if (tasks.length - prevTasklength === -1) {
      headingRef.current.focus();
    }
  }, [tasks.length, prevTasklength]);   // change focus onto the heading message when a task is deleted

  return (
    <div className="app_stack_lg">
      <h1> {props.subject} </h1>

      <Form addTask={addTask} />

      <div className="filters btn-group stack-exception">
          {filterBtnList}
      </div>

      <h2 className="list-heading"
          tabIndex="-1"
          ref={headingRef}>
          {headingText}
      </h2>

      <ul role="list"
          className="todo-list stack-large stack-exception"
          aria_labelledby="list-heading">
          {taskList}
      </ul>
    </div>
  );
}

export default App;
