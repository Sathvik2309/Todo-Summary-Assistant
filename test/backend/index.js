// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const todosRouter = require('./routes/todos');
const summarizeAndSend = require('./summarize');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/todos', todosRouter);

app.post('/summarize', async (req, res) => {
  try {
    await summarizeAndSend();
    res.status(200).json({ message: 'Summary sent to Slack' });
  } catch (err) {
    console.error('POST /summarize error:', err);
    res.status(500).json({ error: err.message || 'Failed to summarize and send to Slack' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
