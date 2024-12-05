import React, { useRef, useEffect, forwardRef } from "react";

interface ContextMenuProps {
  x: number;
  y: number;
  taskId?: number;
  userId?: number;
  day?: string;
  onClose: () => void;
  onAction: (action: string) => void;
}

const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ x, y, taskId, userId, day, onClose, onAction }, ref) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
          onClose();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [onClose]);

    console.log(userId, day);
    return (
      <div
        ref={ref}
        className="absolute"
        style={{
          top: `${y}px`,
          left: `${x}px`,
        }}
      >
        <ul className="bg-white border shadow-md w-48">
          <li
            onClick={() => taskId && onAction("edit")}
            className="p-2 hover:bg-gray-100 cursor-pointer"
          >
            Edit
          </li>
          <li
            onClick={() => taskId && onAction("delete")}
            className="p-2 hover:bg-gray-100 cursor-pointer"
          >
            Delete
          </li>
        </ul>
      </div>
    );
  }
);

ContextMenu.displayName = "ContextMenu";

export default ContextMenu;
