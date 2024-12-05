"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import ContextMenu from "@/components/ContextMenu";
import {
  loadTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "@/utils/localStorageUtils";
import { generateDays } from "@/utils/dateUtils";
import { addTask, deleteTask } from "@/utils/taskUtils";
import { useContextMenu } from "@/hooks/useContextMenu";
import { Task } from "../../types/interfaces";
import EditTaskModal from "@/components/EditTaskModal";
import CreateTaskModal from "@/components/CreateTaskModal";
import TaskTable from "@/components/TaskTable";

function handleContextMenuAction(
  action: string,
  contextMenu: { taskId?: number; userId?: number; day?: string },
  openEditModal: (taskId: number, userId: number, day: string) => void,
  deleteSelectedTask: () => void
) {
  if (action === "edit") {
    openEditModal(contextMenu.taskId!, contextMenu.userId!, contextMenu.day!);
  } else if (action === "delete") {
    deleteSelectedTask();
  }
}

const defaultTaskForm = {
  title: "",
  description: "",
  price: "",
  deadline: "",
};

export default function TaskCalendar() {
  const users = useUserStore((state) => state.users);

  const [tasks, setTasks] = useState<Record<string, Task[]>>(() =>
    loadTasksFromLocalStorage()
  );
  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [taskForm, setTaskForm] = useState(defaultTaskForm);

  const openEditModal = (taskId: number, userId: number, day: string) => {
    const key = `${userId}-${day}`; 
    const task = tasks[key]?.find((t) => t.id === taskId); 

    if (task) {
      closeContextMenu();
      setTaskToEdit(task);
      setIsEditModalOpen(true);
    }
  };
  

  const saveEditedTask = (updatedTask: Task) => {
    setTasks((prev) => {
      const updatedTasks = { ...prev };
      const taskList = updatedTasks[updatedTask.day]?.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      updatedTasks[updatedTask.day] = taskList!;

      saveTasksToLocalStorage(updatedTasks);
      return updatedTasks;
    });
  };

  const { contextMenu, menuRef, handleContextMenu, closeContextMenu } =
    useContextMenu();

  const days = generateDays(7);

  const addNewTask = (userId: number, day: string) => {
    setSelectedUserId(userId);
    setSelectedDay(day);
    setIsCreateModalOpen(true);
  };

  const saveNewTask = () => {
    if (taskForm.title && taskForm.description) {
      setTasks((prev) =>
        addTask(prev, selectedUserId!, selectedDay!, taskForm)
      );
      setIsCreateModalOpen(false);
      setTaskForm(defaultTaskForm);
    }
  };

  const closeModal = () => {
    setIsCreateModalOpen(false);
    setTaskForm(defaultTaskForm);
  };

  const deleteSelectedTask = () => {
    if (contextMenu.taskId && contextMenu.userId && contextMenu.day) {
      setTasks((prev) =>
        deleteTask(
          prev,
          contextMenu.userId!,
          contextMenu.day!,
          contextMenu.taskId!
        )
      );
      closeContextMenu();
    }
  };
  

  return (
    <div className="overflow-auto p-4">
      <TaskTable
        users={users}
        tasks={tasks}
        days={days}
        addTask={addNewTask}
        handleContextMenu={handleContextMenu}
      />

      {isCreateModalOpen && (
        <CreateTaskModal
          taskForm={taskForm}
          setTaskForm={setTaskForm}
          saveTask={saveNewTask}
          closeModal={closeModal}
        />
      )}

      {isEditModalOpen && taskToEdit && (
        <EditTaskModal
        isOpen={isEditModalOpen}
        task={taskToEdit}
        onClose={() => setIsEditModalOpen(false)}
        onSave={saveEditedTask}
      />
      )}

      {contextMenu.x !== 0 && contextMenu.y !== 0 && (
        <ContextMenu
          ref={menuRef}
          x={contextMenu.x}
          y={contextMenu.y}
          taskId={contextMenu.taskId}
          onClose={closeContextMenu}
          onAction={(action) =>
            handleContextMenuAction(
              action,
              contextMenu,
              openEditModal,
              deleteSelectedTask
            )
          }
        />
      )}
    </div>
  );
}
