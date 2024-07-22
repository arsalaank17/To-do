import React, { useState } from 'react'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

function ToDoList() {
  const [tasks, setTasks] = useState(["Task 1", "Task 2", "Task 3", "Task 4"]);
  const [newTask, setNewTask] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value)
  }

  function handleSearchChange(event) {
    setSearchQuery(event.target.value)
  }

  function handleEditInputChange(event) {
    setEditTaskText(event.target.value)
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks(t => [...t, newTask])
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((element, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    // Implement move task up logic
  }

  function moveTaskDown(index) {
    // Implement move task down logic
  }

  function startEditing(index) {
    setIsEditing(true);
    setEditIndex(index);
    setEditTaskText(tasks[index]);
  }

  function saveEditTask() {
    const updatedTasks = tasks.map((task, i) => i === editIndex ? editTaskText : task);
    setTasks(updatedTasks);
    setIsEditing(false);
    setEditIndex(null);
    setEditTaskText("");
  }

  const filteredTasks = tasks.filter(task => task.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className='to-do-list'>
      <h1>To-Do-List</h1>

      <div>
        <input
          type="text"
          placeholder='Enter a task...'
          value={newTask}
          onChange={handleInputChange}>
        </input>
        <button
          className='add-button'
          onClick={addTask}
        >Add </button>
        <input
          type="text"
          placeholder='Search tasks...'
          value={searchQuery}
          onChange={handleSearchChange}>
        </input>
      </div>

      <ol>
        {filteredTasks.map((task, index) =>
          <li key={index}>
            {isEditing && editIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editTaskText}
                  onChange={handleEditInputChange}
                />
                <button
                  className='save-edit-button'
                  onClick={saveEditTask}>
                  Save
                </button>
              </div>
            ) : (
              <span className="text">{task}</span>
            )}
            <button
              className='delete-button'
              onClick={() => deleteTask(index)}>
              Delete
            </button>
            <button
              className='move-task-up'
              onClick={() => moveTaskUp(index)}>
              Up
            </button>
            <button
              className='move-task-down'
              onClick={() => moveTaskDown(index)}>
              Down
            </button>
            <button
              className='edit-button'
              onClick={() => startEditing(index)}>
              <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#dbd400", }} />
            </button>
          </li>
        )}
      </ol>
    </div>
  )
}

export default ToDoList
