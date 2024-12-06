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
import { handleContextMenuAction } from "@/utils/contextMenuUtils";
import { defaultTaskForm } from "@/utils/taskFormDefaults";
import { openEditModal, closeModal } from "@/utils/modalUtils";
import EditTaskModal from "@/components/EditTaskModal";
import CreateTaskModal from "@/components/CreateTaskModal";
import TaskTable from "@/components/TaskTable";
import Link from "next/link";

export default function TaskCalendar() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [taskForm, setTaskForm] = useState(defaultTaskForm);
  const [tasks, setTasks] = useState<Record<string, Task>>(() =>
    loadTasksFromLocalStorage()
  );

  const { contextMenu, menuRef, handleContextMenu, closeContextMenu } =
    useContextMenu();

  const users = useUserStore((state) => state.users);

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  const days = generateDays(7);

  const updateTaskPosition = (taskId: number, userId: number, day: string) => {
    setTasks((prev) => {
      const updatedTasks = { ...prev };
      const task = updatedTasks[`${taskId}`];

      if (task) {
        task.userId = userId;
        task.day = day;
      }

      saveTasksToLocalStorage(updatedTasks);
      return updatedTasks;
    });
  };

  const saveEditedTask = (updatedTask: Task) => {
    setTasks((prev) => {
      const updatedTasks = { ...prev };
      updatedTasks[updatedTask.id] = updatedTask;
      saveTasksToLocalStorage(updatedTasks);
      return updatedTasks;
    });
  };

  const addNewTask = (userId: number, day: string) => {
    setSelectedUserId(userId);
    setSelectedDay(day);
    setIsCreateModalOpen(true);
  };

  const createTask = () => {
    if (taskForm.title && taskForm.description) {
      setTasks((prev) =>
        addTask(prev, selectedUserId!, selectedDay!, taskForm)
      );
      setIsCreateModalOpen(false);
      setTaskForm(defaultTaskForm);
    }
  };

  const deleteSelectedTask = () => {
    if (contextMenu.taskId && contextMenu.userId && contextMenu.day) {
      setTasks((prev) => deleteTask(prev, contextMenu.taskId!));
      closeContextMenu();
    }
  };

  return (
    <div className="overflow-auto p-4 ">
      <TaskTable
        users={users}
        tasks={tasks}
        days={days}
        addTask={addNewTask}
        handleContextMenu={handleContextMenu}
        updateTaskPosition={updateTaskPosition}
      />

      {isCreateModalOpen && (
        <CreateTaskModal
          taskForm={taskForm}
          setTaskForm={setTaskForm}
          saveTask={createTask}
          closeModal={() =>
            closeModal(setIsCreateModalOpen, setTaskForm, defaultTaskForm)
          }
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
              (taskId) =>
                openEditModal(
                  taskId,
                  tasks,
                  setTaskToEdit,
                  setIsEditModalOpen,
                  closeContextMenu
                ),
              deleteSelectedTask
            )
          }
        />
      )}

      <Link
        href={`/`}
        className=" absolute w-[200px] py-1 bg-black mt-10 rounded-md bottom-[10%] right-[2%] focus:outline-none "
      >
        <p className="text-center font-semibold text-white hover:text-[#F4C430]">
          Home
        </p>
      </Link>
    </div>
  );
}
