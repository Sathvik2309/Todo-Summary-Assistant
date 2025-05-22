const express = require('express');
const router = express.Router();

let todos = [];
let idCounter = 1;

router.get('/', (req, res) => {
  res.json(todos);
});

router.post('/', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  const newTodo = { id: idCounter++, text };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.status(204).send();
});

module.exports = router;
