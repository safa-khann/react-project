import React, { useState } from 'react';

function TodoForm({ addTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim() && priority.trim()) {
      addTask({ title, description, priority });
      setTitle('');
      setDescription('');
      setPriority('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="task-title"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        className="task-description"
      />
      <select
        className="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option className='redpriority' value="" disabled>Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button className="addButton" type="submit">Add</button>
    </form>
  );
}

export default TodoForm;
