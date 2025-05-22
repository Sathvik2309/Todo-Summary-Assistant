import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TodoList.css';

const API_BASE = "http://localhost:4000";

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fdfdfd',
    fontFamily: 'Arial, sans-serif',
  },
  inputGroup: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #aaa',
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  deleteBtn: {
    backgroundColor: '#dc3545',
    border: 'none',
    color: 'white',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  summarizeBtn: {
    marginTop: '20px',
    backgroundColor: '#28a745',
  },
  message: {
    marginTop: '15px',
    fontWeight: 'bold',
  },
};

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API_BASE}/todos`);
      setTodos(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
      setTodos([]);
    }
  };

  const addTodo = async () => {
    if (!task.trim()) return;
    try {
      await axios.post(`${API_BASE}/todos`, { text: task.trim() });
      setTask('');
      fetchTodos();
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE}/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const summarize = async () => {
    try {
      await axios.post(`${API_BASE}/summarize`);
      setMessage('✅ Summary sent to Slack successfully!');
    } catch (err) {
      setMessage('❌ Failed to send summary.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>📝 Todo Summary Assistant</h2>

      <div style={styles.inputGroup}>
        <input
          style={styles.input}
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="New task"
        />
        <button style={styles.button} onClick={addTodo}>Add</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {Array.isArray(todos) && todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo.id} style={styles.listItem}>
              {todo.text}
              <button style={styles.deleteBtn} onClick={() => deleteTodo(todo.id)}>X</button>
            </li>
          ))
        ) : (
          <li style={{ textAlign: 'center', color: '#999' }}>No todos available</li>
        )}
      </ul>

      <button style={{ ...styles.button, ...styles.summarizeBtn }} onClick={summarize}>
        Summarize & Send to Slack
      </button>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

export default TodoList;
