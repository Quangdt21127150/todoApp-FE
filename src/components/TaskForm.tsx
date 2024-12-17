import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: boolean;
}

interface TaskFormProps {
  onSubmit: SubmitHandler<Task>;
  defaultValues?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Task>({
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      setValue("title", defaultValues.title);
      setValue("description", defaultValues.description);
      setValue("status", defaultValues.status);
    }
  }, [defaultValues, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          {...register("title", {
            required: "Title is required",
            maxLength: { value: 255, message: "Max length is 255 characters" },
          })}
          type="text"
          id="title"
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          {...register("description", {
            required: "Description is required",
            maxLength: { value: 255, message: "Max length is 255 characters" },
          })}
          id="description"
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      {defaultValues && (
        <div className="flex items-center">
          <input
            {...register("status")}
            type="checkbox"
            id="status"
            className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
          />
          <label
            htmlFor="status"
            className="ml-2 text-sm font-medium text-gray-700"
          >
            Completed
          </label>
        </div>
      )}

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
  );
};

export default TaskForm;
