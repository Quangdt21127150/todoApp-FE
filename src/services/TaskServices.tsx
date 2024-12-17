import axios from "axios";

const API_URL = "http://localhost:3000/tasks";

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: boolean;
  completedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export const TaskService = {
  getTasks: async (token: string) => {
    const { data } = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },

  createTask: async (
    task: Omit<Task, "_id" | "createdAt" | "updatedAt">,
    token: string
  ) => {
    const { data } = await axios.post(API_URL, task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },

  updateTask: async (id: string, task: Partial<Task>, token: string) => {
    const { data } = await axios.put(`${API_URL}/${id}`, task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },

  deleteTask: async (id: string, token: string) => {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
