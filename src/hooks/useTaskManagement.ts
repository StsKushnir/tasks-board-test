import { useState, useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import { Task } from "@/types/interfaces";
import { saveTasksToLocalStorage, loadTasksFromLocalStorage } from "@/utils/localStorageUtils";
import { addTask, deleteTask } from "@/utils/taskUtils";
import { defaultTaskForm } from "@/utils/taskFormDefaults";

export const useTaskManagement = () => {
  const users = useUserStore((state) => state.users);
  const [tasks, setTasks] = useState<Record<string, Task>>(loadTasksFromLocalStorage());
  const [taskForm, setTaskForm] = useState(defaultTaskForm);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  const addNewTask = (userId: number, day: string) => {
    setSelectedUserId(userId);
    setSelectedDay(day);
    setIsCreateModalOpen(true);
  };

  const saveNewTask = () => {
    if (taskForm.title && taskForm.description) {
      setTasks(prev => addTask(prev, selectedUserId!, selectedDay!, taskForm));
      setIsCreateModalOpen(false);
      setTaskForm(defaultTaskForm);
    }
  };

  const closeModal = () => {
    setIsCreateModalOpen(false);
    setTaskForm(defaultTaskForm);
  };

  const openEditModal = (taskId: number) => {
    const task = tasks[`${taskId}`];
    if (task) {
      setTaskToEdit(task);
      setIsEditModalOpen(true);
    }
  };

  const saveEditedTask = (updatedTask: Task) => {
    setTasks(prev => {
      const updatedTasks = { ...prev };
      updatedTasks[updatedTask.id] = updatedTask;
      saveTasksToLocalStorage(updatedTasks);
      return updatedTasks;
    });
  };

  const deleteSelectedTask = (taskId: number) => {
    setTasks(prev => deleteTask(prev, taskId));
  };

  return {
    users,
    tasks,
    taskForm,
    setTaskForm,
    isCreateModalOpen,
    setIsCreateModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    taskToEdit,
    addNewTask,
    saveNewTask,
    closeModal,
    openEditModal,
    saveEditedTask,
    deleteSelectedTask,
  };
};
