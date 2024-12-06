import { FC } from "react";
import { Task } from "@/types/interfaces";

interface TaskCardProps {
  task: Task;
  taskColor: string;
  onDragStart: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
}

const TaskCard: FC<TaskCardProps> = ({ task, taskColor, onDragStart, onContextMenu }) => (
  <div
    className={`${taskColor} p-2 rounded shadow-md text-sm cursor-pointer`}
    draggable
    onDragStart={onDragStart}
    onContextMenu={onContextMenu}
  >
    <p className="font-semibold">{task.title}</p>
    <p className="text-gray-600">{task.description}</p>
    <p className="text-green-600">${task.price}</p>
    <p className="text-gray-500 text-xs">Due: {task.deadline}</p>
    <p className="text-gray-500 text-xs">Status: {task.status}</p>
  </div>
);

export default TaskCard;
