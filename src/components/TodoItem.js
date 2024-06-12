import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';

function TodoItem({ task, toggleTaskCompletion, deleteTask, updateTask }) {
  const [editedTask, setEditedTask] = useState({ ...task });
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateTask(editedTask);
    setIsEditing(false);
  };

  return (
    <li className={task.completed ? 'completed' : ''}>
      <div className="task-details">
        {isEditing ? (
          <>
            <input
              className='editTitle'
              type="text"
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            />
            <input
              className='editDesc'
              type="text"
              value={editedTask.description}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            />
            <select
              className='editPriority'
              value={editedTask.priority}
              onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button className='saveButton' onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <span className="task-title">{task.title}</span>
            <p className="task-description">{task.description}</p>
            <span className={`priority ${task.priority}`}>{task.priority}</span>
          </>
        )}
      </div>
      <div className="task-actions">
        {!isEditing && (
          <>
            {task.completed ? (
              <button className="delete-button" onClick={() => deleteTask(task.id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
            ) : (
              <>
                <button onClick={handleEdit}><FontAwesomeIcon icon={faEdit} /></button>
                <button className="delete-button" onClick={() => deleteTask(task.id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                <button className="checkbox-button" onClick={() => toggleTaskCompletion(task.id)}>
                  {task.completed ? <FontAwesomeIcon icon={faCircle} /> : <FontAwesomeIcon icon={faCheckCircle} />}
                </button>
              </>
            )}
          </>
        )}
      </div>
    </li>
  );
}

export default TodoItem;
