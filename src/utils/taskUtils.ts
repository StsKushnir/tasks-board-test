import { Task } from "@/types/interfaces";

export const addTask = (
  tasks: Record<string, Task>,
  selectedUserId: number,
  selectedDay: string,
  taskForm: { title: string; description: string; price: string; deadline: string }
) => {
  const newTask: Task = {
    id: Date.now(),
    day: selectedDay,
    userId: selectedUserId,
    title: taskForm.title,
    description: taskForm.description,
    price: Number(taskForm.price),
    deadline: taskForm.deadline,
    status: 'pending',
  };

  const key = `${newTask.id}`;
  return {
    ...tasks,
    [key]: newTask,
  };
};

export const deleteTask = (
  tasks: Record<string, Task>,
  taskId: number
) => {


  const key = `${taskId}`;
  const updatedTasks = {...tasks};

  delete updatedTasks[key];

  return updatedTasks;
};
