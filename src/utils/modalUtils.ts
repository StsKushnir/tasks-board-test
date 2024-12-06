/* eslint-disable @typescript-eslint/no-explicit-any */
import { Task } from "@/types/interfaces";

export const openEditModal = (
  taskId: number,
  tasks: Record<string, Task>,
  setTaskToEdit: React.Dispatch<React.SetStateAction<any>>,
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  closeContextMenu: () => void
) => {
  const key = `${taskId}`;
  const task = tasks[key];

  if (task) {
    closeContextMenu();
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  }
};

export const closeModal = (
  setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setTaskForm: React.Dispatch<React.SetStateAction<any>>,
  defaultTaskForm: any
) => {
  setIsCreateModalOpen(false);
  setTaskForm(defaultTaskForm);
};
