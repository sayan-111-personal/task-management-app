"use client";

import { useState, useEffect } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa';
import { Task } from './interfaces/task';

interface Props {
  tasks: Task[];
}

export default function TaskList({ tasks }: Props) {
  const [taskList, setTaskList] = useState(tasks);
  const [sortedTaskList, setSortedTaskList] = useState<Task[]>(tasks);
  const [newTask, setNewTask] = useState('');
  const [newDesc, setnewDesc] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [editTaskId, setEditTaskId] = useState<string | null>(null);

  // Load tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTaskList(JSON.parse(storedTasks));
    }
  }, []);

  // Update sortedTaskList whenever taskList changes
  useEffect(() => {
    const sortedTasks = [...taskList].sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }

      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    setSortedTaskList(sortedTasks);

    localStorage.setItem('tasks', JSON.stringify(taskList));

  }, [taskList]);

  const addTask = () => {
    const newTaskObj: Task = {
      id: String(Date.now()),
      title: newTask,
      description: newDesc,
      completed: false,
      priority,
    };
    setTaskList([newTaskObj, ...taskList]);
    setNewTask('');
    setnewDesc('')
  };

  const deleteTask = (id: string) => {
    setTaskList(taskList.filter(task => task.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTaskList(
      taskList.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEditTask = (task: Task) => {
    setEditTaskId(task.id);
    setNewTask(task.title);
    setnewDesc(task.description);
    setPriority(task.priority);
  };

  const saveEditTask = () => {
    setTaskList(
      taskList.map(task =>
        task.id === editTaskId ? { ...task, title: newTask, priority } : task
      )
    );
    setEditTaskId(null);
    setNewTask('');
    setnewDesc('');
  };

  return (
    <div>
      {/* Add/Edit Task */}
      <div className="flex flex-wrap gap-2 justify-center mb-4 items-center">
        <label className="input input-bordered input-primary flex items-center gap-2 w-full md:w-auto">
          Title
          <input
            type="text"
            className="w-full"
            placeholder="Add a Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </label>

        <textarea
          className="textarea textarea-primary w-full md:w-48 h-12 resize-none grow"
          placeholder="Add a description..."
          value={newDesc}
          onChange={(e) => setnewDesc(e.target.value)}
        ></textarea>

        <select
          className="select select-primary w-full md:w-auto"
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        {editTaskId ? (
          <button className="btn btn-primary w-full md:w-auto" onClick={saveEditTask}>
            Save Task
          </button>
        ) : (
          <button className="btn btn-primary w-full md:w-auto" onClick={addTask}>
            Add Task
          </button>
        )}
      </div>

      <div className="my-8 divider divider-primary">Task List</div>

      {/* Task List */}
      {sortedTaskList.length > 0 ? (
        <ul className="space-y-4 mt-10">
          {sortedTaskList.map((task) => (
            <li
              key={task.id}
              className={`flex justify-between items-center p-2 border rounded ${task.completed ? 'bg-green-100' : 'bg-white'
                }`}
            >
              <div className={task.completed ? 'line-through' : ''}>
                <h3 className={`text-xl font-semibold ${task.completed ? 'text-gray-500' : 'text-gray-700'}`}>{task.title}</h3>
              </div>
              <p className="text-gray-500">{task.description}</p>
              <div
                className={`badge badge-lg 
                  ${task.priority === 'high' ? 'badge-error' : ''}
                  ${task.priority === 'medium' ? 'badge-warning' : ''}
                  ${task.priority === 'low' ? 'badge-success' : ''}
                  `}>{task.priority}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => toggleComplete(task.id)}
                >
                  {task.completed ? (<FaRegCheckCircle />)
                                  : (<FaRegCircle />)}
                  {task.completed ? (<span>completed</span>)
                                  : (<span>incomplete</span>)}
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => startEditTask(task)}
                  disabled={task.completed}
                >
                  <AiFillEdit />
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => deleteTask(task.id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-500">No tasks available</div>
      )}
    </div>
  );
}
