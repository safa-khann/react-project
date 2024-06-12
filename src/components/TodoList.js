import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ tasks, toggleTaskCompletion, deleteTask, updateTask }) {
  return (
    <ul>
      {tasks.length === 0 ? (
        <li className='empty_li'>Empty</li>
      ) : (
        tasks.map(task => (
          <TodoItem 
            key={task.id} 
            task={task} 
            toggleTaskCompletion={toggleTaskCompletion} 
            deleteTask={deleteTask} 
            updateTask={updateTask} 
          />
        ))
      )}
    </ul>
  );
}

export default TodoList;
