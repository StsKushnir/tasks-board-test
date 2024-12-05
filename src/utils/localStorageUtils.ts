import { Task } from "@/types/interfaces";

export const loadTasksFromLocalStorage = () => {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : {};
};

export const saveTasksToLocalStorage = (tasks: Record<string, Task[]>) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
