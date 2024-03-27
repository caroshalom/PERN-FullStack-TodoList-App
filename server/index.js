const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db"); 

// Middleware
app.use(cors());
app.use(express.json()); // Permite al servidor leer JSON del cuerpo de la solicitud

// Crear una tarea
app.post("/todos", async (req, res) => {
  try {
    const { description, is_completed } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description, is_completed) VALUES($1, $2) RETURNING *",
      [description, is_completed || false] // Por defecto, las nuevas tareas no están completadas
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Obtener todas las tareas
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Actualizar una tarea (incluido el estado de completitud)
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, is_completed } = req.body;
    await pool.query(
      "UPDATE todo SET description = $1, is_completed = $2 WHERE todo_id = $3",
      [description, is_completed, id]
    );
    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

// Eliminar una tarea
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
