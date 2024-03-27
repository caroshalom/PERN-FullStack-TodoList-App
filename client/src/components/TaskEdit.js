import React, { Fragment, useState } from "react";

const TaskEdit = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);
  const [isCompleted, setIsCompleted] = useState(todo.is_completed);

  const updateDescription = async e => {
    e.preventDefault();
    try {
      const body = { description, is_completed: isCompleted };
      await fetch(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>

      <div
        className="modal"
        id={`id${todo.todo_id}`}
        onClick={() => {
          setDescription(todo.description);
          setIsCompleted(todo.is_completed);
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => {
                  setDescription(todo.description);
                  setIsCompleted(todo.is_completed);
                }}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={isCompleted}
                  onChange={e => setIsCompleted(e.target.checked)}
                  id="completedCheckbox"
                />
                <label className="form-check-label" htmlFor="completedCheckbox">
                  Completed
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateDescription(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => {
                  setDescription(todo.description);
                  setIsCompleted(todo.is_completed);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TaskEdit;
