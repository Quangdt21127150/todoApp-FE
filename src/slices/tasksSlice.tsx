import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../services/TaskServices";

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
  },
});

export const { setTasks, addTask } = tasksSlice.actions;
export default tasksSlice.reducer;
