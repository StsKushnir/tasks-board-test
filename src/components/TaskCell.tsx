import { FC } from "react";
import TaskCard from "./TaskCard";
import { TaskCellProps } from "@/types/interfaces";
import { statusColors } from "@/utils/statusColors";
import PlusIcon from "./icons/plusIcon";

const TaskCell: FC<TaskCellProps> = ({
  tasks,
  userId,
  day,
  onDragStart,
  onDrop,
  handleContextMenu,
  addTask,
}) => (
  <td
    className="border p-2 h-24 relative"
    onDragOver={(e) => e.preventDefault()}
    onDrop={() => onDrop(userId, day)}
  >
    <div className="flex flex-col space-y-2">
      {tasks.map((task) => {
        const taskColor =
          statusColors[task.status as keyof typeof statusColors];

        return (
          <TaskCard
            key={task.id}
            task={task}
            taskColor={taskColor}
            onDragStart={() => onDragStart(task)}
            onContextMenu={(e) => handleContextMenu(e, task.id, userId, day)}
          />
        );
      })}
      <button
        onClick={() => addTask(userId, day)}
        className=" w-full h-full"
      >
        <span className="absolute bottom-[4px] right-[2px]">
        <PlusIcon size={15} color={"#003399"} />
        </span>
      </button>
    </div>
  </td>
);

export default TaskCell;
