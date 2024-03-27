import React, { Fragment } from "react";
import "./App.css";

//components

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  return (
    <Fragment>
      <div className="container">
        <TaskForm />
        <TaskList />
      </div>
    </Fragment>
  );
}

export default App;