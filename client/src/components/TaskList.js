import React, { Fragment, useEffect, useState } from "react";
import TaskEdit from "./TaskEdit";

const TaskList = () => {
  const [todos, setTodos] = useState([]);

  // Cargar las tareas al montar el componente
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  // Actualizar el estado de completitud de una tarea
  const toggleCompleted = async (id, isCompleted) => {
    try {
      const body = { is_completed: !isCompleted };
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      getTodos(); // Recargar las tareas para reflejar los cambios
    } catch (err) {
      console.error(err.message);
    }
  };

  // Eliminar una tarea
  const deleteTodo = async id => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE"
      });
      setTodos(todos.filter(todo => todo.todo_id !== id)); // Actualizar el estado local para reflejar la tarea eliminada
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <TaskEdit todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={todo.is_completed}
                  onChange={() => toggleCompleted(todo.todo_id, todo.is_completed)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default TaskList;
