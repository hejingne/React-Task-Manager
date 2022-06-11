import React, {useState} from "react";
import Task from "./components/Task";
import Form from "./components/Form";
import FilterBtn from "./components/FilterBtn";

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.checked,
  Completed: task => task.checked
}
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  /* Tasks State */
  const [tasks, setTasks] = useState(props.tasks);
  /* Filter keyword state */
  const [filter, setFilter] = useState('All');
  /* Function invoked by the `Add Task` button */
  function addTask(name) {
    const length = tasks.length + 1;
    const newId = "todo-" + length;
    const newTask = {
      name: name,
      checked: false,
      id: newId,
      key: newId
    };
    setTasks([...tasks, newTask]);
  }
  /* Generate static filter buttons */
  const filterBtnList = FILTER_NAMES.map(name => <FilterBtn name={name}
                                                            key={name}
                                                            isPressed={name === filter}
                                                            setFilter={setFilter}/>);
  /* Variable used for generating dynamic list of tasks */
  const taskList = tasks
                   .filter(FILTER_MAP[filter])
                   .map(task => <Task name={task.name}
                                      checked={task.checked}
                                      id={task.id}
                                      key={task.id}
                                      toggleTaskChecked={toggleTaskChecked}
                                      editTask={editTask}
                                      deleteTask={deleteTask} />
                                  );
  /* Generate dynamic heading message */
  const tasksNoun = taskList.length <= 1 ? 'task' : 'tasks';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  /* Function invoked by toggling checkboxes */
  function toggleTaskChecked(id) {  // To synchronize the browser with our data
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {...task, checked: !task.checked};
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
  }
  /* Function invoked by editing a task */
  function editTask(id, newName) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {...task, name: newName};
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
  }
  /* Function invoked by deleting a task */
  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => task.id !== id);
    setTasks(remainingTasks);
  }

  return (
    <div className="app_stack_lg">
      <h1> {props.subject} </h1>

      <Form addTask={addTask} />

      <div className="filters btn-group stack-exception">
        {filterBtnList}
      </div>

      <h2 className="list-heading"> {headingText} </h2>

      <ul role="list"
          className="todo-list stack-large stack-exception"
          aria_labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
