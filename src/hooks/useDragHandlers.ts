import { Task } from "@/types/interfaces";
import { useRef } from "react";

export const useDragHandlers = (updateTaskPosition: (taskId: number, userId: number, day: string) => void) => {
  const draggedTaskRef = useRef<Task | null>(null);

  const onDragStart = (task: Task) => {
    draggedTaskRef.current = task;
  };

  const onDrop = (userId: number, day: string) => {
    if (!draggedTaskRef.current) return;
    updateTaskPosition(draggedTaskRef.current.id, userId, day);
    draggedTaskRef.current = null;
  };

  return { onDragStart, onDrop };
};