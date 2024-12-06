import { Task } from "@/types/interfaces";
import React, { useState, useEffect } from "react";

interface EditTaskModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  task,
  isOpen,
  onClose,
  onSave,
}) => {
  const [form, setForm] = useState<Task>({
    ...task,
  });
  console.log("form:", form);

  useEffect(() => {
    if (isOpen) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "{}");
      if (storedTasks) {
        const dayTask = storedTasks[task.id] || null;

        if (dayTask) {
          const newDayTask = { ...dayTask, ...form };
          storedTasks[task.id] = newDayTask;
          localStorage.setItem("tasks", JSON.stringify(storedTasks));
        } else {
          console.error("Task not found in the selected day.");
        }
      }
    }
  }, [form, isOpen, task.day, task.id]); 

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-semibold">Edit Task</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-2 border"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-2 border"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="text"
              name="price"
              id="price"
              value={form.price}
              onChange={handleChange}
              className="w-full p-2 border"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="deadline"
              className="block text-sm font-medium text-gray-700"
            >
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              id="deadline"
              value={form.deadline}
              onChange={handleChange}
              className="w-full p-2 border"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              name="status"
              id="status"
              value={form.status}
              onChange={handleChange}
              className="w-full p-2 border"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
            </select>
          </div>
        </form>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
