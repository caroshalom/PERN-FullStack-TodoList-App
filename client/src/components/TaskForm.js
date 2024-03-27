import React, { Fragment, useState } from "react";

const TaskForm = () => {
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false); // Estado para is_completed

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { description, is_completed: isCompleted }; // Enviamos is_completed al backend
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default TaskForm;
