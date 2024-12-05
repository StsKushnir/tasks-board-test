
import { Task } from "@/types/interfaces";

export const addTask = (
  tasks: Record<string, Task[]>,
  selectedUserId: number,
  selectedDay: string,
  taskForm: { title: string; description: string; price: string; deadline: string }
) => {
  const newTask: Task = {
    id: Date.now(),
    title: taskForm.title,
    description: taskForm.description,
    price: Number(taskForm.price),
    deadline: taskForm.deadline,
    status: "Pending",
  };

  const key = `${selectedUserId}-${selectedDay}`;
  const existingTasks = tasks[key] || [];
  return {
    ...tasks,
    [key]: [...existingTasks, newTask],
  };
};

export const deleteTask = (
  tasks: Record<string, Task[]>,
  userId: number,
  day: string,
  taskId: number
) => {


  const key = `${userId}-${day}`;
  const updatedTasks = {
    ...tasks,
    [key]: tasks[key]?.filter((task) => task.id !== taskId) || [],
  };

  if (updatedTasks[key]?.length === 0) {
    delete updatedTasks[key];
  }
  return updatedTasks;
};
