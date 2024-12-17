import React from "react";
import TaskList from "../components/TaskList";

const TaskPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Task Management</h1>
      <TaskList />
    </div>
  );
};

export default TaskPage;
