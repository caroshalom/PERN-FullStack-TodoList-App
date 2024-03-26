const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // For PostgreSQL

const pool = new Pool({
  // Configuration for your database
  user: 'yourUsername',
  host: 'localhost',
  database: 'yourDatabase',
  password: 'yourPassword',
  port: 5432,
});

const app = express();

app.use(cors());
app.use(express.json()); // Allows us to access request bodies

// Get all tasks
app.get('/tasks', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
  res.json(rows);
});

// Create a new task
app.post('/tasks', async (req, res) => {
  const { title } = req.body;
  const { rows } = await pool.query('INSERT INTO tasks(title) VALUES($1) RETURNING *', [title]);
  res.status(201).json(rows[0]);
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const { rows } = await pool.query('UPDATE tasks SET title = $1 WHERE id = $2 RETURNING *', [title, id]);
  res.json(rows[0]);
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  res.sendStatus(204);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
