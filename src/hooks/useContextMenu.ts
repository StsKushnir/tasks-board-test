import { useState, useRef, useEffect } from "react";

export const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    taskId?: number;
    userId?: number;
    day?: string;
  }>({ x: 0, y: 0 });

  const menuRef = useRef<HTMLDivElement>(null);

  const closeContextMenu = () => {
    setContextMenu({ x: 0, y: 0 });
  };

  const handleContextMenu = (e: React.MouseEvent, taskId: number, userId: number, day: string) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      taskId,
      userId,
      day,
    });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeContextMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return {
    contextMenu,
    menuRef,
    handleContextMenu,
    closeContextMenu,
  };
};
