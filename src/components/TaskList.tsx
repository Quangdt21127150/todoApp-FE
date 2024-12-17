import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import { Task, TaskService } from "../services/TaskServices";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import LogoutButton from "./LogoutButton";

const TaskList: React.FC = () => {
  const initTasks = useSelector((state: RootState) => state.tasks.tasks);
  const [tasks, setTasks] = useState<Task[]>(initTasks);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);
  const token = useSelector((state: RootState) => state.auth.token)!;

  const fetchTasks = async () => {
    const tasksData = await TaskService.getTasks(token);
    setTasks(tasksData);
  };

  useEffect(() => {
    fetchTasks();
  });

  const handleDelete = async (id: string) => {
    await TaskService.deleteTask(id, token);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const handleEdit = (task: Task) => {
    setCurrentTask(task);
  };

  const handleUpdate = async (task: Task) => {
    const updatedTask = await TaskService.updateTask(
      currentTask!._id,
      task,
      token
    );
    setTasks(tasks.map((t) => (t._id === currentTask!._id ? updatedTask : t)));
    setCurrentTask(undefined);
    window.location.reload();
  };

  const handleCreate = async (task: Omit<Task, "_id">) => {
    const newTask = await TaskService.createTask(task, token);
    setTasks([...tasks, newTask]);
    window.location.reload();
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 space-y-10 relative">
      <LogoutButton />

      <h2 className="text-2xl text-center font-semibold text-gray-900">
        Task Manager
      </h2>

      <div className="w-full mx-auto lg:w-1/3">
        <TaskForm
          onSubmit={currentTask ? handleUpdate : handleCreate}
          defaultValues={currentTask}
        />
      </div>

      <div className="mt-5 overflow-x-auto">
        <ul
          className="flex space-x-4 justify-center"
          style={{ width: "calc(3 * 16rem)" }}
        >
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex-shrink-0 w-64 p-4 bg-white shadow-md rounded-md"
            >
              <h3 className="text-lg font-semibold text-gray-800 text-center">
                {task.title}
              </h3>
              <p className="text-center">{task.description}</p>
              <p className="text-center">
                {task.completedAt
                  ? `Completed at: ${new Date(
                      task.completedAt
                    ).toLocaleDateString()}`
                  : "Incomplete"}
              </p>
              <div className="mt-4 space-x-2 flex justify-center">
                <button
                  onClick={() => handleEdit(task)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
