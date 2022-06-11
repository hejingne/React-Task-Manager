import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const TASKS = [
  {
    name: "React.js",
    checked: true,
    id:"todo-0"
  },
  {
    name: "Angular.js",
    checked: false,
    id:"todo-1"
  },
  {
    name: "Bootstrap",
    checked: false,
    id:"todo-2"
  }
];

root.render(
  <React.StrictMode>
    <App subject="React Task Manager" tasks={TASKS}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
