export interface User {
  id: number;
  name: string;
  surname: string;
  position: string;
}

export interface Task {
  day: string;
  userId: number;
  id: number;
  title: string;
  description: string;
  price: number;
  deadline: string;
  status: "pending" | "in-progress" | "completed";
}

export interface TaskTableProps {
  users: { id: number; name: string; surname: string; position: string }[];
  tasks: Record<string, Task>;
  days: string[];
  addTask: (userId: number, day: string) => void;
  handleContextMenu: (
    e: React.MouseEvent,
    taskId: number,
    userId: number,
    day: string
  ) => void;
  updateTaskPosition: (taskId: number, userId: number, day: string) => void;
}

export interface TaskCellProps {
  tasks: Task[];
  userId: number;
  day: string;
  onDragStart: (task: Task) => void;
  onDrop: (userId: number, day: string) => void;
  handleContextMenu: (
    e: React.MouseEvent,
    taskId: number,
    userId: number,
    day: string
  ) => void;
  addTask: (userId: number, day: string) => void;
}