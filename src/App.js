import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000');
      setTasks(response.data);
    } catch (error) {
      console.error("There was an error fetching the tasks!", error);
    }
  };



  const addTask = async () => {
    if (task === '') return;

    try {
      await axios.post('http://localhost:8000', { task });
      setTask('');
      fetchTasks();
    } catch (error) {
      console.error("There was an error adding the task!", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete('http://localhost:8000', { data: { id } });
      fetchTasks();
    } catch (error) {
      console.error("There was an error deleting the task!", error);
    }
  };

  return (
    <div className="App container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ToDo App</h1>
      <div className="mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <button onClick={addTask} className="btn btn-primary ml-2">Add Task</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Task</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.task}</td>
                <td>
                  <button onClick={() => deleteTask(task.id)} className="btn btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;


