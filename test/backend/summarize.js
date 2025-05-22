// summarize.js
const db = require('./db');
const axios = require('axios');

async function summarizeAndSend() {
  const todos = await db.getTodos();
 if (!todos || todos.length === 0) {
  console.log("No todos to summarize.");
  return;
}

  const content = todos.map(t => `- ${t.text}`).join('\n');

  const openaiResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: `Summarize these todos:\n${content}` }],
  }, {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  const summary = openaiResponse.data.choices[0].message.content;

  await axios.post(process.env.SLACK_WEBHOOK_URL, {
    text: `📝 *Todo Summary:*\n${summary}`,
  });
}

module.exports = summarizeAndSend;
