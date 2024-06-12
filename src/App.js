import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    // Retrieve tasks from localStorage on initial render
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      console.log('Loaded tasks from local storage:', JSON.parse(savedTasks));
      setTasks(JSON.parse(savedTasks));
    }
  }, []);
  
  useEffect(() => {
    console.log('Saving tasks to local storage:', tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  const addTask = (task) => {
    setTasks([...tasks, { id: Date.now(), title: task.title, description: task.description, priority: task.priority, completed: false }]);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const clearCompletedTasks = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const handleScreenToggle = (isComplete) => {
    setIsCompleteScreen(isComplete);
  };

  return (
    <div className="App">
      <div className='header'>
        <h1>To-Do List App</h1>
      </div>
      <div className='addTaskContainer'>
        <TodoForm addTask={addTask} />
      </div>
      <div className='button-container'>
        <button onClick={() => handleScreenToggle(false)} className={!isCompleteScreen ? 'active' : ''}>Todo List</button>
        <button onClick={() => handleScreenToggle(true)} className={isCompleteScreen ? 'active' : ''}>Completed</button>
      </div>
      <div className="input-container">
        {isCompleteScreen && (
          <button className='clearButton' onClick={clearCompletedTasks}>Clear All</button>
        )}
        <TodoList 
          tasks={tasks.filter(task => task.completed === isCompleteScreen)} 
          toggleTaskCompletion={toggleTaskCompletion} 
          deleteTask={deleteTask} 
          updateTask={updateTask} // Make sure this prop name matches the one expected in TodoList
        />
      </div>
    </div>
  );
}

export default App;
